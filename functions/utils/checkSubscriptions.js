const chargebee = require('chargebee')
const admin = require('firebase-admin')
const chargebeeAccount = require('../../chargebeeAccountKey.json')
const checkNum = process.argv[2] || 20

admin.initializeApp()

chargebee.configure({
  site: chargebeeAccount.site,
  api_key: chargebeeAccount.api_key
})

let checkSubscription = (list) => {
  let promises = []
  for (let i = 0; i < list.length; i++) {
    const entry = list[i]
    const email = entry.customer.email
    promises.push(admin
      .database()
      .ref('accounts')
      .orderByChild('email')
      .equalTo(email)
      .once('child_added', (snapshot) => {
        console.log(`${i + 1}: ${email} = ${snapshot.val().subscribed ? 'ok' : 'not ok !!!!!!!'}`)
      })
      .catch((err) => {
        console.error(err)
      })
    )
  }
  return promises
}

chargebee.subscription.list({
  limit: checkNum,
  'plan_id[in]': ['monthly-subscription', 'year-subscription'],
  'status[is]': 'active',
  'sort_by[desc]': 'created_at'
}).request(async (error, result) => {
  if (error) {
    console.log(error)
  } else {
    Promise.all(checkSubscription(result.list))
      .then(() => {
        process.exit()
      })
  }
})
