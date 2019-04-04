import Vuex from 'vuex'
import account from './modules/account'
import courses from './modules/courses'
import firebase from 'firebase'
import * as types from './mutation-types'
import { analyticsMiddleware } from 'vue-analytics'
import conf from '~/firebase'
const flamelink = (process.server ? require('flamelink') : null)
const firebaseAdmin = (process.server ? require('firebase-admin') : null)
const createStore = () => {
  return new Vuex.Store({
    modules: {
      account,
      courses
    },
    state: {
      openNav: false
    },
    getters: {
      openNav: state => state.openNav
    },
    actions: {
      nuxtServerInit ({ commit }, { req }) {
        if (!firebaseAdmin.apps.length) {
          const firebaseApp = firebaseAdmin.initializeApp()
          this.commit(types.APP_READY, flamelink({ firebaseApp, isAdminApp: true, env: conf.env }))
        } else {
          this.commit(types.APP_READY, flamelink({ firebaseApp: firebaseAdmin.app(), isAdminApp: true, env: conf.env }))
        }
      },
      toggleNav ({ commit }, forceClose) {
        commit('toggleNav', forceClose)
      },
      sendContactRequest ({ commit }, newData) {
        // Get a key for a new contact.
        return firebase.database().ref('/inquiries/').push(newData)
      },
      sendTeamSubscriptionRequest ({ commit }, newData) {
        return firebase.database().ref('/team-request/').push(newData)
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
