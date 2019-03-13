const admin = require('firebase-admin')
const serviceAccount = require('../serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://vue-mastery.firebaseio.com'
})

admin
  .database()
  .ref('accounts')
  .orderByChild('chargebeeId')
  .equalTo('')
  .once('value', async (snapshot) => {
    const users = snapshot.val()

    // Loop through users with sequence
    for (const childSnapshot in users) {
      console.log(users[childSnapshot])
    }

    process.exit()
  }, function (errorObject) {
    console.log('The read failed: ' + errorObject.code)
  })
