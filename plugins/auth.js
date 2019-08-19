import { firebase, flamelink } from '~/services/database.js'

export default function ({
  store
}) {
  store.commit('courses/APP_READY', flamelink)

  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      store.commit('account/SET_USER', user)
    }
  })
}
