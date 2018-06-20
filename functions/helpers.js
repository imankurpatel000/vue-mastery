const admin = require('firebase-admin')
const db = admin.database()
const subscription = require('./subscription')

const functions = require('firebase-functions')
admin.initializeApp(functions.config().firebase)

module.exports = {
  account (id) {
    const accountPath = `accounts/${id}`
    return db.ref(accountPath).once('value')
  },

  checkUserTeamSubscription (user) {
    console.log(user)
    return db.ref('/flamelink/environments/production/content/team/en-US')
      .once('child_added', (snapshot) => {
        const teams = snapshot.val()
        for (let team in teams) {
          for (let member in team.members) {
            if (member.email === user.email) {
              this.subscribe(user.email, null, true)
            }
          }
        }
      })
  },

  subscribe (email, id, subscribing = true) {
    if (subscribing) console.log(`Attempt to subscribe user with email ${email}`)

    return db.ref('accounts')
      .orderByChild('email')
      .equalTo(email)
      .once('child_added', (snapshot) => {
        const val = snapshot.val()
        snapshot.ref
          .update({
            subscribed: subscribing,
            chargebeeId: id
          }, (error) => {
            if (error) {
              console.log(`Error subscribing the user: ${error}`)
            } else {
              console.log(`Success subscribing the user`)
            }
          })
        console.log(`${subscribing ? 'Subscribe' : 'Unsubscribe'} ${val.displayName}`)
        return subscription.getMailerList('Vue Mastery Subscribers')
          .then(listID => { return subscription.subscribeUser(val, listID, subscribing) })
      })
  },

  checkIfTeamMember (email) {
    return db.ref('/flamelink/environments/production/content/team/en-US')
      .on('value', (snapshot) => {
        if (snapshot !== undefined) {
          snapshot.forEach((teamSnapshot) => {
            let team = teamSnapshot.val()
            if (team !== undefined) {
              team.members.forEach((member) => {
                if (email === member.email) {
                  this.subscribeTeamMember(email, team, true)
                }
              })
            }
          })
        }
      })
  },

  subscribeTeamMember (email, team, subscribing = true) {
    return db.ref('accounts')
      .orderByChild('email')
      .equalTo(email)
      .once('child_added', (snapshot) => {
        const val = snapshot.val()
        let teamData = {
          subscribed: subscribing,
          team: null
        }
        if (team) {
          teamData.team = {
            companyName: team.companyName,
            adminName: team.adminName,
            adminEmail: team.adminEmail
          }
        }
        snapshot.ref
          .update(teamData)
        console.log(`${subscribing ? 'Subscribe' : 'Unsubscribe'} ${val.displayName}`)
        return subscription.getMailerList('Vue Mastery Team Subscribers')
          .then(listID => { return subscription.subscribeUser(val, listID, subscribing) })
      })
  },

  course (id) {
    const pathToCourse = `flamelink/environments/production/content/courses/en-US/${id}`
    return db.ref(pathToCourse).once('value')
  },

  lesson (id) {
    const pathToCourse = `flamelink/environments/production/content/lessons/en-US/${id}`
    return db.ref(pathToCourse).once('value')
  }
}
