import * as types from '../mutation-types'
import _ from 'lodash'

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
  'socialSharingDescription'
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
  fields: [ 'slug' ]
}, {
  field: 'image',
  subFields: [ 'image' ]
}]

let db = null

// initial state
const state = {
  courses: null,
  course: null,
  lesson: null,
  conferences: null,
  conference: null,
  talk: null,
  latests: null,
  featured: null
}

// getters
const getters = {
  courses: state => state.courses,
  course: state => state.course,
  lesson: state => state.lesson,
  conferences: state => state.conferences,
  conference: state => state.conference,
  talk: state => state.talk,
  latests: state => state.latests,
  featured: state => state.featured
}

// actions
const actions = {
  getAllCourses ({ commit, state }) {
    if (state.courses) return true
    return db.get('courses', {
      populate: [
        {
          field: 'image',
          subFields: [ 'image' ]
        },
        {
          field: 'lessons',
          fields: [ 'slug', 'status', 'date', 'title', 'lessonNumber', 'free' ]
        }
      ]})
      .then(courses => {
        commit(types.RECEIVE_COURSES, { courses })
      })
  },

  getContent ({ commit, state, rootState }, {restricted, category, slug}) {
    let action = category === 'lessons' ? 'LESSON' : 'TALK'
    if (restricted) {
      commit(types['PROTECTED_' + action])
    } else {
      db.get(category, {
        orderByChild: 'slug',
        limitToLast: 1,
        equalTo: slug,
        fields: lockedContent
      })
        .then(content => {
          content = content[Object.keys(content)[0]]
          commit(types['RECEIVE_' + action], { content })
        })
    }
  },

  getCategory ({ commit, state }, { category, slug }) {
    if (state[category] && state[category].slug === slug) return true
    let field = category === 'course' ? 'lessons' : 'talks'
    let fields = category === 'course' ? lessonContent : confContent
    return db.get(`${category}s`, {
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
      ]})
      .then(course => {
        course = course[Object.keys(course)[0]]
        commit(types.RECEIVE_COURSE, { course })
      })
  },

  featured ({ commit, state }) {
    if (state.featured) return true
    return db.get('home', {
      populate: [ {
        field: 'featured',
        fields: [ 'title', 'slug', 'description', 'belongsToCourse', 'duration', 'image', 'free' ],
        populate: [{
          field: 'belongsToCourse',
          subFields: [ 'slug' ]
        }, {
          field: 'image',
          subFields: [ 'image' ]
        }]
      }]
    }).then(featured => {
      commit(types.RECEIVE_FEATURED, { featured })
    })
  },

  latests ({ commit, state }) {
    if (state.latests) return true
    return db.get('lessons', {
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

      commit(types.RECEIVE_LATEST, { publishedLatest })
    })
  },

  getAllConferences ({ commit, state }) {
    if (state.conferences) return true
    return db.get('conference', {
      populate: [
        {
          field: 'banner',
          subFields: [ 'banner' ]
        },
        {
          field: 'talks',
          populate: [ 'image' ]
        }
      ]})
      .then(conferences => {
        commit(types.RECEIVE_CONFERENCES, { conferences })
      })
  },
  // TODO replace by get category in conferences/conf
  getConference ({ commit, state, rootState }, slug) {
    return db.getByField('conference', 'slug', slug, {
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
        commit(types.RECEIVE_CONFERENCE, { conference })
      })
  }
}

// mutations
const mutations = {
  [types.APP_READY] (state, app) {
    db = app.content
  },
  [types.RECEIVE_COURSES] (state, { courses }) {
    for (let course in courses) {
      if (courses.hasOwnProperty(course) && courses[course].lessons) {
        courses[course].lessons = _.orderBy(courses[course].lessons, 'lessonNumber')
      }
    }
    state.courses = courses
  },
  [types.RECEIVE_COURSE] (state, { course }) {
    state.course = course
  },
  [types.RECEIVE_LESSON] (state, { content }) {
    state.lesson = content
  },
  [types.PROTECTED_LESSON] (state) {
    state.lesson = null
  },
  [types.RECEIVE_FEATURED] (state, { featured }) {
    state.featured = featured.featured
  },
  [types.RECEIVE_LATEST] (state, { publishedLatest }) {
    state.latests = publishedLatest
  },
  [types.RECEIVE_CONFERENCES] (state, { conferences }) {
    state.conferences = conferences
  },
  [types.RECEIVE_CONFERENCE] (state, { conference }) {
    state.conference = conference
  },
  [types.RECEIVE_TALK] (state, { content }) {
    state.talk = content
  },
  [types.PROTECTED_TALK] (state) {
    state.talk = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
