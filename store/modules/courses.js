import * as types from '../mutation-types'

let db = null

// initial state
const state = {
  courses: null,
  conferences: null,
  course: null,
  lessons: null,
  latests: null,
  featured: null,
  conference: null
}

// getters
const getters = {
  courses: state => state.courses,
  course: state => state.course,
  lessons: state => state.lessons,
  latests: state => state.latests,
  featured: state => state.featured,
  conferences: state => state.conferences,
  conference: state => state.conference
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
          fields: [ 'slug', 'status', 'date', 'title', 'lessonNumber' ]
        }
      ]})
      .then(courses => {
        commit(types.RECEIVE_COURSES, { courses })
      })
  },

  getCourse ({ commit, state, rootState }, slug) {
    return db.get('courses', {
      orderByChild: 'slug',
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
          field: 'lessons',
          subFields: [ 'lessons', 'image' ],
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
        populate: [ 'image', 'belongsToCourse' ]
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
      // fields: ['title', 'slug', 'free', 'duration', 'published', 'date', 'belongsToCourse', 'image'],
      populate: [{
        field: 'belongsToCourse',
        subFields: [ 'slug' ]
      }, {
        field: 'image',
        subFields: [ 'image' ]
      // return db.get('course', {
      //   populate: [ {
      //     field: 'latests',
      //     fields: [ 'title', 'slug', 'description', 'belongsToCourse', 'duration', 'image', 'free' ],
      //     populate: [ 'image', 'belongsToCourse' ]
      }]
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
          // fields: [ 'slug', 'image', 'location', 'title', 'talksNumber', 'lightningTalksNumber', 'available' ],
          populate: [ 'image' ]
        }
      ]})
      .then(conferences => {
        commit(types.RECEIVE_CONFERENCES, { conferences })
      })
  },

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
        courses[course].lessons.sort((a, b) => a.lessonNumber - b.lessonNumber)
      }
    }
    state.courses = courses
  },
  [types.RECEIVE_COURSE] (state, { course }) {
    state.course = course
  },
  [types.RECEIVE_FEATURED] (state, { featured }) {
    state.featured = featured.featured
  },
  [types.RECEIVE_LATEST] (state, { publishedLatest }) {
    state.latests = publishedLatest
    // state.latests = latests.latests
  },
  [types.RECEIVE_CONFERENCES] (state, { conferences }) {
    state.conferences = conferences
  },
  [types.RECEIVE_CONFERENCE] (state, { conference }) {
    state.conference = conference
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
