const functions = require('firebase-functions')
const chargebee = require('chargebee')
const subscription = require('./subscription')
const db = require('./helpers')

const mainListId = functions.config().mailerlite.mainlistid
chargebee.configure({
  site: functions.config().chargebee.site,
  api_key: functions.config().chargebee.key
})

module.exports = {
  // On account creation we add the user to mailerlite and create stripe account (phase 2)
  createCustomer: functions.auth.user()
    .onCreate(event => {
      const user = event.data
      db.checkUserTeamSubscription(user)
      db.checkIfTeamMember(user.email)
      return subscription.getMailerList(mainListId)
        .then(listID => subscription.subscribeUser(user, listID, true))
    }),

  // Subscribe a user to mailerLite according to his settings.
  subscribeUser: functions.database.ref('/accounts/{uid}')
    .onWrite(event => {
      const snapshot = event.data
      // If it's not a subscription change then return
      if (!snapshot.child('subscribedToMailingList').changed()) return null

      const val = snapshot.val()
      return subscription.getMailerList(mainListId)
        .then(listID => subscription.subscribeUser(val, listID, val.subscribedToMailingList))
    }),

  // Change mailerlite subscriber on email update
  updateEmail: functions.database.ref('/accounts/{uid}')
    .onUpdate(event => {
      const snapshot = event.data
      // If it's not a email change then return
      if (!snapshot.child('email').changed()) return null

      const val = snapshot.val()
      // TODO Unsubscribe user from all the list
      // Subscribe user with new email

      return subscription.getMailerList(mainListId).then(listID => {
        return subscription.deleteSubscriber(listID, val.email).then(() => {
          console.log('Subscriber deleted')
          subscription.subscribeUser(val, listID, val.subscribedToMailingList)
        })
      })
    }),

  // Subscribe a user to a course on the mailerLite course list
  subscribeUserToCourse: functions.database.ref('/accounts/{uid}/courses/{cid}')
    .onWrite(event => {
      const snapshot = event.data

      // If it's not a subscription change then return
      if (!snapshot.child('subscribed').changed()) return null

      // Wait to get account email data and course title to subscribe the user
      return Promise.all([db.account(event.params.uid)])
        .then(results => results.map(result => result.val()))
        .then(([account]) => {
          // Get or create email course list
          subscription.getMailerList(`Course: ${event.params.cid}`)
            .then(listID => subscription.subscribeUser(account, listID, snapshot.val().subscribed))
        })
    }),

  // Subscribe a user to a conference on the mailerLite course list
  subscribeUserToConference: functions.database.ref('/accounts/{uid}/conferences/{cid}')
    .onWrite(event => {
      const snapshot = event.data

      // If it's not a subscription change then return
      if (!snapshot.child('subscribed').changed()) return null

      // Wait to get account email data and conference title to subscribe the user
      return Promise.all([db.account(event.params.uid)])
        .then(results => results.map(result => result.val()))
        .then(([account]) => {
          // Get or create email course list
          subscription.getMailerList(`Conference: ${event.params.cid}`)
            .then(listID => subscription.subscribeUser(account, listID, snapshot.val().subscribed))
        })
    }),

  // Subscribe a user to a course on the mailerLite course list
  sendContactForm: functions.database.ref('/inquiries/{cid}')
    .onCreate(event => {
      const snapshot = event.data
      let form = snapshot.val()
      return subscription.sendContactEmail({
        name: form.name,
        message: form.message,
        email: form.email
      })
    }),

  // Send request for a team subscription
  sendTeamSubscriptionRequest: functions.database.ref('/team-request/{cid}')
    .onCreate(event => {
      const snapshot = event.data
      let form = snapshot.val()
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
    .onWrite(event => {
      const collectionRef = event.data.ref.parent
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
    .onWrite(event => {
      const snapshot = event.data
      const newTeam = snapshot.val()
      if (event.data.previous.exists()) {
        const previous = event.data.previous.val()
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
    .onDelete(event => {
      const user = event.data
      return subscription.getMailerList(mainListId).then(listID => {
        return subscription.deleteSubscriber(listID, user.email).then(() => {
          console.log('Subscriber deleted')
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
    if (customer) console.log(`CHARGEBEE EVENT USER: ${customer.email}`)
    switch (req.body.event_type) {
      case 'gift_claimed':
      case 'subscription_resumed':
      case 'subscription_renewed':
      case 'subscription_reactivated':
      case 'subscription_activated':
      case 'subscription_created': {
        db.subscribe(customer.email, customer.id, true)
        break
      }
      case 'gift_cancelled':
      case 'gift_expired':
      case 'subscription_paused':
      case 'subscription_cancelled': {
        db.subscribe(customer.email, customer.id, false)
        break
      }
      default: {
        console.log(req.body.event_type)
        break
      }
    }
    res.sendStatus(200)
  }),

  claim_gift: functions.https.onRequest((req, res) => {
    chargebee.gift.claim(req.body.gift_id).request(
      (error, result) => {
        if (error) {
          res.status(500).send(error)
        } else {
          res.sendStatus(200).send(result)
        }
      })
  })
}
