const admin = require('firebase-admin')

const serviceAccount = require('../../serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://vue-mastery.firebaseio.com'
})

const findClasses = () => {
  return admin
    .database()
    .ref('flamelink/environments/production/content/lessons/en-US/')
    .orderByChild('lock')
    .equalTo('')
    .once('value', async (snapshot) => {
      const r = await snapshot.val()
      Object.values(r).forEach(element => {
        console.log(element.title, element._ref)
      })
    })
    .catch((err) => {
      console.error(err)
    })
}

findClasses()
