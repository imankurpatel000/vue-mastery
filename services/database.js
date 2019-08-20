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
      databaseURL: process.env.databaseURL,
      storageBucket: process.env.storageBucket
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
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      databaseURL: process.env.databaseURL,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId
    })
  } else {
    firebaseApp = firebase.app()
  }
}

export const firebase = firebaseApp

export const flamelink = fl({ firebaseApp, dbType: 'rtdb' })
