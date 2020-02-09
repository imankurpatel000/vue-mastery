const flamelink = require('flamelink/app')
require('flamelink/content')
require('flamelink/storage')
const admin = require('firebase-admin')
const algoliasearch = require('algoliasearch')
const removeMd = require('remove-markdown')
const env = require(`./environmentVariable.js`)
const readline = require('readline')

// Init firebase
const firebaseConfig = {
  credential: admin.credential.cert(env),
  databaseURL: env.databaseURL,
  storageBucket: env.storageBucket
}
const firebaseApp = admin.initializeApp(firebaseConfig)
const db = flamelink({ firebaseApp, isAdminApp: true, env: process.env.env }).content

// configure algolia
const algolia = algoliasearch(
  process.env.algoliaAppId,
  process.env.algoliaApiKey
)

const createIndexObject = function (data, url, category) {
  let image
  const list = []
  try {
    if (category === 'conference') {
      image = data.twitterImage[0].url
    } else {
      image = data.image[0].url
    }
  } catch (error) {
    console.log(`Image for the lesson ${data.title} does not exist`)
  }

  const order = ['course', 'blog', 'conference']

  const obj = {
    objectID: data.id,
    courseID: data.id,
    order: order.findIndex((val) => val === category),
    url: url,
    title: data.title,
    slug: data.slug,
    category: category,
    date: data.date || data.presentedDate,
    free: typeof data.free === 'undefined' ? true : data.free,
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

const createCheetCheatIndex = function () {
  return [{
    objectID: 'vue-cheat-sheet',
    courseID: 'vue-cheat-sheet',
    order: 0,
    url: '/vue-cheat-sheet',
    title: 'Get the Ultimate Vue Cheat Sheet | Vue Mastery',
    slug: 'vue-cheat-sheet',
    category: 'course',
    date: '06/08/2019',
    free: true,
    description: 'All the essential syntax at your fingertips.',
    image: 'https://www.vuemastery.com/images/facbeook_image.png',
    body: 'All the essential syntax at your fingertips.'
  }, {
    objectID: 'vue-3-cheat-sheet',
    courseID: 'vue-3-cheat-sheet',
    order: 0,
    url: '/vue-3-cheat-sheet',
    title: 'Get the Vue 3 Cheat Sheet | Vue Mastery',
    slug: 'vue-3-cheat-sheet',
    category: 'course',
    date: '06/12/2019',
    free: true,
    description: 'Get a head start on the Composition API..',
    image: 'https://www.vuemastery.com/images/facbeook_image.png',
    body: 'Get a head start on the Composition API.'
  }]
}

const getLessonPage = async function (id = null) {
  return db.get({
    schemaKey: 'lessons',
    orderByChild: 'slug',
    limitToLast: 1,
    equalTo: id,
    populate: [ 'image', 'twitterImage', 'facebookImage', {
      field: 'belongsToCourse',
      fields: ['slug']
    } ]
  })
    .then(async lesson => {
      lesson = lesson[Object.keys(lesson)[0]]
      return createIndexObject(lesson, `/courses/${lesson.belongsToCourse[0].slug}/${lesson.slug}`, 'course')
    })
}

const getConferencePage = async function (id = null) {
  return db.get({
    schemaKey: 'talks',
    orderByChild: 'slug',
    limitToLast: 1,
    equalTo: id,
    populate: [ 'image', 'twitterImage', 'facebookImage', {
      field: 'belongsToCourse',
      fields: ['slug']
    } ]
  })
    .then(async talk => {
      talk = talk[Object.keys(talk)[0]]
      return createIndexObject(talk, `/conferences/${talk.belongsToConference[0].slug}/${talk.slug}`, 'conference')
    })
}

const getCoursesPage = async function (id = null) {
  let q = {
    schemaKey: 'courses',
    populate: [{
      field: 'lessons',
      subFields: [ 'lessons', 'image', 'status' ],
      populate: [ 'image' ]
    }, {
      field: 'image',
      subFields: [ 'image' ]
    }]
  }
  if (id) {
    q = {
      ...q,
      orderByChild: 'slug',
      limitToLast: 1,
      equalTo: id
    }
  }

  return db.get(q)
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
      subFields: [ 'lessons', 'twitterImage' ],
      populate: [ 'twitterImage' ]
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

const getPostPage = async function (id = null) {
  return db.get({
    schemaKey: 'post',
    orderByChild: 'slug',
    limitToLast: 1,
    equalTo: id,
    populate: [ 'image', 'twitterImage', 'facebookImage', {
      fields: ['slug']
    } ]
  })
    .then(async post => {
      if (post.status === 'published') {
        return createIndexObject(post, `/blog/${post.slug}`, 'blog')
      }
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

const indexAllContent = async function (id = null, type = null) {
  let result = null
  if (id !== null) {
    if (type !== null) console.log(`Find ${type}: ${id} to add to the search index`)
    switch (type) {
      case 'course':
        result = await getLessonPage(id)
        break
      case 'courses':
        result = await getCoursesPage(id)
        break
      case 'talk':
        result = await getConferencePage(id)
        break
      case 'conference':
        result = await getTalksPage()
        break
      case 'post':
        result = await getPostPage()
        break
      case 'posts':
        result = await getPostsPage()
        break
      case 'cheatsheets':
        result = createCheetCheatIndex()
        break
      default:
        console.log('You must indicate the slug and the type of content (course, courses, talk, conference, post, posts)')
        break
    }
  } else {
    console.log('Find all content for index')
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    await new Promise(resolve => rl.question('Are you sure you want to re-index the all database: [Y]/n ', ans => {
      if (!ans || ans === 'Y') {
        console.log('Re-creating algolia search index')
        // const coursesPages = await getCoursesPage()
        // const talksPages = await getTalksPage()
        // const postsPages = await getPostsPage()
        // result = coursesPages.concat(talksPages, postsPages)
      } else {
        console.log('No action performed')
      }
      rl.close()
      resolve(ans)
    }))
  }

  // Get all lessons from Firebase
  if (result) {
    await saveToAlgolia('vuemastery', result).then((snapshot) => {
      console.log(`New course ${id} added to Algolia`)
    })
      .catch(function (error) {
        console.log(error)
      })
  } else {
    console.log('No result')
  }

  process.exit(1)
}

const args = process.argv.slice(2)
// console.log(process.env.algoliaApiKey)
indexAllContent(...args)
