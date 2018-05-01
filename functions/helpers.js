const functions = require('firebase-functions')
const admin = require('firebase-admin')
const subscription = require('./subscription')

admin.initializeApp(functions.config().firebase)

module.exports = {
  account (id) {
    const accountPath = `accounts/${id}`
    return admin.database().ref(accountPath).once('value')
  },

  checkUserTeamSubscription (user) {
    console.log(user)
    return admin
      .database()
      .ref('/flamelink/environments/production/content/team/en-US')
      .once('child_added', (snapshot) => {
        const teams = snapshot.val()
        console.log('team: ', teams)
        for (let team in teams) {
          for (let member in team.members) {
            console.log(member)
            console.log('search : ', member.email, user.email)
            if (member.email === user.email) {
              this.subscribe(user.email, null, true)
            }
          }
        }
      })
    // return admin
    //   .database()
    //   .ref('/flamelink/environments/production/content/team/en-US')
    //   .orderByChild('email')
    //   .equalTo(user.email)
    //   .once('child_added', (snapshot) => {
    //     const team = snapshot.parent.child('name').val()
    //     console.log(`Subscribe new team member ${user.email} to team ${team}`)
    //     this.subscribe(user.email, null, true)
    //   })
  },

  subscribe (email, id, subscribing = true) {
    return admin
      .database()
      .ref('accounts')
      .orderByChild('email')
      .equalTo(email)
      .once('child_added', (snapshot) => {
        const val = snapshot.val()
        snapshot.ref
          .update({
            subscribed: subscribing,
            chargebeeId: id
          })
        console.log(`${subscribing ? 'Subscribe' : 'Unsubscribe'} ${val.displayName}`)
        return subscription.getMailerList('Vue Mastery Subscribers')
          .then(listID => { return subscription.subscribeUser(val, listID, subscribing) })
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
