import flamelink from 'flamelink/app'
import 'flamelink/content'
import 'flamelink/storage'

const admin = require('firebase-admin')
const conf = require('../firebase')

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
  let image
  try {
    image = lesson.image[0]
    if (!image || image === undefined || image.url === undefined || !image.url || image.url === null) {
      console.log(`Image for the lesson ${lesson.title} does not exist`)
      image = { url: '' }
    }
  } catch (error) {
    console.log(`Image for the lesson ${lesson.title} does not exist`)
  }
  return {
    url: url,
    video: {
      thumbnail_loc: image.url.replace(/&/g, '&amp;'),
      title: lesson.title,
      description: lesson.description,
      // YO: check that
      player_loc: `https://player.vimeo.com/video/${lesson.videoEmbedId}`,
      duration: timeConvert(lesson.duration)
    }
  }
}

const getCoursesPage = async function (db) {
  return db.get('courses', {
    populate: [{
      field: 'lessons',
      subFields: [ 'lessons', 'image', 'status' ],
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
            if (lesson.status === 'published') {
              const url = `/courses/${course.slug}/${lesson.slug}`
              result.pages.push(url)
              result.sitemap.push(createVideoTags(url, lesson))
            }
          }
        }
      }
      result.pages.push('/account/profile')
      result.pages.push('/account/dashboard')
      result.pages.push('/account/account-settings')
      result.pages.push('/account/my-subscription')
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
          result.pages.push(`/conferences/${conference.slug}`)
          result.sitemap.push(`/conferences/${conference.slug}`)
          for (const id of Object.keys(conference.talks)) {
            const talk = conference.talks[id]
            if (talk.isVideoLive === 'true') {
              const url = `/conferences/${conference.slug}/${talk.slug}`
              result.pages.push(url)
              if (!talk.lock && conf.env !== 'staging') {
                result.sitemap.push(createVideoTags(url, talk))
              }
            }
          }
        }
      }
      return result
    })
}

module.exports = async function (nuxt, generateOptions) {
  console.log('Get dynamic routes')
  const key = conf.authDomain === 'vue-mastery-staging.firebaseapp.com' ? 'Staging' : ''
  const serviceAccount = require(`../serviceAccountKey${key}.json`)
  const firebaseConfig = {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: conf.databaseURL,
    storageBucket: conf.storageBucket
  }
  let firebaseApp = {}
  if (admin.apps.length === 0) {
    firebaseApp = admin.initializeApp(firebaseConfig)
  } else {
    firebaseApp = admin.apps[0]
  }
  const db = flamelink({ firebaseApp, isAdminApp: true, env: conf.env }).content

  await getCoursesPage(db, result)
  await getTalksPage(db, result)
  return result
}
