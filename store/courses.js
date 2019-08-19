// Course free and locked content
const lessonContent = [
  'title',
  'slug',
  'image',
  'description',
  'duration',
  'author',
  'date',
  'status',
  'free',
  'lock',
  'twitterImage',
  'facebookImage',
  'socialSharingDescription',
  'belongsToCourse'
]

const confContent = [
  ...lessonContent,
  'presentedDate'
]

const lockedContent = [
  'videoEmbedId',
  'markdown',
  'resources',
  'codingChallenge',
  'downloadLink'
]

const relatedContent = [{
  field: 'belongsToCourse',
  fields: [ 'slug', 'title' ]
}, {
  field: 'image',
  subFields: [ 'image' ]
}]

let db = null

export const state = () => ({
  courses: null,
  course: null,
  lesson: null,
  conferences: null,
  conference: null,
  talk: null,
  latests: null,
  featured: null,
  contentReady: false,
  posts: null,
  post: null
})

export const actions = {
  getAllCourses ({ commit, state }) {
    if (state.courses) return true
    return db.get({
      schemaKey: 'courses',
      populate: [
        {
          field: 'image',
          subFields: [ 'image' ]
        },
        {
          field: 'lessons',
          fields: [ 'slug', 'status', 'date', 'title', 'lessonNumber', 'free' ]
        }
      ] })
      .then(courses => {
        commit('RECEIVE_COURSES', { courses })
      })
  },

  getContent ({ commit, state, rootState }, { restricted, category, slug }) {
    let action = category === 'lessons' ? 'LESSON' : 'TALK'
    if (restricted) {
      commit('PROTECTED_' + action)
    } else {
      db.get({
        schemaKey: category,
        orderByChild: 'slug',
        limitToLast: 1,
        equalTo: slug,
        fields: lockedContent
      })
        .then(content => {
          content = content[Object.keys(content)[0]]
          commit('RECEIVE_' + action, { content })
        })
    }
  },

  getCategory ({ commit, state }, { category, slug }) {
    if (state[category] && state[category].slug === slug) return true
    let field = category === 'course' ? 'lessons' : 'talks'
    let fields = category === 'course' ? lessonContent : confContent
    return db.get({
      schemaKey: `${category}s`,
      orderByChild: 'slug',
      limitToLast: 1,
      equalTo: slug,
      populate: [
        {
          field: 'image',
          subFields: [ 'image' ]
        },
        {
          field: 'facebookImage',
          subFields: [ 'facebookImage' ]
        },
        {
          field: 'twitterImage',
          subFields: [ 'twitterImage' ]
        },
        {
          field: field,
          fields: fields,
          populate: [ 'image', 'facebookImage', 'twitterImage' ]
        }
      ] })
      .then(course => {
        course = course[Object.keys(course)[0]]
        commit('RECEIVE_COURSE', { course })
      })
  },

  featured ({ commit, state }) {
    if (state.featured) return true
    return db.get({
      schemaKey: 'home',
      populate: [ {
        field: 'featured',
        fields: lessonContent,
        populate: relatedContent
      }]
    }).then(featured => {
      commit('RECEIVE_FEATURED', { featured })
    })
  },

  latests ({ commit, state }) {
    if (state.latests) return true
    return db.get({
      schemaKey: 'lessons',
      limitToLast: 10,
      orderByChild: 'date',
      fields: lessonContent,
      populate: relatedContent
    }).then(latests => {
      let publishedLatest = Object.values(latests)
      publishedLatest = publishedLatest.filter(key => {
        return key.status === 'published'
      }).sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
      })

      commit('RECEIVE_LATEST', { publishedLatest })
    })
  },

  getAllConferences ({ commit, state }) {
    if (state.conferences) return true
    return db.get({
      schemaKey: 'conference',
      populate: [
        {
          field: 'banner',
          subFields: [ 'banner' ]
        },
        {
          field: 'talks',
          populate: [ 'image' ]
        }
      ] })
      .then(conferences => {
        commit('RECEIVE_CONFERENCES', { conferences })
      })
  },

  getConference ({ commit }, slug) {
    return db.getByField({
      schemaKey: 'conference',
      field: 'slug',
      value: slug,
      populate: [
        {
          field: 'image',
          subFields: [ 'image' ]
        },
        {
          field: 'banner',
          subFields: [ 'banner' ]
        },
        {
          field: 'facebookImage',
          subFields: [ 'facebookImage' ]
        },
        {
          field: 'twitterImage',
          subFields: [ 'twitterImage' ]
        },
        {
          field: 'talks',
          subFields: [ 'talks', 'image' ],
          populate: [ 'image', 'facebookImage', 'twitterImage' ]
        }
      ]})
      .then(conference => {
        conference = conference[Object.keys(conference)[0]]
        commit('RECEIVE_CONFERENCE', { conference })
      })
  },
  contentReady ({ commit }, isReady) {
    commit('CONTENT_READY', isReady)
  },
  getAllPosts ({ commit, state }) {
    if (state.posts) return true
    return db.get({
      schemaKey: 'posts',
      orderByChild: 'date',
      fields: [ 'slug', 'date', 'title', 'image' ],
      populate: [
        {
          field: 'image',
          subFields: [ 'image' ]
        }
      ] })
      .then(posts => {
        console.log(posts)
        commit('RECEIVE_POSTS', { posts })
      })
  },
  getPost ({ commit, state, rootState }, { slug }) {
    db.get({
      schemaKey: 'posts',
      orderByChild: 'slug',
      limitToLast: 1,
      equalTo: slug,
      fields: [
        'title',
        'slug',
        'image',
        'description',
        'body',
        'author',
        'date',
        'status',
        'twitterImage',
        'facebookImage',
        'socialSharingDescription'
      ]
    })
      .then(content => {
        content = content[Object.keys(content)[0]]
        commit('RECEIVE_POST', { content })
      })
  }
}

export const mutations = {
  'APP_READY' (state, { content }) {
    db = content
  },
  'RECEIVE_COURSES' (state, { courses }) {
    for (let course in courses) {
      if (courses.hasOwnProperty(course) && courses[course].lessons) {
        courses[course].lessons.sort((a, b) => a.lessonNumber - b.lessonNumber)
      }
    }
    state.courses = courses
  },
  'RECEIVE_COURSE' (state, { course }) {
    state.course = course
  },
  'RECEIVE_LESSON' (state, { content }) {
    state.lesson = content
  },
  'PROTECTED_LESSON' (state) {
    state.lesson = null
  },
  'RECEIVE_FEATURED' (state, { featured }) {
    state.featured = featured.featured
  },
  'RECEIVE_LATEST' (state, { publishedLatest }) {
    state.latests = publishedLatest
  },
  'RECEIVE_CONFERENCES' (state, { conferences }) {
    state.conferences = conferences
  },
  'RECEIVE_CONFERENCE' (state, { conference }) {
    state.conference = conference
  },
  'CONTENT_READY' (state, { isReady }) {
    state.contentReady = isReady
  },
  'RECEIVE_TALK' (state, { content }) {
    state.talk = content
  },
  'PROTECTED_TALK' (state) {
    state.talk = null
  },
  'RECEIVE_POST' (state, { content }) {
    state.post = content
  },
  'RECEIVE_POSTS' (state, { posts }) {
    state.posts = posts
  }
}
