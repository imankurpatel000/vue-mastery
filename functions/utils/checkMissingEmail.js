const admin = require('firebase-admin')
admin.initializeApp({
  databaseURL: 'https://vue-mastery.firebaseio.com',
  projectId: 'vue-mastery'
})
console.log('Test missing email')
admin
  .database()
  .ref('accounts')
  // .orderByChild('email')
  // .equalTo('')
  .once('value', async (snapshot) => {
    const users = snapshot.val()

    // Loop through users with sequence
    for (const childSnapshot in users) {
      if (!users[childSnapshot].hasOwnProperty('email')) {

        const user = await admin.auth().getUser(childSnapshot)
          .then((userRecord) => {
            return userRecord.toJSON()
          })
          .catch((error) => {
            console.log('Error fetching user data:', error)
          })

        // var updates = {}
        // if (user.displayName !== undefined) {
        //   updates['/accounts/' + childSnapshot + '/displayName'] = user.displayName
        // }

        // if (user.email !== undefined) {
        //   updates['/accounts/' + childSnapshot + '/email'] = user.email
        // }

        // await admin.database().ref().update(updates)
        console.log(childSnapshot, user.email, user.displayName)
      }
    }

    process.exit()
  }, function (errorObject) {
    console.log('The read failed: ' + errorObject.code)
  })

