const algoliasearch = require('algoliasearch')
const dotenv = require('dotenv')
const firebase = require('firebase')
const removeMd = require('remove-markdown')

// load values from the .env file in this directory into process.env
dotenv.config()

// configure firebase
firebase.initializeApp({
  databaseURL: process.env.FIREBASE_DATABASE_URL
})
const database = firebase.database()

// configure algolia
const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
)
const index = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME)

const strSplitOnLength = function (data, width) {
  if (data.length <= 0) {
    return [] // return an empty array
  }

  var splitData = data.split(/([\s\n\r]+)/)
  var arr = []
  var cnt = 0
  for (var i = 0; i < splitData.length; ++i) {
    if (!arr[cnt]) arr[cnt] = ''  //Instantiate array entry to empty string if null or undefined

    if (width < (splitData[i].length + arr[cnt].length)) cnt++

    arr[cnt] += splitData[i]
  }

  return arr
}

// Get all lessons from Firebase
database.ref('flamelink/environments/production/content/lessons/en-US').once('value', contacts => {
  // Build an array of all records to push to Algolia
  const records = []
  contacts.forEach(contact => {
    // get the key and data from the snapshot
    const childKey = contact.key
    const childData = contact.val()
    // We set the Algolia objectID as the Firebase .key
    childData.objectID = childKey

    // Add object for indexing
    records.push({
      objectID: childData.objectID,
      title: childData.title,
      slug: childData.slug,
      date: childData.date,
      free: childData.free,
      description: childData.description,
      markdown: removeMd(childData.markdown)
    })
  })

  // console.log(removeMd(records[0].markdown))
  // Add or update new objects
  index
    .saveObjects(records)
    .then(() => {
      console.log('Lessons imported into Algolia')
    })
    .catch(error => {
      console.error('Error when importing lesson into Algolia', error)
      process.exit(1)
    })
})
