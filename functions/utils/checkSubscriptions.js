const chargebee = require('chargebee')
const admin = require('firebase-admin')
const serviceAccount = require('../serviceAccountKey.json')
const chargebeeAccount = require('../chargebeeAccountKey.json')
let checkNum = process.argv[2] || 20

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://vue-mastery.firebaseio.com'
})

chargebee.configure({
  site: chargebeeAccount.chargebee.site,
  api_key: chargebeeAccount.chargebee.key
})

chargebee.subscription.list({
  limit: checkNum,
  'plan_id[in]': ['monthly-subscription', 'year-subscription'],
  'status[is]': 'active',
  'sort_by[desc]': 'created_at'
}).request((error, result) => {
  if (error) {
    console.log(error)
  } else {
    for (let i = 0; i < result.list.length; i++) {
      const entry = result.list[i]
      const email = entry.customer.email
      admin
        .database()
        .ref('accounts')
        .orderByChild('email')
        .equalTo(email)
        .once('child_added', (snapshot) => {
          const val = snapshot.val()
          if (val.subscribed !== true) {
            console.log(`${i + 1}: ${email} = not ok !!!!!!!`)
          } else {
            console.log(`${i + 1}: ${email} = ok`)
          }
        })
    }
  }
})
