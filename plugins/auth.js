// import conf from '~/firebase'
import { initializeApp, auth } from 'firebase'
import conf from '~/firebase'
import flamelink from 'flamelink/app'
const key = conf.authDomain === 'vue-mastery-staging.firebaseapp.com' ? 'Staging' : ''
const serviceAccount = require(`../serviceAccountKey${key}.json`)

export default function ({ store }) {
  const firebaseApp = initializeApp({
    apiKey: serviceAccount.client_id,
    authDomain: serviceAccount.auth_uri,
    databaseURL: conf.databaseURL,
    projectId: serviceAccount.project_id,
    storageBucket: conf.storageBucket
  })

  store.commit('courses/APP_READY', flamelink({
    firebaseApp,
    env: conf.env
  }))

  return auth().onAuthStateChanged((user) => {
    if (user) {
      store.commit('account/SET_USER', user)
    }
  })
}
