import { analyticsMiddleware } from 'vue-analytics'
import { vuexfireMutations } from 'vuexfire'
import { flamelink, firebase } from '~/services/database.js'

export const strict = false

export const state = () => ({
  openNav: false
})

export const plugins = [
  analyticsMiddleware
]

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    commit('courses/APP_READY', flamelink)
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
