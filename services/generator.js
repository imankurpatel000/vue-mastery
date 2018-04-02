const getCoursesPage = async function (db) {
  return db.get('courses', {
    populate: [ {
      field: 'lessons',
      fields: [ 'slug' ]
    } ]})
    .then(async courses => {
      let pages = []
      for (const key of Object.keys(courses)) {
        const course = courses[key]
        if (course.hasOwnProperty('lessons')) {
          for (const id of Object.keys(course.lessons)) {
            pages.push(`/courses/${course.slug}/${course.lessons[id].slug}`)
          }
        }
      }
      return pages
    })
}

const getTalksPage = async function (db, pages) {
  return db.get('conference', {
    populate: [ {
      field: 'talks',
      fields: [ 'slug' ]
    } ]})
    .then(async conferences => {
      let pages = []
      console.log(conferences)
      for (const key of Object.keys(conferences)) {
        const conference = conferences[key]
        if (conference.hasOwnProperty('talks')) {
          for (const id of Object.keys(conference.talks)) {
            pages.push(`/conferences/${conference.slug}/${conference.talks[id].slug}`)
          }
        }
      }
      return pages
    })
}

module.exports = {
  async getDynamicPage () {
    const flamelink = require('flamelink')
    const admin = require('firebase-admin')
    const serviceAccount = require('../serviceAccountKey.json')
    const firebaseConfig = {
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://vue-mastery.firebaseio.com',
      storageBucket: 'vue-mastery.appspot.com'
    }
    const firebaseApp = admin.initializeApp(firebaseConfig)
    const db = flamelink({ firebaseApp, isAdminApp: true }).content
    let pages = []
    pages = await getCoursesPage(db)
    return pages.concat(await getTalksPage(db))
  }
}
