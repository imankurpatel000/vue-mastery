// const client = require('../firebase.js')
// const baseUrl = client.authDomain

let result = {
  pages: [],
  sitemap: []
}

const timeConvert = function (time) {
  if (time) {
    time = time.split(':')
    return (+time[0]) * 60 * 60 + (+time[1]) * 60 + (+time[2])
  } else {
    return null
  }
}

const createVideoTags = function (url, lesson) {
  return {
    url: url,
    video: {
      thumbnail_loc: lesson.image[0].url.replace(/&/g, '&amp;'),
      title: lesson.title,
      description: lesson.description,
      player_loc: `https://player.vimeo.com/video/${lesson.videoEmbedId}`,
      duration: timeConvert(lesson.duration)
    }
  }
}

const getCoursesPage = async function (db) {
  return db.get('courses', {
    populate: [{
      field: 'lessons',
      subFields: [ 'lessons', 'image' ],
      populate: [ 'image' ]
    }, {
      field: 'image',
      subFields: [ 'image' ]
    }]})
    .then(async courses => {
      for (const key of Object.keys(courses)) {
        const course = courses[key]
        if (course.hasOwnProperty('lessons')) {
          for (const id of Object.keys(course.lessons)) {
            const lesson = course.lessons[id]
            const url = `/courses/${course.slug}/${lesson.slug}`
            result.pages.push(url)
            result.sitemap.push(createVideoTags(url, lesson))
          }
        }
      }
      return result
    })
}

// TODO: refactor the identical functions once conference table is renamed conferences
// and vue/conf v1 is not in prod
const getTalksPage = async function (db) {
  return db.get('conference', {
    populate: [{
      field: 'talks',
      subFields: [ 'lessons', 'image' ],
      populate: [ 'image' ]
    }, {
      field: 'image',
      subFields: [ 'image' ]
    }]})
    .then(async conferences => {
      for (const key of Object.keys(conferences)) {
        const conference = conferences[key]
        if (conference.hasOwnProperty('talks')) {
          for (const id of Object.keys(conference.talks)) {
            const talk = conference.talks[id]
            const url = `/conferences/${conference.slug}/${talk.slug}`
            result.pages.push(url)
            result.sitemap.push(createVideoTags(url, talk))
          }
        }
      }
      return result
    })
}

module.exports = async function (nuxt, generateOptions) {
  console.log('Get dynamic routes')
  const flamelink = require('flamelink')
  const admin = require('firebase-admin')
  const serviceAccount = require('../serviceAccountKey.json')
  const firebaseConfig = {
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: baseUrl,
    databaseURL: 'https://vue-mastery.firebaseio.com',
    // databaseURL: 'https://vue-mastery-staging.firebaseapp.com/',
    storageBucket: 'vue-mastery.appspot.com'
  }
  const firebaseApp = admin.initializeApp(firebaseConfig)
  const db = flamelink({ firebaseApp, isAdminApp: true }).content

  await getCoursesPage(db, result)
  await getTalksPage(db, result)
  return result
}
