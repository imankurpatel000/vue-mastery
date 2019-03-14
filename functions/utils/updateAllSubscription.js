const admin = require('firebase-admin')
const serviceAccount = require('../../serviceAccountKey.json')
const chargebeeAccount = require('../../chargebeeAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://vue-mastery.firebaseio.com'
})

const chargebee = require('chargebee')
chargebee.configure({
  site: chargebeeAccount.site,
  api_key: chargebeeAccount.api_key
})

const Mailerlite = require('mailerlite')
const mailerlite = new Mailerlite(serviceAccount.mailerlite)
const mailerliteSubscribers = mailerlite.Subscribers
const mailerliteList = mailerlite.Lists

let allList

mailerliteList.getAll().then((res) => {
  allList = res.Results
  // console.log(allList)
})

// Subscription Discounts and Promotions, 10930360
// Biweekly Newsletter, 10930366
// New Free Content Announcements, 10930356
const mailingList = ['10930360', '10930366', '10930356']

let updated = 0
let badCustomer = []
let problem = []

const updateUsersFirebaseModel = (childSnapshot, user) => {
  const subscribe = user.subscribedToMailingList
  return childSnapshot.ref.update({
    'subscribedToBiweekly': subscribe,
    'subscribedToDiscountAndPromotion': subscribe,
    'subscribedToFreeContent': subscribe
  }, (error) => {
    if (error) {
      console.log(error)
    } else {
      console.log(`Update email conf for user ${user.email}`)
    }
  })
}

const updateMailerLite = (user) => {
  return new Promise((resolve, reject) => {
    mailingList.forEach((listID) => {
      console.log(`Suscribing user ${user.email} to mailing list ${listID}`)
      return mailerliteSubscribers
        .addSubscriber(listID, user.email, user.displayName, {}, 1)
        .then(resolve)
        .catch((error) => {
          console.log(error)
        })
    })
  }).catch((error) => {
    console.log(error)
  })
}

const splitMainEmailList = (user) => {
  return new Promise((resolve, reject) => {
    if (user) {
      const isUserSubscribed = user.subscribedToMailingList || false
      isUserSubscribed ? updateMailerLite(user).then(resolve) : resolve()
    } else {
      console.log(`ERROR: ${user.email}`)
      resolve()
    }
  }).catch((error) => {
    console.log(error)
  })
}

let annual = 0
let monthly = 0
const checkSubscription = (user) => {
  return new Promise((resolve, reject) => {
    if (user) {
      const isUserSubscribed = user.subscribed || false
      if (isUserSubscribed && user.chargebeeId) {
        chargebee.subscription.list({
          'customer_id[is]': user.chargebeeId,
          'status[is]': 'active',
          'sort_by[desc]': 'created_at'
        }).request(
          async (error, result) => {
            if (error) {
              console.log(error)
              reject(error)
            } else {
              let list = result.list
              let subscriptionList = []
              for (let index = 0; index < list.length; index++) {
                const element = list[index]
                switch (element.subscription.plan_id) {
                  case 'monthly-subscription':
                    subscriptionList.push('Active Monthly Subscribers')
                    break
                  case 'year-subscription':
                    subscriptionList.push('Active Annual Subscribers')
                    break
                  case 'team-annual-(10-19)-subscription':
                  case 'team-annual-(4-9)-subsciption':
                    subscriptionList.push('Vue Mastery Team Subscribers')
                    break
                  case '12-months-gift':
                  case '6-months-gift':
                  case '3-months-gift':
                    subscriptionList.push('Active Gift Subscription')
                    break
                }
              }

              if (subscriptionList.includes('Active Monthly Subscribers')) {
                list = 'Active Monthly Subscribers'
              }
              if (subscriptionList.includes('Active Annual Subscribers')) {
                list = 'Active Annual Subscribers'
              }
              const myList = allList.filter(listNames => listNames.name === list)
              if (myList.length > 0) {
                mailerliteSubscribers
                  .getDetails(user.email)
                  .then(details => {
                    // Check if user is subscribed to VueMastery.com New Users
                    let group = details.groups
                    let isSubscribed = false

                    if (group) {
                      Object.keys(group).forEach(function (item) {
                        if (group[item].id === 9028842) {
                          isSubscribed = true
                        }
                      })
                    } else {
                      console.log(`Error no group ${user.email}`)
                    }

                    if (isSubscribed) {
                      // mailerliteSubscribers.addSubscriber(myList[0].id, user.email, user.displayName, {}, 1)
                      //   .then(resolve)
                      //   .catch((error) => {
                      //     console.log(error)
                      //   })
                    } else resolve()
                  })
                  .catch((error) => {
                    console.log(error)
                  })
              } else {
                resolve()
              }
            }
          })
      } else {
        if (isUserSubscribed && !user.chargebeeId) badCustomer.push(user.email)
        resolve()
      }
    } else {
      console.log(`ERROR: ${user.email}`)
      resolve()
    }
  }).catch((error) => {
    console.log(error)
  })
}

const getMailerList = (mailerliteListName) => {
  return mailerliteList.getAll().then((res) => {
    const list = res.Results.filter(list => list.name === mailerliteListName)
    if (list.length) {
      console.log(`Using list: ${mailerliteListName}`)
      return list[0].id
    } else {
      console.log(`Create new list: ${mailerliteListName}`)
      return mailerliteList.addList(mailerliteListName).then(res => res.id)
    }
  })
}

const updateMailingSubscription = async (user, planId) => {
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
  await toRemove.forEach((list) => {
    getMailerList(list)
      .then(listID => {
        return mailerliteSubscribers.deleteSubscriber(listID, user.email).then(() => {
          console.log('Subscriber deleted')
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  })

  await getMailerList(toAdd)
    .then(listID => {
      mailerliteSubscribers.addSubscriber(listID, user.email, user.displayName, {}, 1)
    })
    .catch(function (error) {
      console.log(error)
    })
  return true
}

admin
  .database()
  .ref('accounts')
  .orderByChild('email')
  // .equalTo('schweiger.pierre@gmail.com')
  .equalTo('reza.palang@gmail.com')
  .once('value', async (snapshot) => {
    const users = snapshot.val()

    // Loop through the users
    // snapshot.forEach((childSnapshot) => {
    //   let user = childSnapshot.val()
    //   updateUsersFirebaseModel(childSnapshot, user)
    // })

    // Loop through users with sequence
    // for (const childSnapshot in users) {
    //   if (updated >= 5430) {
    //     await splitMainEmailList(users[childSnapshot])
    //   }
    //   console.log(updated++)
    // }

    // Loop through users with sequence
    for (const childSnapshot in users) {
      await checkSubscription(users[childSnapshot])
      // await updateMailingSubscription(users[childSnapshot], 'monthly-subscription')
      // if (updated >= 5430) {
      // }
      console.log(updated++)
    }

    // console.log(`Bad customers: ${badCustomer}`)
    // console.log(`Problems: ${problem}`)
    console.log(`Total: ${updated}; Monthly: ${monthly}; Annual: ${annual}`)
    process.exit()
  }, function (errorObject) {
    console.log('The read failed: ' + errorObject.code)
  })
