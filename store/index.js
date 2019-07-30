import { analyticsMiddleware } from 'vue-analytics'
import { vuexfireMutations } from 'vuexfire'
import conf from '~/firebase'
import flamelink from 'flamelink/app'
import 'flamelink/content'
import 'flamelink/storage'
import 'flamelink/navigation'
import 'flamelink/settings'
import 'flamelink/users'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
const baseApp = (process.server ? require('firebase-admin') : firebase)
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
    const firebaseConfig = {
      apiKey: serviceAccount.client_id,
      authDomain: serviceAccount.auth_uri,
      databaseURL: conf.databaseURL,
      projectId: serviceAccount.project_id,
      storageBucket: conf.storageBucket
    }
    const firebaseApp = !baseApp.apps.length ? baseApp.initializeApp(firebaseConfig) : baseApp.app()

    commit('courses/APP_READY', flamelink({
      firebaseApp,
      isAdminApp: true,
      env: conf.env
    }))
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
}

export const mutations = {
  ...vuexfireMutations,
  toggleNav (state, forceClose) {
    if (forceClose) state.openNav = false
    else state.openNav = !state.openNav
  }
}
