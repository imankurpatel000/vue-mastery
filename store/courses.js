import _ from 'lodash'

let db = null

export const state = () => ({
  courses: null,
  conferences: null,
  course: null,
  lessons: null,
  latests: null,
  featured: null,
  conference: null,
  contentReady: false
})

export const actions = {
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
        commit('RECEIVE_COURSES', { courses })
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
        commit('RECEIVE_COURSE', { course })
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
      commit('RECEIVE_FEATURED', { featured })
    })
  },

  latests ({ commit, state }) {
    if (state.latests) return true
    return db.get('lessons', {
      limitToLast: 10,
      orderByChild: 'date',
      fields: ['title', 'slug', 'free', 'duration', 'published', 'date', 'belongsToCourse', 'image', 'status'],
      populate: [{
        field: 'belongsToCourse',
        fields: [ 'slug' ]
      }, {
        field: 'image',
        subFields: [ 'image' ]
      }]
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
        commit('RECEIVE_CONFERENCES', { conferences })
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
        commit('RECEIVE_CONFERENCE', { conference })
      })
  },
  contentReady ({ commit }, isReady) {
    commit('CONTENT_READY', isReady)
  }
}

export const mutations = {
  'APP_READY' (state, app) {
    db = app.content
  },
  'RECEIVE_COURSES' (state, { courses }) {
    for (let course in courses) {
      if (courses.hasOwnProperty(course) && courses[course].lessons) {
        courses[course].lessons = _.orderBy(courses[course].lessons, 'lessonNumber')
      }
    }
    state.courses = courses
  },
  'RECEIVE_COURSE' (state, { course }) {
    state.course = course
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
  }
}
