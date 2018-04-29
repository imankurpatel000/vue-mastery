const functions = require('firebase-functions')
const admin = require('firebase-admin')
const subscription = require('./subscription')

admin.initializeApp(functions.config().firebase)

module.exports = {
  account (id) {
    const accountPath = `accounts/${id}`
    return admin.database().ref(accountPath).once('value')
  },

  subscribe (email, id, subscribing = true) {
    return admin
      .database()
      .ref('accounts')
      .orderByChild('email')
      .equalTo(email)
      .once('child_added', (snapshot) => {
        const val = snapshot.val()
        subscription.getMailerList('Vue Mastery Subscribers')
          .then(listID => subscription.subscribeUser(val, listID, subscribing))
        snapshot.ref
          .update({
            subscribed: subscribing,
            chargebeeId: id
          })
      })
  },

  course (id) {
    const pathToCourse = `flamelink/environments/production/content/courses/en-US/${id}`
    return admin.database().ref(pathToCourse).once('value')
  },

  lesson (id) {
    const pathToCourse = `flamelink/environments/production/content/lessons/en-US/${id}`
    return admin.database().ref(pathToCourse).once('value')
  }
}
