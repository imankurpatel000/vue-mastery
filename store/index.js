import Vuex from 'vuex'
import account from './modules/account'
import courses from './modules/courses'
import firebase from 'firebase'
import * as types from './mutation-types'
import { analyticsMiddleware } from 'vue-analytics'
const flamelink = (process.server ? require('flamelink') : null)
const firebaseAdmin = (process.server ? require('firebase-admin') : null)
const serviceAccount = require('../serviceAccountKey.json')

const createStore = () => {
  return new Vuex.Store({
    modules: {
      account,
      courses
    },
    state: {
      openNav: false,
      storage: null
    },
    getters: {
      openNav: state => state.openNav
    },
    actions: {
      nuxtServerInit ({ commit }, { req }) {
        if (!firebaseAdmin.apps.length) {
          const firebaseConfig = {
            credential: firebaseAdmin.credential.cert(serviceAccount), // required
            databaseURL: 'https://vue-mastery.firebaseio.com',
            storageBucket: 'vue-mastery.appspot.com'
          }
          const firebaseApp = firebaseAdmin.initializeApp(firebaseConfig)
          this.commit(types.APP_READY, flamelink({ firebaseApp, isAdminApp: true }))
        } else {
          this.commit(types.APP_READY, flamelink({ firebaseApp: firebaseAdmin.app(), isAdminApp: true }))
        }
      },
      toggleNav ({ commit }, forceClose) {
        commit('toggleNav', forceClose)
      },
      sendContactRequest ({ commit }, newData) {
        const addr = '/inquiries/'
        // Get a key for a new contact.
        return firebase.database().ref(addr).push(newData)
      }
    },
    mutations: {
      toggleNav (state, forceClose) {
        if (forceClose) state.openNav = false
        else state.openNav = !state.openNav
      }
    },
    plugins: [
      analyticsMiddleware
    ]
  })
}

export default createStore
