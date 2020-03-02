const fs = require('fs')
const admin = require('firebase-admin')

const serviceAccount = require('../../serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://vue-mastery.firebaseio.com'
})

const findInquiries = (email) => {
  var scoresRef = admin.database().ref('team-request')
  scoresRef.orderByValue().on('value', (snapshot) => {
    const toWrite = []
    let total = 0
    snapshot.forEach(data => {
      data = data.val()
      toWrite.push(data)
      const count = parseInt(data.accountNumber)
      if (!isNaN(count) && count < 100) {
        total += count
      }
    })
    console.log(total)
    // fs.writeFileSync('teamRequestData.json', JSON.stringify(toWrite))
  })
}

findInquiries('schweiger.pierre@gmail.com')
