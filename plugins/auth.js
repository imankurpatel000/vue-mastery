import conf from '~/firebase'
import { apps, initializeApp, auth } from 'firebase'
import flamelink from 'flamelink/dist/flamelink.js'

export default function ({
  store,
  redirect
}) {
  if (!apps.length) {
    const firebaseApp = initializeApp(conf)
    store.commit('courses/APP_READY', flamelink({ firebaseApp, env: conf.env }))
  }

  return auth().onAuthStateChanged((user) => {
    if (user) {
      store.commit('account/SET_USER', user)
    }
  })
}
