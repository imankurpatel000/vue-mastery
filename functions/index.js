const functions = require('firebase-functions')
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG)
const chargebee = require('chargebee')
const subscription = require('./subscription')
const db = require('./helpers')

// ! list order mather
const mailingList = ['mainlistid', 'biweekly', 'discount_and_promotion', 'free_content']
const userSubscriptions = ['subscribedToMailingList', 'subscribedToBiweekly', 'subscribedToDiscountAndPromotion', 'subscribedToFreeContent']
chargebee.configure({
  site: firebaseConfig.chargebee.site,
  api_key: firebaseConfig.chargebee.key
})

module.exports = {
  // On account creation we add the user to mailerlite and create stripe account (phase 2)
  createCustomer: functions.auth.user()
    .onCreate(snap => {
      const user = snap.val()
      // TODO Check is new firebase work with .val()+ why 2 functions?
      db.checkUserTeamSubscription(user)
      db.checkIfTeamMember(user.email)
      const subscribed = []
      mailingList.forEach(list => {
        const listId = firebaseConfig.mailerlite[list]
        subscribed.push(subscription.getMailerList(listId)
          .then(listID => subscription.subscribeUser(user, listID, true))
          .catch(function (error) {
            // TODO there seems to be an error that need to be check
            console.log(`Adding ${user.email} to ${list}... but ${error.message}`)
          })
        )
      })
      return Promise.all(subscribed)
    }),

  // Subscribe a user to mailerLite according to his settings.
  // subscribeUser: functions.database.ref('/accounts/{uid}')
  //   .onWrite(change => {
  //     let changedList = ''

  //     // Check if one of the email subscriptions property changed
  //     userSubscriptions.forEach((list) => {
  //       if (change.child(list).changed()) changedList = list
  //     })

  //     // Exit if not email subscription change
  //     if (changedList === '') return null

  //     const val = change.after.val()
  //     const listIndex = userSubscriptions.indexOf(changedList)
  //     const listName = firebaseConfig.mailerlite[mailingList[listIndex]]
  //     return subscription.getMailerList(listName)
  //       .then(listID => subscription.subscribeUser(val, listID, val.subscribedToMailingList))
  //       .catch((error)=> {
  //         console.log(error)
  //       })
  //   }),

  // Subscribe a user to free weekend
  subscribeToFreeWeekend: functions.database.ref('/accounts/{uid}')
    .onUpdate(event => {
      const snapshot = event.data

      if (!snapshot.child('enrolledFreeWeekend').changed()) return null

      const val = snapshot.val()
      return subscription.getMailerList('Free Weekend 2019')
        .then(listID => subscription.subscribeUser(val, listID, val.enrolledFreeWeekend))
        .catch((error) => {
          console.log(error)
        })
    }),

  // Change mailerlite subscriber on email update
  updateEmail: functions.database.ref('/accounts/{uid}')
    .onUpdate(event => {
      const snapshot = event.data
      // If it's not a email change then return
      if (!snapshot.child('email').changed()) return null

      const val = snapshot.val()
      chargebee.customer.update(val.chargebeeId, {
        email: val.email
      }).request((error, result) => {
        if (error) {
          console.log(error)
        } else {
          console.log(`Update customer with chargebeeId: ${val.chargebeeId} with email ${val.email}`)
        }
      })
      // Subscribe user with new email
      return userSubscriptions.forEach((list) => {
        if (val[list]) {
          const listIndex = userSubscriptions.indexOf(list)
          const listName = firebaseConfig.mailerlite[mailingList[listIndex]]
          subscription.getMailerList(listName).then(listID => {
            return subscription.deleteSubscriber(listID, val.email).then(() => {
              console.log('Subscriber deleted')
              subscription.subscribeUser(val, listID, true)
                .catch(function (error) {
                  console.log(`Trying to subscribe ${val.email} to list ${listName} but:${error}`)
                })
            })
          })
        }
      })
    }),

  // Subscribe a user to a course on the mailerLite course list
  subscribeUserToCourse: functions.database.ref('/accounts/{uid}/courses/{cid}')
    .onWrite((change, context) => {

      // If it's not a subscription change then return
      if (!change.child('subscribed').changed()) return null

      // Wait to get account email data and course title to subscribe the user
      return Promise.all([db.account(context.params.uid)])
        .then(results => results.map(result => result.val()))
        .then(([account]) => {
          // Get or create email course list
          subscription.getMailerList(`Course: ${context.params.cid}`)
            .then(listID => subscription.subscribeUser(account, listID, change.after.val().subscribed))
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
      // If it's not a subscription change then return
      if (!change.child('subscribed').changed()) return null

      // Wait to get account email data and conference title to subscribe the user
      return Promise.all([db.account(context.params.uid)])
        .then(results => results.map(result => result.val()))
        .then(([account]) => {
          // Get or create email course list
          subscription.getMailerList(`Conference: ${context.params.cid}`)
            .then(listID => subscription.subscribeUser(account, listID, change.after.val().subscribed))
        })
    }),

  // Subscribe a user to a course on the mailerLite course list
  sendContactForm: functions.database.ref('/inquiries/{cid}')
    .onCreate(snap => {
      let form = snap.val()
      return subscription.sendContactEmail({
        name: form.name,
        message: form.message,
        email: form.email
      })
    }),

  // Send request for a team subscription
  sendTeamSubscriptionRequest: functions.database.ref('/team-request/{cid}')
    .onCreate(snap => {
      let form = snap.val()
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
      // Only edit data if already created
      if (change.before.exists()) {
        const oldTeam = change.before.val()
        // Remove previous members subscriptions (in case the change is that one member if removed)
        if (oldTeam.members !== undefined) {
          // For each member of the team
          oldTeam.members.forEach((member) => {
            // Find if the new member is in the list
            let existingEmail = newTeam.members.some((newMember) => {
              return newMember.email === member.email
            })
            // If user is in the members list remove the subscription
            if (!existingEmail) {
              console.log(`Unsubscribe ${member.email}`)
              db.subscribeTeamMember(member.email, null, false)
            }
          })
        }
      }
      // Add member subscriptions
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
      return mailingList.forEach((list) => {
        const listName = firebaseConfig.mailerlite[list]
        subscription.getMailerList(listName)
          .then(listID => {
            return subscription.deleteSubscriber(listID, user.email).then(() => {
              console.log('Subscriber deleted')
            })
          })
          .catch(function (error) {
            console.log(error)
          })
      })
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

  subscription_changes: functions.https.onRequest((req, res) => {
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
          db.subscribe(customer.email, customer.id, planId, true)
          break
        }
        case 'subscription_paused':
        case 'subscription_deleted':
        case 'subscription_cancelled': {
          db.subscribe(customer.email, customer.id, planId, false)
          break
        }
        case 'subscription_changed': {
          db.updateMailingSubscription(customer, planId, false)
          break
        }
        default: {
          console.log(req.body.event_type)
          break
        }
      }
    }
    res.sendStatus(200)
  })
}
