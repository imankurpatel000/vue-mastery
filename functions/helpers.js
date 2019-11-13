const admin = require('firebase-admin')
const subscription = require('./subscription')

if (admin.apps.length === 0) {
  admin.initializeApp()
}

module.exports = {
  account (id) {
    const accountPath = `accounts/${id}`
    return admin.database().ref(accountPath).once('value')
  },

  accountsFromEmail (email) {
    return admin
      .database()
      .ref('accounts')
      .orderByChild('email')
      .equalTo(email)
      .once('value')
  },

  // getAllAccounts () {
  //   return admin
  //     .database()
  //     .ref('accounts')
  //     .orderByChild('email')
  //     .once('value')
  // },

  course (id) {
    const pathToCourse = `flamelink/environments/production/content/courses/en-US/${id}`
    return admin.database().ref(pathToCourse).once('value')
  },

  teams () {
    const pathToTeam = '/flamelink/environments/production/content/team/en-US'
    return admin.database().ref(pathToTeam).once('value')
  },

  lesson (id) {
    const pathToCourse = `flamelink/environments/production/content/lessons/en-US/${id}`
    return admin.database().ref(pathToCourse).once('value')
  },

  subscribe (customer, planId, subscribing = true) {
    if (subscribing) console.log(`Attempt to subscribe user with email ${customer.email}`)
    return new Promise((resolve, reject) => {
      this.accountsFromEmail(customer.email).then(snapshot => {
        snapshot.forEach((child) => {
          let user = child.val()
          if (user) {
            const promises = []
            console.log(`${subscribing ? 'Subscribe' : 'Unsubscribe'} ${user.displayName}`)
            promises.push(child.ref
              .update({
                subscribed: subscribing,
                chargebeeId: customer.id
              }, (error) => {
                if (error) {
                  console.log(`Error subscribing the user: ${error}`)
                } else {
                  console.log(`Success subscribing the user`)
                }
              })
            )

            // TODO remove mailerlite subscription and add promise to main function?
            promises.push(subscription.subscribeUserToPlan(user, planId, subscribing))

            Promise.all(promises).then((result) => {
              return resolve(result)
            })
          } else {
            return reject(new Error('User not found in firebase'))
          }
        })
      }, (error) => {
        return reject(error)
      })
    })
  },

  checkIfTeamMember (email) {
    return this.teams().then(snapshot => {
      if (snapshot !== undefined) {
        // For each team in database
        return new Promise((resolve, reject) => {
          const promises = []
          snapshot.forEach((teamSnapshot) => {
            let team = teamSnapshot.val()
            if (team !== undefined) {
              // Check if user is part of a team
              team.members.forEach((member) => {
                if (email === member.email) {
                  promises.push(this.subscribeTeamMember(email, team, true))
                }
              })
            }
          })
          Promise.all(promises).then((result) => {
            return resolve(result)
          }, (error) => {
            return reject(error)
          })
        })
      }
    })
  },

  subscribeTeamMember (email, team, subscribing = true) {
    return this.accountsFromEmail(email).then(snapshot => {
      const promises = []
      snapshot.forEach((child) => {
        team = team ? {
          companyName: team.companyName,
          adminName: team.adminName,
          adminEmail: team.adminEmail
        } : null

        // Add or remove team data from user in Firebase
        promises.push(
          child.ref.update({
            subscribed: subscribing,
            team: team
          })
        )

        // Subscribe or unsubscribe user from mailer lite team group
        promises.push(
          subscription.subscribeUser(child.val(), 'Vue Mastery Team Subscribers', subscribing)
        )
      })
      return Promise.all(promises)
    })
  },

  addTimes (startTime, endTime) {
    let times = [ 0, 0, 0 ]
    let max = times.length
    let a = (startTime || '').split(':')
    let b = (endTime || '').split(':')

    // normalize time values
    for (let i = 0; i < max; i++) {
      a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i])
      b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i])
    }

    // store time values
    for (let i = 0; i < max; i++) {
      times[i] = a[i] + b[i]
    }

    let hours = times[0]
    let minutes = times[1]
    let seconds = times[2]

    if (seconds >= 60) {
      let m = (seconds / 60) << 0
      minutes += m
      seconds -= 60 * m
    }

    if (minutes >= 60) {
      let h = (minutes / 60) << 0
      hours += h
      minutes -= 60 * h
    }

    return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2)
  }
}
