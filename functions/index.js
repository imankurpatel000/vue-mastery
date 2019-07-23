const functions = require('firebase-functions')
const chargebee = require('chargebee')
const subscription = require('./subscription')
const db = require('./helpers')
const firebaseConfig = functions.config() //JSON.parse(process.env.FIREBASE_CONFIG)

const mailingList = [
  { name: 'VueMastery.com New Users', id: 9028842 },
  { name: 'Biweekly Newsletter', id: 11088064 },
  { name: 'Subscription Discounts and Promotions', id: 11088062 },
  { name: 'New Free Content Announcements', id: 11088060 }
]

chargebee.configure({
  site: firebaseConfig.chargebee.site,
  api_key: firebaseConfig.chargebee.key
})

const hasChanged = (prop, change) => {
  // Only edit data when it is first created.
  if (!change.before.exists()) {
    console.log(`Update ${prop} at creation`)
  }
  // Exit when the data is deleted.
  if (!change.after.exists()) {
    return null;
  }
  // Compare before and after to see if that property changed
  return change.before.val()[prop] !== change.after.val()[prop]
}

module.exports = {
  // On account creation we add the user to mailerlite and create stripe account (phase 2)
  createCustomer: functions.auth.user()
    .onCreate(user => {
      console.log(`Adding new customer ${user.email}`)

      // Check if user is part of a team
      db.checkIfTeamMember(user.email)

      const subscribed = []
      // Subscribe customer to the mailerLite groups 
      // ('mainlistid', 'biweekly', 'discount_and_promotion', 'free_content')
      mailingList.forEach(list => {
        // Add customer on the mailerlite list
        subscribed.push(subscription.subscribeUser(user, list.id, true))
      })

      // Wait for all the subscription to be done before stoping the execution
      return Promise.all(subscribed)
    }),

  // Subscribe a user to free weekend
  subscribeToFreeWeekend: functions.database.ref('/accounts/{uid}')
    .onUpdate((change, context) => {      
      // Exit if property changed is not 'enrolledFreeWeekend'
      if(!hasChanged('enrolledFreeWeekend', change)) return null

      // Get user data after changes
      const user = change.after.val()

      // Subscribe user to the free weekend mailing list (11150428: 'Free Weekend 2019')
      return subscription.subscribeUser(user, '11150428', user.enrolledFreeWeekend)
    }),

  // Change mailerlite subscriber and chargebee on email update
  updateEmail: functions.database.ref('/accounts/{uid}')
    .onUpdate((change, context) => {
      // Exit if property changed is not 'email'
      if(!hasChanged('email', change)) return null
      const user = change.after.val()
      const oldEmail = change.before.val().email
      const promises = []

      // Update Chargebee email
      if (user.chargebeeId) {
        promises.push(
          chargebee.customer
            .update(user.chargebeeId, { email: user.email })
            .request((error) => {
              console.log(error ? error : `Update email ${oldEmail} to ${user.email} on chargebee customer (${user.chargebeeId})`)
            })
        )
      }
      // Subscribe user to all the groups with new email
      subscription.getUserLists(user.email).then(lists => {
        // For mailerLite group where the user subscribed
        lists.forEach((listId) => {
          promises.push(
            // Subscribe with new email address
            subscription
              .subscribeUser(user, listId, true)
              .catch(function (error) {
                console.log(`Trying to subscribe ${email} to list ${listId} but:${error}`)
              })
          )
        })
      })
      return Promise.all(promises)
    }),

  // Subscribe a user to a course on the mailerLite course list
  subscribeUserToCourse: functions.database.ref('/accounts/{uid}/courses/{cid}')
    .onWrite((change, context) => {
      const uid = context.params.uid
      const cid = context.params.cid

      // Exit when the data is deleted.
      const subscribed = change.after.exists() ? change.after.val().subscribed : false

      return db.account(uid)
        .then((snapshot) => {
          // Get or create email course list
          return subscription.getMailerListId(`Course: ${cid}`)
            .then(listID => subscription.subscribeUser(snapshot.val(), listID, subscribed))
            .catch(function (error) {
              console.log(error)
            })
        })
        .catch(function (error) {
          console.log(error)
        })
    }),

  // Subscribe a user to a conference on the mailerLite course list
  subscribeUserToConference: functions.database.ref('/accounts/{uid}/conferences/{cid}')
    .onWrite((change, context) => {
      const uid = context.params.uid
      const cid = context.params.cid

      // Exit when the data is deleted.
      const subscribed = change.after.exists() ? change.after.val().subscribed : false

      return db.account(uid)
        .then((snapshot) => {
          // Get or create email conference list
          return subscription.getMailerListId(`Conference: ${cid}`)
            .then(listID => subscription.subscribeUser(snapshot.val(), listID, subscribed))
            .catch(function (error) {
              console.log(error)
            })
        })
        .catch(function (error) {
          console.log(error)
        })
  }),

  // Subscribe a user to a course on the mailerLite course list
  sendContactForm: functions.database.ref('/inquiries/{cid}')
    .onCreate((snap, context) => {
      const form = snap.val()
      return subscription.sendContactEmail({
        name: form.name,
        message: form.message,
        email: form.email
      })
    }),

  // Send request for a team subscription
  sendTeamSubscriptionRequest: functions.database.ref('/team-request/{cid}')
    .onCreate((snap, context) => {
      const form = snap.val()
      return subscription.sendTeamSubscriptionRequest({
        name: form.name,
        email: form.email,
        companyWebsite: form.companyWebsite,
        accountNumber: form.accountNumber,
        phoneNumber: form.phoneNumber
      })
    }),

  // Update lesson count in a course
  countLessonsInCourse: functions.database.ref('/flamelink/environments/production/content/courses/en-US/{cid}/lessons/{lid}')
    .onWrite(change => {
      const collectionRef = change.after.ref.parent
      const countRef = collectionRef.parent.child('lessonsCount')
      const durationRef = collectionRef.parent.child('duration')
      let count = 0
      let duration = 0
      return collectionRef.once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let childData = childSnapshot.val()
          Promise.all([db.lesson(childData).then((lessonSnapshot) => {
            const lesson = lessonSnapshot.val()
            if (lesson.status === 'published') {
              count++
              duration = db.addTimes(duration, lesson.duration)
            }
            return true
          })])
            .then(() => {
              countRef.set(count)
              durationRef.set(duration)
            })
        })
      })
    }),

  subscribeTeamMember: functions.database.ref('/flamelink/environments/production/content/team/en-US/{cid}')
    .onWrite(change => {
      const newTeam = change.after.val()
      if (change.before.exists()) {
        const previous = change.before.val()
        if (previous.members !== undefined) {
          previous.members.forEach((member) => {
            let existingEmail = newTeam.members.some((newMember) => {
              return newMember.email === member.email
            })
            if (!existingEmail) {
              console.log(`Unsubscribe ${member.email}`)
              db.subscribeTeamMember(member.email, null, false)
            }
          })
        }
      }
      if (newTeam.members !== undefined) {
        newTeam.members.forEach((member) => {
          db.subscribeTeamMember(member.email, newTeam, true)
        })
      } else {
        console.log('No member for the team:', newTeam)
      }
      return true
    }),

  deleteCustomer: functions.auth.user()
    .onDelete(user => {
      return subscription.unsubscribeSubscriber(user.email)
    }),

  create_portal_session: functions.https.onRequest((req, res) => {
    res.header('Content-Type', 'application/json')
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type')

    chargebee.portal_session.create({
      customer: {
        id: req.body.customer_id
      }
    }).request((error, result) => {
      if (error) {
        console.log('error', error)
      } else {
        res.send(result.portal_session)
      }
    })
  }),

  generate_hp_url: functions.https.onRequest((req, res) => {
    res.header('Content-Type', 'application/json')
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type')

    chargebee.hosted_page.checkout_new({
      subscription: {
        'plan_id': req.body.plan_id
      },
      customer: {
        'email': req.body.email,
        'last_name': req.body.last_name,
        'first_name': req.body.first_name
      },
      embed: 'false'
    }).request(function (error, result) {
      if (error) {
        // handle error
        console.log(error)
        res.status(500).send(error)
      } else {
        res.send(result.hosted_page)
      }
    })
  }),

  subscription_changes: functions.https.onRequest(async (req, res) => {
    console.log(`CHARGEBEE EVENT: ${req.body.event_type}`)
    const customer = req.body.content.customer
    let planId = false

    try {
      planId = req.body.content.subscription.plan_id
    } catch (error) {}

    if (customer) console.log(`CHARGEBEE EVENT USER: ${customer.email}`)
    if (planId) {
      switch (req.body.event_type) {
        case 'subscription_resumed':
        case 'subscription_renewed':
        case 'subscription_reactivated':
        case 'subscription_activated':
        case 'subscription_started':
        case 'subscription_created': {
          console.log('Attempt to subscribe customer: ', customer.email, customer.id, planId, true)
          await db.subscribe(customer.email, customer.id, planId, true)
            .then(values => {
              res.sendStatus(200)
            }).catch(err => {
              console.log(err)
              res.sendStatus(500)
            })
          break
        }
        case 'subscription_paused':
        case 'subscription_deleted':
        case 'subscription_cancelled': {
          await db.subscribe(customer.email, customer.id, planId, false)
            .then(values => {
              res.sendStatus(200)
            }).catch(err => {
              console.log(err)
              res.sendStatus(500)
            })
          break
        }
        case 'subscription_changed': {
          await db.updateMailingSubscription(customer, planId, false)
            .then(values => {
              res.sendStatus(200)
            }).catch(err => {
              console.log(err)
              res.sendStatus(500)
            })
          break
        }
        default: {
          res.sendStatus(200)
          console.log(req.body.event_type)
          break
        }
      }
    } else {
      console.log('The subscription as no plan ID')
      res.sendStatus(200)
    }
  })
}
