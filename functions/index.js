const functions = require('firebase-functions')
const subscription = require('./subscription')
const chargebee = require('./chargebee')
const send = require('./send')
const db = require('./helpers')

const hasChanged = (change, prop) => {
  // Compare before and after to see if that property changed
  return change.before.val()[prop] !== change.after.val()[prop]
}

module.exports = {
  // On account creation we add the user to mailerlite and create stripe account (phase 2)
  createCustomer: functions.auth.user()
    .onCreate(async user => {
      console.log(`Adding new customer ${user.email}`)

      // Check if user is part of a team
      await db.checkIfTeamMember(user.email)

      // Subscribe customer to the mailerLite groups
      return subscription.subscribeNewMember(user)
    }),

  deleteCustomer: functions.auth.user()
    .onDelete(user => {
      return subscription.unsubscribeSubscriber(user.email)
    }),

  updateUser: functions.database.ref('/accounts/{uid}')
    .onUpdate((change, context) => {
      // Get user data after changes
      const user = change.after.val()

      // Subscribe a user to free weekend
      if (hasChanged(change, 'enrolledFreeWeekend')) {
        // Subscribe user to the free weekend mailing list (11150428: 'Free Weekend 2019')
        return subscription.subscribeUser(user, '11150428', user.enrolledFreeWeekend)
      }

      // Change mailerlite subscriber and chargebee on email update
      if (hasChanged(change, 'email')) {
        const oldEmail = change.before.val().email
        const promises = []

        // Update Chargebee email
        if (user.chargebeeId) {
          promises.push(chargebee.updateEmailCustomer(user.chargebeeId, oldEmail, user.email))
        }
        // Subscribe user to all the groups with new email
        promises.push(subscription.subscribeUserToNewEmail(oldEmail, user.email))
        return Promise.all(promises)
      }
    }),

  // Subscribe a user to a course on the mailerLite course list
  // Triggers when a course is created, updated, or deleted
  subscribeUserToCourse: functions.database.ref('/accounts/{uid}/courses/{cid}')
    .onWrite((change, context) => {
      const uid = context.params.uid
      const cid = context.params.cid

      // Exit when the data is deleted.
      const subscribed = change.after.exists() ? change.after.val().subscribed : false

      // Could be replace by change
      return db.account(uid)
        .then((snapshot) => {
          const user = snapshot.val()
          return subscription.subscribeUser(user, `Course: ${cid}`, subscribed)
        })
        .catch(function (error) {
          console.log(error)
        })
    }),

  // Subscribe a user to a conference on the mailerLite course list
  // Triggers when a conference is created, updated, or deleted
  subscribeUserToConference: functions.database.ref('/accounts/{uid}/conferences/{cid}')
    .onWrite((change, context) => {
      const uid = context.params.uid
      const cid = context.params.cid

      // Exit when the data is deleted.
      const subscribed = change.after.exists() ? change.after.val().subscribed : false

      return db.account(uid)
        .then((snapshot) => {
          const user = snapshot.val()
          // Get or create email conference list
          return subscription.subscribeUser(user, `Course: ${cid}`, subscribed)
        })
        .catch(function (error) {
          console.log(error)
        })
    }),

  // Subscribe a user to a course on the mailerLite course list
  sendContactForm: functions.database.ref('/inquiries/{cid}')
    .onCreate((snapshot, context) => {
      const form = snapshot.val()
      return send.sendContactEmail({
        name: form.name,
        message: form.message,
        email: form.email
      })
    }),

  // Send request for a team subscription
  sendTeamSubscriptionRequest: functions.database.ref('/team-request/{cid}')
    .onCreate((snapshot, context) => {
      const form = snapshot.val()
      return send.sendTeamSubscriptionRequest({
        name: form.name,
        email: form.email,
        companyWebsite: form.companyWebsite,
        accountNumber: form.accountNumber,
        phoneNumber: form.phoneNumber
      })
    }),

  // Update lesson count in a course
  // Triggers when a lesson is created, updated, or deleted
  countLessonsInCourse: functions.database.ref('/flamelink/environments/production/content/courses/en-US/{cid}/lessons/{lid}')
    .onWrite((change, context) => {
      const collectionRef = change.after.ref.parent
      const countRef = collectionRef.parent.child('lessonsCount')
      const durationRef = collectionRef.parent.child('duration')
      let count = 0
      let duration = 0
      return collectionRef.once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let childData = childSnapshot.val()
          Promise.all([
            db.lesson(childData).then((lessonSnapshot) => {
              const lesson = lessonSnapshot.val()
              if (lesson.status === 'published') {
                count++
                duration = db.addTimes(duration, lesson.duration)
              }
              return true
            })
          ]).then(() => {
            countRef.set(count)
            durationRef.set(duration)
          })
        })
      })
    }),

  // Triggers when a team is added, updated, or deleted
  subscribeTeamMember: functions.database.ref('/flamelink/environments/production/content/team/en-US/{cid}')
    .onWrite((change, context) => {
      const newTeam = change.after.val()
      // If the team is updated remove old team member
      if (change.before.exists()) {
        const previous = change.before.val()
        // Check if the previous team had members
        if (previous.members !== undefined) {
          // List all the previous member
          previous.members.forEach((member) => {
            // And check that member is still part of the team
            let existingEmail = newTeam.members.some((newMember) => newMember.email === member.email)
            // Remove the member from the team
            if (!existingEmail) {
              console.log(`Unsubscribe ${member.email}`)
              return db.subscribeTeamMember(member.email, null, false)
            }
          })
        }
      }
      // If the team is not removed, subscribe team members
      if (newTeam.members !== undefined) {
        newTeam.members.forEach((member) => {
          db.subscribeTeamMember(member.email, newTeam, true)
        })
      } else {
        console.log('No member for the team:', newTeam)
      }
      return true
    }),

  // Http chargebee functions
  create_portal_session: functions.https.onRequest(chargebee.createPortalSession),

  generate_hp_url: functions.https.onRequest(chargebee.generateHostedPageCheckout),

  subscription_changes: functions.https.onRequest(async (req, res) => {
    console.log(`Event type: ${req.body.event_type}`)
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
        case 'subscription_created':
        case 'subscription_changed': {
          await db.subscribe(customer, planId, true)
          break
        }
        case 'subscription_paused':
        case 'subscription_deleted':
        case 'subscription_cancelled': {
          await db.subscribe(customer, planId, false)
          break
        }
      }
    } else {
      console.log('The subscription as no plan ID')
    }
    res.sendStatus(200)
  })
}
