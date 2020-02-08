import flamelink from 'flamelink/app'
import 'flamelink/content'
import 'flamelink/storage'
const env = require(`../environmentVariable.js`)
const admin = require('firebase-admin')

let result = {
  pages: [],
  sitemap: [],
  feed: []
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

  const video = {
    url: url,
    video: {
      thumbnail_loc: image.url.replace(/&/g, '&amp;'),
      title: lesson.title,
      description: lesson.description,
      duration: timeConvert(lesson.duration)
    }
  }
  if (lesson.free) {
    video.player_loc = `https://player.vimeo.com/video/${lesson.videoEmbedId}`
  }
  return video
}

const getCoursesPage = async function (db) {
  return db.get({
    schemaKey: 'courses',
    populate: [{
      field: 'lessons',
      subFields: [ 'lessons', 'image', 'status' ],
      populate: [ 'image' ]
    }, {
      field: 'image',
      subFields: [ 'image' ] // to remove?
    }]})
    .then(async courses => {
      for (const key of Object.keys(courses)) {
        const course = courses[key]
        result.pages.push(`/courses/${course.slug}`)
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
  return db.get({
    schemaKey: 'conference',
    populate: [{
      field: 'talks',
      subFields: [ 'lessons', 'image' ],
      populate: [ 'image' ]
    }, {
      field: 'image',
      subFields: [ 'image' ] // to remove?
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
              if (!talk.lock && env.env !== 'staging') {
                result.sitemap.push(createVideoTags(url, talk))
              }
            }
          }
        }
      }
      return result
    })
}

const getPostsPage = async function (db) {
  return db.get({
    schemaKey: 'posts',
    populate: [{
      field: 'image',
      subFields: [ 'image' ]
    }]})
    .then(async posts => {
      for (const key of Object.keys(posts)) {
        const post = posts[key]
        if (post.status === 'published') {
          result.pages.push(`/blog/${post.slug}`)
          result.sitemap.push(`/blog/${post.slug}`)
          result.feed.push({
            title: post.title,
            id: `/blog/${post.slug}`,
            link: `/blog/${post.slug}`,
            description: post.description,
            pubDate: post.date,
            author: post.author
          })
        }
      }
      return result
    })
}

module.exports = async function () {
  console.log('Get dynamic routes')
  const firebaseConfig = {
    credential: admin.credential.cert(env),
    databaseURL: env.databaseURL,
    storageBucket: env.storageBucket
  }
  let firebaseApp = {}
  if (admin.apps.length === 0) {
    firebaseApp = admin.initializeApp(firebaseConfig)
  } else {
    firebaseApp = admin.apps[0]
  }
  const db = flamelink({ firebaseApp, isAdminApp: true, env: env.env }).content

  await getCoursesPage(db)
  await getTalksPage(db)
  await getPostsPage(db)
  return result
}
