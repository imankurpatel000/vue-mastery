const admin = require('firebase-admin')
const subscription = require('./subscription')

const functions = require('firebase-functions')
if (admin.apps.length === 0) {
  admin.initializeApp(functions.config().firebase)
}

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

  // subscribe (email, id, subscribing = true, tryNumber = 0) {
  subscribe (email, id, subscribing = true) {
    if (subscribing) console.log(`Attempt to subscribe user with email ${email}`)
    // if (tryNumber) {
    //   if (tryNumber > 10) {
    //     subscription.emailAdminFailedSubscription(email)
    //   } else {
    //     this.checkIfSubscribed(email, id, subscribing, tryNumber)
    //   }
    // }
    return admin
      .database()
      .ref('accounts')
      .orderByChild('email')
      .equalTo(email)
      .once('child_added', (snapshot) => {
        const val = snapshot.val()
        // console.log(`Found ${val} with email ${email}, now updating chargebeeId: ${id}`)
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
      }, (error) => {
        console.log(error)
      })
  },

  checkIfSubscribed (email, id, subscribing, tryNumber) {
    setTimeout(() => {
      console.log('Checking if subscriber already subscribed')
      return admin
        .database()
        .ref('accounts')
        .orderByChild('email')
        .equalTo(email)
        .once('child_added', (snapshot) => {
          console.log('Checking success: user found')
          const val = snapshot.val()
          tryNumber++
          if (!val || !val.subscribed) this.subscribe(email, id, subscribing)
        })
    }, 10000)
  },

  checkIfTeamMember (email) {
    return admin
      .database()
      .ref('/flamelink/environments/production/content/team/en-US')
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

  claim (email, chargebeeId) {
    console.log('Add new gift claim to gift collection')
    var newPostKey = admin.database().ref().child('/flamelink/environments/production/content/Gift/en-US').push().key
    var updates = {}
    updates['/flamelink/environments/production/content/Gift/en-US' + newPostKey] = {
      chargebeeId: chargebeeId,
      email: email,
      claimed: true,
      valid: true
    }
    return admin.database().ref().update(updates)
  },

  checkUnclaimedGift (email) {
    return admin
      .database()
      .ref('/flamelink/environments/production/content/Gift/en-US')
      .orderByChild('email')
      .equalTo(email)
      .once('child_added', (snapshot) => {
        const val = snapshot.val()
        console.log(`Found Gift ${val} with email ${email}, now updating chargebeeId: ${val.chargebeeId}`)
        if (email === val.email && val.claimed && val.valid) {
          this.subscribe(email, val.chargebeeId, true)
        }
      })
  },

  subscribeTeamMember (email, team, subscribing = true) {
    return admin
      .database()
      .ref('accounts')
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
    return admin.database().ref(pathToCourse).once('value')
  },

  lesson (id) {
    const pathToCourse = `flamelink/environments/production/content/lessons/en-US/${id}`
    return admin.database().ref(pathToCourse).once('value')
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
