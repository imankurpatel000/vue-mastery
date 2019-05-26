const subscription = require('../subscription')

// const subscribe = (email, id, planId, subscribing = true) => {
//   return new Promise(function (resolve, reject) {
//     const user = {
//       email: email,
//       displayName: 'Pierre'
//     }

//     const promises = []
//     console.log(`${subscribing ? 'Subscribe' : 'Unsubscribe'} ${user.displayName}`)

//     let mailingList = ['Vue Mastery Subscribers']
//     switch (planId) {
//       case 'monthly-subscription':
//         mailingList.push('Active Monthly Subscribers')
//         break
//       case 'year-subscription':
//         mailingList.push('Active Annual Subscribers')
//         break
//       case 'team-annual-(10-19)-subscription':
//       case 'team-annual-(4-9)-subsciption':
//         mailingList.push('Vue Mastery Team Subscribers')
//         break
//       case '12-months-gift':
//       case '6-months-gift':
//       case '3-months-gift':
//         mailingList.push('Active Gift Subscription')
//         break
//     }

//     console.log(`List found: ${mailingList}`)

//     mailingList.forEach((list) => {
//       console.log(`List added: ${list}`)
//       promises.push(subscription.getMailerListId(list)
//         .then(listID => {
//           console.log(`Subscribing user to list: ${email}, ${listID}, ${subscribing}`)
//           subscription.subscribeUser(user, listID, subscribing)
//         })
//         .catch(function (error) {
//           console.log(error)
//         })
//       )
//     })
//     Promise.all(promises).then((result) => {
//       return resolve(result)
//     })
//   })
// }

const functions = require('firebase-functions')
// subscribe('schweiger.pierre@gmail.com', '', 'monthly-subscription', true)
const mailingList = ['mainlistid', 'biweekly', 'discount_and_promotion', 'free_content']
const subscribed = []
const user = {
  email: 'schweiger.pierre@gmail.com',
  displayName: 'Pierre Schweiger'
}
mailingList.forEach(list => {
  const listId = {
    'monthly_subscribers': 'Active Monthly Subscribers',
    'biweekly': 'Biweekly Newsletter',
    'free_content': 'New Free Content Announcements',
    'mainlistid': 'VueMastery.com New Users',
    'annual_subscribers': 'Active Annual Subscribers',
    'key': '70f47e55dcf0244d752ce662ee02b1b8',
    'discount_and_promotion': 'Subscription Discounts and Promotions',
    'gift_subscribers': 'Active Gift Subscription',
    'subscribers': 'Vue Mastery Subscribers'
  }[list]
  // console.log(subscription.getMailerListId(listId))
  subscribed.push(subscription.getMailerListId(listId)
    .then(listID => subscription.subscribeUser(user, listID, true))
    .catch(function (error) {
      console.log(`Adding ${user.email} to ${list}... but ${error}`)
    })
  )
})

Promise.all(subscribed).then(res => {
  console.log('RES', res)
})
