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
    return admin
      .database()
      .ref('/flamelink/environments/production/content/team/en-US')
      .once('value', (snapshot) => {
        const teams = snapshot.val()
        console.log(teams)
        for (let team in teams) {
          for (let member in teams[team].members) {
            if (member.email === user.email) {
              console.log(`Found new team member : ${member.email}`)
              this.subscribe(user.email, null, 'year-subscription', true)
            }
          }
        }
      })
  },

  // subscribe (email, id, subscribing = true, tryNumber = 0) {
  subscribe (email, id, planId, subscribing = true) {
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
      .once('child_added', snapshot => {
        const user = snapshot.val()
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
        console.log(`${subscribing ? 'Subscribe' : 'Unsubscribe'} ${user.displayName}`)

        let mailingList = ['Vue Mastery Subscribers']
        switch (planId) {
          case 'monthly-subscription':
            mailingList.push('Active Monthly Subscribers')
            break
          case 'year-subscription':
            mailingList.push('Active Annual Subscribers')
            break
          case 'team-annual-(10-19)-subscription':
          case 'team-annual-(4-9)-subsciption':
            mailingList.push('Vue Mastery Team Subscribers')
            break
          case '12-months-gift':
          case '6-months-gift':
          case '3-months-gift':
            mailingList.push('Active Gift Subscription')
            break
        }

        console.log(`List found: ${mailingList}`)

        const subscribed = []
        mailingList.forEach((list) => {
          console.log(`List added: ${list}`)
          subscribed.push(subscription.getMailerList(list)
            .then(listID => {
              console.log(`Subscribing user to list: ${user.email}, ${listID}, ${subscribing}`)
              subscription.subscribeUser(user, listID, subscribing)
            })
            .catch(function (error) {
              console.log(error)
            })
          )
        })
        return Promise.all(subscribed)
      }, (error) => {
        console.log(error)
      })
  },

  updateMailingSubscription (user, planId) {
    let toRemove = ''
    let toAdd = ''

    switch (planId) {
      case 'monthly-subscription':
        toRemove = ['Active Annual Subscribers', 'Active Gift Subscription']
        toAdd = 'Active Monthly Subscribers'
        break
      case 'year-subscription':
      case 'team-annual-(10-19)-subscription':
      case 'team-annual-(4-9)-subsciption':
        toRemove = ['Active Monthly Subscribers', 'Active Gift Subscription']
        toAdd = 'Active Annual Subscribers'
        break
      case '12-months-gift':
      case '6-months-gift':
      case '3-months-gift':
        toRemove = ['Active Annual Subscribers', 'Active Monthly Subscribers']
        toAdd = 'Active Gift Subscription'
        break
    }

    const actions = []
    toRemove.forEach((list) => {
      actions.push(subscription.getMailerList(list)
        .then(listID => {
          return subscription.deleteSubscriber(listID, user.email).then(() => {
            console.log('Subscriber deleted')
          })
        })
        .catch(function (error) {
          console.log(error)
        })
      )
    })
    actions.push(subscription.getMailerList(toAdd)
      .then(listID => {
        subscription.subscribeUser(user, listID, true)
      })
      .catch(function (error) {
        console.log(error)
      })
    )

    return Promise.all(actions)
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
          if (!val || !val.subscribed) this.subscribe(email, id, subscribing, tryNumber)
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
