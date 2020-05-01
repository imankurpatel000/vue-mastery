// Course free and locked content
const imagesGroup = [{
  field: 'image',
  subFields: [ 'image' ]
}, {
  field: 'facebookImage',
  subFields: [ 'facebookImage' ]
}, {
  field: 'twitterImage',
  subFields: [ 'twitterImage' ]
}]

let db = null

export const state = () => ({
  courses: null,
  course: null,
  lesson: null,
  conferences: null,
  conference: null,
  talk: null,
  featured: null,
  posts: null,
  post: null,
  paths: null
})

export const actions = {
  getAllCourses ({ commit, state }) {
    if (state.courses) return true
    return db
      .get({
        schemaKey: 'courses',
        populate: [{
          field: 'image',
          subFields: [ 'image' ]
        }, {
          field: 'lessons',
          fields: [ 'slug', 'status', 'date', 'title', 'lessonNumber', 'free' ]
        }]})
      .then(courses => {
        for (let course in courses) {
          if (courses.hasOwnProperty(course) && courses[course].lessons) {
            courses[course].lessons.sort((a, b) => a.lessonNumber - b.lessonNumber)
          }
        }
        commit('RECEIVE_COURSES', { courses })
      })
  },

  getCourse ({ commit, state }, slug) {
    if (state.course && state.course.slug === slug) return true
    return db
      .getByField({
        schemaKey: 'courses',
        field: 'slug',
        value: slug,
        populate: [
          ...imagesGroup, {
            field: 'lessons',
            fields: ['title', 'slug', 'image', 'description', 'duration', 'author', 'date', 'status', 'free', 'lock', 'twitterImage', 'facebookImage', 'socialSharingDescription', 'belongsToCourse'],
            populate: imagesGroup.map(r => r.field)
          }
        ]})
      .then(course => {
        course = course[Object.keys(course)[0]]
        return commit('RECEIVE_COURSE', { course })
      })
  },

  getContent ({ commit }, { restricted, category, slug }) {
    let action = category === 'lessons' ? 'LESSON' : 'TALK'
    if (restricted) commit('PROTECTED_' + action)
    else {
      db
        .getByField({
          schemaKey: category,
          field: 'slug',
          value: slug,
          fields: ['videoEmbedId', 'markdown', 'resources', 'codingChallenge', 'downloadLink']
        })
        .then(content => {
          content = content[Object.keys(content)[0]]
          commit('RECEIVE_' + action, { content })
        })
    }
  },

  paths ({ commit, state }) {
    if (state.paths) return true
    return db
      .get({ schemaKey: 'course' }) // This is the course page with id course
      .then(paths => commit('RECEIVE_PATH', { paths }))
  },

  getAllConferences ({ commit, state }) {
    if (state.conferences) return true
    return db
      .get({
        schemaKey: 'conference',
        populate: [{
          field: 'banner',
          subFields: [ 'banner' ]
        }, {
          field: 'talks',
          populate: [ 'image' ]
        }]})
      .then(conferences => commit('RECEIVE_CONFERENCES', { conferences }))
  },

  getConference ({ commit, state }, slug) {
    if (state.conference && state.conference.slug === slug) return true
    return db
      .getByField({
        schemaKey: 'conference',
        field: 'slug',
        value: slug,
        populate: [
          ...imagesGroup, {
            field: 'banner',
            subFields: [ 'banner' ]
          }, {
            field: 'talks',
            subFields: [ 'talks', 'image' ],
            populate: imagesGroup.map(r => r.field)
          }]})
      .then(conference => {
        conference = conference[Object.keys(conference)[0]]
        commit('RECEIVE_CONFERENCE', { conference })
      })
  },

  getAllPosts ({ commit, state }) {
    if (state.posts) return true

    return db
      .get({
        schemaKey: 'posts',
        orderByChild: 'date',
        fields: [ 'slug', 'date', 'title', 'image', 'author', 'authorImage', 'description', 'status' ],
        populate: [{
          field: 'image'
        }, {
          field: 'authorImage'
        }]})
      .then(posts => {
        let publishedPost = Object.values(posts)
        publishedPost = publishedPost
          .filter(key => key.status === 'published')
          .sort((a, b) => new Date(b.date) - new Date(a.date))

        commit('RECEIVE_POSTS', publishedPost)
      })
  },

  getPost ({ commit }, slug) {
    if (state.post && state.post.slug === slug) return true
    return db
      .getByField({
        schemaKey: 'posts',
        field: 'slug',
        value: slug,
        populate: [...imagesGroup, { field: 'authorImage' }]
      })
      .then(async post => {
        post = post[Object.keys(post)[0]]
        await commit('RECEIVE_POST', { post })
      })
  }
}

export const mutations = {
  'APP_READY' (state, { content }) {
    db = content
  },
  'RECEIVE_COURSES' (state, { courses }) {
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
  'RECEIVE_CONFERENCES' (state, { conferences }) {
    state.conferences = conferences
  },
  'RECEIVE_CONFERENCE' (state, { conference }) {
    state.conference = conference
  },
  'RECEIVE_TALK' (state, { content }) {
    state.talk = content
  },
  'PROTECTED_TALK' (state) {
    state.talk = null
  },
  'RECEIVE_POST' (state, { post }) {
    state.post = post
  },
  'RECEIVE_POSTS' (state, posts) {
    state.posts = posts
  },
  'RECEIVE_PATH' (state, content) {
    state.paths = content
  }
}
