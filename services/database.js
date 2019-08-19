import fl from 'flamelink/app'
import 'flamelink/content'
import 'flamelink/storage'
import 'flamelink/navigation'
import 'flamelink/settings'
import 'flamelink/users'

let firebaseApp
if (process.server) {
  const admin = require('firebase-admin')

  if (!admin.apps.length) {
    const serviceAccount = require(`../serviceAccountKey.json`)
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://vue-mastery.firebaseio.com',
      storageBucket: 'vue-mastery.appspot.com'
    })
  } else {
    firebaseApp = admin.app()
  }
} else {
  const firebase = require('firebase/app')
  require('firebase/auth')
  require('firebase/database')
  require('firebase/storage')

  if (!firebase.apps.length) {
    firebaseApp = firebase.initializeApp({
      apiKey: 'AIzaSyD2F3LBYo_hSISWmSYdQuACxSSvSAZVYGc',
      authDomain: 'www.vuemastery.com',
      databaseURL: 'https://vue-mastery.firebaseio.com',
      projectId: 'vue-mastery',
      storageBucket: 'vue-mastery.appspot.com',
      messagingSenderId: '905786889431'
    })
  } else {
    firebaseApp = firebase.app()
  }
}

export const firebase = firebaseApp

export const flamelink = fl({ firebaseApp, dbType: 'rtdb' })
