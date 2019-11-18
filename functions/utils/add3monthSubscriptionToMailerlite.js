const admin = require('firebase-admin')
const serviceAccount = require('../../serviceAccountKey.json')
const chargebeeAccount = require('../../chargebeeAccountKey.json')
const subscription = require('../subscription')

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
// const mailerliteSubscribers = mailerlite.Subscribers
const mailerliteList = mailerlite.Lists

let allList

mailerliteList.getAll().then((res) => {
  allList = res.Results
  // console.log(allList)
})

const subscribeUserToLists = (user, groups, isSubcribing = true) => {
  return Promise.all(
    groups.map(list => {
      // We don't know what kind of object we have
      const listSearch = list.id || list.name || list
      return subscription.subscribeUser(user, listSearch, isSubcribing)
    })
  ).then(() => {
    console.log(`Successfully ${isSubcribing ? 'added' : 'removed'} new client ${isSubcribing ? 'to' : 'from'} mailerlite groups`)
  }).catch((error) => {
    console.log('error', error.message)
  })
}

// Subscription Discounts and Promotions, 10930360
// Biweekly Newsletter, 10930366
// New Free Content Announcements, 10930356
// const mailingList = ['10930360', '10930366', '10930356']

let updated = 0
let badCustomer = []

let threemonth = 0
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
              resolve()
            } else {
              let list = result.list
              // let subscriptionList = []
              for (let index = 0; index < list.length; index++) {
                const element = list[index]
                if (element.subscription.plan_id === '3-month-subscription') {
                  threemonth++
                  console.log(user.email)

                  await subscribeUserToLists(user, ['Vue Mastery Subscribers', '3 Month Subscription'], true)
                  resolve()
                }
              }

              resolve()
            }
          })
          .catch((error) => {
            console.log('error', error.message)
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

admin
  .database()
  .ref('accounts')
  .orderByChild('email')
  // .equalTo('schweiger.pierre@gmail.com')
  // .equalTo('khuynh@simavita.com')
  .once('value', async (snapshot) => {
    const users = snapshot.val()
    // Loop through users with sequence
    for (const childSnapshot in users) {
      await checkSubscription(users[childSnapshot])
      console.log('User processing: ', updated++)
    }

    console.log(`Bad customers: ${badCustomer}`)
    // console.log(`Problems: ${problem}`)
    console.log(`Total: ${updated}; 3 months: ${threemonth}`)
    process.exit()
  }, function (errorObject) {
    console.log('The read failed: ' + errorObject.code)
  })
  .catch((error) => {
    console.log('error', error.message)
  })
