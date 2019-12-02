const flamelink = require('flamelink/app')
require('flamelink/content')
require('flamelink/storage')
const admin = require('firebase-admin')
const conf = require('./firebase')
const serviceAccount = require(`./serviceAccountKey.json`)
const algoliasearch = require('algoliasearch')
const removeMd = require('remove-markdown')
// const sizeof = require('object-sizeof')

// Init firebase
const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: conf.databaseURL,
  storageBucket: conf.storageBucket
}
const firebaseApp = admin.initializeApp(firebaseConfig)
const db = flamelink({ firebaseApp, isAdminApp: true, env: conf.env }).content

// configure algolia
const algolia = algoliasearch(
  conf.algolia.app_id,
  conf.algolia.api_key
)

const createIndexObject = function (data, url, category) {
  let image
  const list = []
  try {
    image = data.image[0].url
  } catch (error) {
    console.log(`Image for the lesson ${data.title} does not exist`)
  }

  const obj = {
    objectID: data.id,
    courseID: data.id,
    url: url,
    title: data.title,
    slug: data.slug,
    category: category,
    date: data.date || data.presentedDate,
    free: data.free || true,
    description: data.description,
    image: image
  }

  let body = data.markdown ? data.markdown : data.body
  body = removeMd(body)
  // const size = sizeof(body)

  body = body.split('\n\n')
  for (const [i, value] of body.entries()) {
    const nobj = Object.assign({}, obj)
    nobj.body = value
    nobj.objectID = obj.courseID + '_' + i
    // console.log(obj.objectID)
    list.push(nobj)
  }

  return list
}

const getCoursesPage = async function () {
  return db.get({
    schemaKey: 'courses',
    populate: [{
      field: 'lessons',
      subFields: [ 'lessons', 'image', 'status' ],
      populate: [ 'image' ]
    }, {
      field: 'image',
      subFields: [ 'image' ]
    }]})
    .then(async courses => {
      let coursePages = []
      for (const key of Object.keys(courses)) {
        const course = courses[key]
        if (course.hasOwnProperty('lessons')) {
          for (const id of Object.keys(course.lessons)) {
            const lesson = course.lessons[id]
            if (lesson.status === 'published') {
              coursePages = coursePages.concat(createIndexObject(lesson, `/courses/${course.slug}/${lesson.slug}`, 'course'))
            }
          }
        }
      }
      return coursePages
    })
}

const getTalksPage = async function () {
  return db.get({
    schemaKey: 'conference',
    populate: [{
      field: 'talks',
      subFields: [ 'lessons', 'image' ],
      populate: [ 'image' ]
    }, {
      field: 'image',
      subFields: [ 'image' ]
    }]})
    .then(async conferences => {
      let talkPages = []
      for (const key of Object.keys(conferences)) {
        const conference = conferences[key]
        if (conference.hasOwnProperty('talks')) {
          // talkPages = talkPages.concat(createIndexObject(conference, `/conferences/${conference.slug}`, 'conferences'))
          for (const id of Object.keys(conference.talks)) {
            const talk = conference.talks[id]
            if (talk.isVideoLive === 'true') {
              talkPages = talkPages.concat(createIndexObject(talk, `/conferences/${conference.slug}/${talk.slug}`, 'conference'))
            }
          }
        }
      }
      return talkPages
    })
}

const getPostsPage = async function () {
  return db.get({
    schemaKey: 'posts',
    populate: [{
      field: 'image',
      subFields: [ 'image' ]
    }]})
    .then(async posts => {
      let postsPages = []
      for (const key of Object.keys(posts)) {
        const post = posts[key]
        if (post.status === 'published') {
          postsPages = postsPages.concat(createIndexObject(post, `/blog/${post.slug}`, 'blog'))
        }
      }
      return postsPages
    })
}

const saveToAlgolia = async function (type, pages) {
  return algolia.initIndex(type)
    .saveObjects(pages)
    .then(() => {
      console.log(`Content ${type} imported into Algolia`)
    })
    .catch(error => {
      console.error('Error when importing lesson into Algolia', error.message, error.debugData.contentLength, error.statusCode)
    })
}

const indexAllContent = async function () {
  console.log('Find all content for index')

  const coursesPages = await getCoursesPage(db)
  const talksPages = await getTalksPage(db)
  const postsPages = await getPostsPage(db)

  const result = coursesPages.concat(talksPages, postsPages)

  console.log(coursesPages.length, talksPages.length, postsPages.length, result.length) //, result[0], talksPages[0], postsPages[0], coursesPages[0])

  // Get all lessons from Firebase
  await saveToAlgolia('vuemastery', result)

  process.exit(1)
}

indexAllContent()
