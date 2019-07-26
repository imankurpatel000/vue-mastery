import Vuex from 'vuex'
import account from './modules/account'
import courses from './modules/courses'
import firebase from 'firebase'
import * as types from './mutation-types'
import { analyticsMiddleware } from 'vue-analytics'
import conf from '~/firebase'
import { vuexfireMutations } from 'vuexfire'
const firebase = (process.server ? require('firebase-admin') : require('firebase'))
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
    if (!firebase.apps.length) {
      const firebaseConfig = {
        apiKey: serviceAccount.client_id,
        authDomain: serviceAccount.auth_uri,
        databaseURL: conf.databaseURL,
        projectId: serviceAccount.project_id,
        storageBucket: conf.storageBucket
      }
      firebase.initializeApp(firebaseConfig)
    }
    commit('courses/APP_READY', firebase.database())
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

export default createStore
