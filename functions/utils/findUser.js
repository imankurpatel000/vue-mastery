const admin = require('firebase-admin')

const serviceAccount = require('../../serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://vue-mastery.firebaseio.com'
})

const findEmail = (email) => {
  return admin
    .database()
    .ref('accounts')
    // .orderByChild('displayName')
    // .orderByChild('email')
    // .orderByChild('chargebeeId')
    .equalTo(email)
    .once('child_added', (snapshot) => {
      console.log(snapshot.val())
    })
    .catch((err) => {
      console.error(err)
    })
}

findEmail('schweiger.pierre@gmail.com')
