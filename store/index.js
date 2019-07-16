import { database } from 'firebase'
import { analyticsMiddleware } from 'vue-analytics'
import conf from '~/firebase'
import { vuexfireMutations } from 'vuexfire'
const flamelink = (process.server ? require('flamelink/dist/flamelink.js') : null)
const firebaseAdmin = (process.server ? require('firebase-admin') : null)
const key = conf.authDomain === 'vue-mastery-staging.firebaseapp.com' ? 'Staging' : ''
const serviceAccount = require(`../serviceAccountKey${key}.json`)

export const strict = false

export const state = () => ({
  openNav: false
})

export const plugins = [
  analyticsMiddleware
]

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (!firebaseAdmin.apps.length) {
      const firebaseConfig = {
        credential: firebaseAdmin.credential.cert(serviceAccount), // required
        databaseURL: conf.databaseURL,
        storageBucket: conf.storageBucket
      }
      const firebaseApp = firebaseAdmin.initializeApp(firebaseConfig)
      commit('courses/APP_READY', flamelink({ firebaseApp, isAdminApp: true, env: conf.env }))
    } else {
      commit('courses/APP_READY', flamelink({ firebaseApp: firebaseAdmin.app(), isAdminApp: true, env: conf.env }))
    }
  },
  toggleNav ({ commit }, forceClose) {
    commit('toggleNav', forceClose)
  },
  sendContactRequest ({ commit }, newData) {
    // Get a key for a new contact.
    return database().ref('/inquiries/').push(newData)
  },
  sendTeamSubscriptionRequest ({ commit }, newData) {
    return database().ref('/team-request/').push(newData)
  }
}

export const mutations = {
  ...vuexfireMutations,
  toggleNav (state, forceClose) {
    if (forceClose) state.openNav = false
    else state.openNav = !state.openNav
  }
}
