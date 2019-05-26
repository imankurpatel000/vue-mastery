const chargebee = require('chargebee')
const admin = require('firebase-admin')
const serviceAccount = require('../../serviceAccountKey.json')
const chargebeeAccount = require('../../chargebeeAccountKey.json')
let total = 0
const limit = 100

admin.initializeApp()

chargebee.configure({
  site: chargebeeAccount.site,
  api_key: chargebeeAccount.api_key
})

const checkSubscriptionBatch = (list) => {
  return list.map((entry, i) => {
    const email = entry.customer.email
    admin
      .database()
      .ref('accounts')
      .orderByChild('email')
      .equalTo(email)
      .once('child_added', (snapshot) => {
        console.log(`${total + i}: ${email} = ${snapshot.val().subscribed ? 'ok' : 'not ok !!!!!!!'}`)
      })
      .catch((err) => {
        console.error(err)
      })
  })
}

const checkSubscription = (offset) => {
  chargebee.subscription.list({
    limit: limit,
    offset: offset,
    'plan_id[in]': ['monthly-subscription', 'year-subscription'],
    'status[is]': 'active',
    'sort_by[desc]': 'created_at'
  }).request(async (error, result) => {
    if (error) {
      console.log(error)
    } else {
      Promise.all(checkSubscriptionBatch(result.list))
        .then(() => {
          if (result.next_offset) {
            total += limit
            checkSubscription(result.next_offset)
          } else {
            console.log('No more chargebee account', result)
            process.exit()
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  })
}

checkSubscription()
