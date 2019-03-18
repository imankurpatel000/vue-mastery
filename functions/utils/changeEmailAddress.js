const chargebee = require('chargebee')
const admin = require('firebase-admin')
const serviceAccount = require('../../serviceAccountKey.json')
const chargebeeAccount = require('../../chargebeeAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://vue-mastery.firebaseio.com'
})

chargebee.configure({
  site: chargebeeAccount.site,
  api_key: chargebeeAccount.api_key
})

const updateChargbeeEmail = (id, oldEmail, newEmail) => {
  return chargebee.customer.update(id, {
    email: newEmail
  }).request((error, result) => {
    if (error) {
      console.log(error)
    } else {
      console.log(`Update customer ${id} from email ${oldEmail} to ${newEmail}`)
    }
    process.exit()
  })
}

const updateEmail = (oldEmail, newEmail) => {
  return admin
    .database()
    .ref('accounts')
    .orderByChild('email')
    .equalTo(oldEmail)
    .once('child_added', (snapshot) => {
      async.retry(3, updateChargbeeEmail(oldEmail, oldEmail, newEmail), (err, result) => {
        // do something with the result
      })
    })
    .catch((err) => {
      console.error(err)
    })
}

updateEmail('pierreschweiger@gmail.com', 'schweiger.pierre@gmail.com')
