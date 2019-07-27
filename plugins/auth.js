import conf from '~/firebase'
import firebase from 'firebase/app'
import 'firebase/auth'

import flamelink from 'flamelink/app'

export default function ({ store }) {
  if (!firebase.apps.length) {
    const firebaseApp = firebase.initializeApp(conf)
    store.commit('courses/APP_READY', flamelink({
      firebaseApp,
      env: conf.env
    }))
  }

  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      store.commit('account/SET_USER', user)
    }
  })
}
