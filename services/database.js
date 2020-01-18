import fl from 'flamelink/app'
import 'flamelink/content'
import 'flamelink/storage'
import 'flamelink/navigation'
import 'flamelink/settings'
import 'flamelink/users'
const conf = require('~/firebase')
let firebaseApp
let fb
if (process.server || process.env.env === 'production') {
  const admin = require('firebase-admin')
  if (!admin.apps.length) {
    const env = require(`../environmentVariable.js`)
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(env),
      databaseURL: env.databaseURL,
      storageBucket: env.storageBucket
    })
  } else {
    firebaseApp = admin.app()
  }
  fb = admin
} else {
  const firebase = require('firebase/app')
  require('firebase/auth')
  require('firebase/database')
  require('firebase/storage')

  if (!firebase.apps.length) {
    firebaseApp = firebase.initializeApp(conf)
  } else {
    firebaseApp = firebase.app()
  }
  fb = firebase
}

export const firebase = fb

export const flamelink = fl({ firebaseApp, dbType: 'rtdb' })
