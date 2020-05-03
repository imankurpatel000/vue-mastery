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

const checkState = (property, slug) => {
  return state[property] && state[property].slug === slug
}

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
  async getAllCourses ({ commit, state }) {
    if (state.courses) return true
    const courses = await db
      .get({
        schemaKey: 'courses',
        populate: [{
          field: 'image',
          subFields: [ 'image' ]
        }, {
          field: 'lessons',
          fields: [ 'slug', 'status', 'date', 'title', 'lessonNumber', 'free' ]
        }]})
    for (const course in courses) {
      if (courses.hasOwnProperty(course) && courses[course].lessons) {
        courses[course].lessons.sort((a, b) => a.lessonNumber - b.lessonNumber)
      }
    }
    return commit('RECEIVE_COURSES', { courses })
  },

  async getCourse ({ commit, state }, slug) {
    if (checkState('course', slug)) return true
    let course = await db
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
    course = course[Object.keys(course)[0]]
    return commit('RECEIVE_COURSE', { course })
  },

  async getContent ({ commit }, { restricted, category, slug }) {
    let action = category === 'lessons' ? 'LESSON' : 'TALK'
    if (restricted) return commit('PROTECTED_' + action)
    else {
      let content = db
        .getByField({
          schemaKey: category,
          field: 'slug',
          value: slug,
          fields: ['videoEmbedId', 'markdown', 'resources', 'codingChallenge', 'downloadLink']
        })
      content = content[Object.keys(content)[0]]
      return commit('RECEIVE_' + action, { content })
    }
  },

  async paths ({ commit, state }) {
    if (state.paths) return true
    const paths = await db.get({ schemaKey: 'course' })
    return commit('RECEIVE_PATH', { paths })
  },

  async getAllConferences ({ commit, state }) {
    if (state.conferences) return true
    const conferences = db.get({
      schemaKey: 'conference',
      populate: [{
        field: 'banner',
        subFields: [ 'banner' ]
      }, {
        field: 'talks',
        populate: [ 'image' ]
      }]})
    return commit('RECEIVE_CONFERENCES', { conferences })
  },

  async getConference ({ commit, state }, slug) {
    if (checkState('conference', slug)) return true
    let conference = await db
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
    conference = conference[Object.keys(conference)[0]]
    return commit('RECEIVE_CONFERENCE', { conference })
  },

  async getAllPosts ({ commit, state }) {
    if (state.posts) return true
    let posts = await db
      .get({
        schemaKey: 'posts',
        orderByChild: 'date',
        fields: [ 'slug', 'date', 'title', 'image', 'author', 'authorImage', 'description', 'status' ],
        populate: [{
          field: 'image'
        }, {
          field: 'authorImage'
        }]})
    posts = Object.values(posts)
    posts = posts
      .filter(key => key.status === 'published')
      .sort((a, b) => new Date(b.date) - new Date(a.date))
    return commit('RECEIVE_POSTS', posts)
  },

  async getPost ({ commit }, slug) {
    if (checkState('post', slug)) return true
    // TODO: create an array or keep alive?
    let post = await db
      .getByField({
        schemaKey: 'posts',
        field: 'slug',
        value: slug,
        populate: [...imagesGroup, { field: 'authorImage' }]
      })
    post = post[Object.keys(post)[0]]
    return commit('RECEIVE_POST', { post })
  }
}

export const mutations = {
  'APP_READY' (state, { content }) { db = content },
  'RECEIVE_POST' (state, { post }) { state.post = post },
  'RECEIVE_POSTS' (state, posts) { state.posts = posts },
  'RECEIVE_PATH' (state, content) { state.paths = content },
  'RECEIVE_TALK' (state, { content }) { state.talk = content },
  'PROTECTED_TALK' (state) { state.talk = null },
  'RECEIVE_LESSON' (state, { content }) { state.lesson = content },
  'PROTECTED_LESSON' (state) { state.lesson = null },
  'RECEIVE_COURSES' (state, { courses }) { state.courses = courses },
  'RECEIVE_COURSE' (state, { course }) { state.course = course },
  'RECEIVE_CONFERENCES' (state, { conferences }) { state.conferences = conferences },
  'RECEIVE_CONFERENCE' (state, { conference }) { state.conference = conference }
}
