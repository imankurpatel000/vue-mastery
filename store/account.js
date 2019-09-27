import { firebase } from '~/services/database.js'
import { mergeDeep } from './helpers'
import { vuexfireMutations, firebaseAction } from 'vuexfire'

export const state = () => ({
  user: null,
  account: null,
  completedUnlogged: {}
})

export const getters = () => ({
  isAuthenticated (state) {
    return !!state.user
  }
})

const createNewAccount = (user, commit, state) => {
  commit('NEW_USER', {
    meta: {
      analytics: [['set', 'userId', user.uid]]
    }
  })
  return firebase.database().ref(`accounts/${user.uid}`).set({
    displayName: user.displayName || user.email.split('@')[0], // use part of the email as a username
    email: user.email,
    image: user.newImage || '/images/default-profile.png', // supply a default profile image for all users
    subscribedToMailingList: true,
    courses: state.completedUnlogged // Add completed lesson while being not registered
  })
}

const getCourseHistory = (currentHistory, courseSlug) => {
  let courses = currentHistory || {}
  // Check if already started the course
  if (typeof (courses[courseSlug]) === 'undefined') {
    courses[courseSlug] = {
      started: true,
      subscribed: false,
      completedLessons: {}
    }
  }
  return courses
}

const getConferenceHistory = (currentHistory, conferenceSlug) => {
  let conferences = currentHistory || {}
  // Check if already started the conferences
  if (typeof (conferences[conferenceSlug]) === 'undefined') {
    conferences[conferenceSlug] = {
      started: true,
      subscribed: false,
      completedLessons: {}
    }
  }
  return conferences
}

const checkForFirstTime = (user, commit, state) => {
  firebase.database().ref('accounts').child(user.uid).once('value', (snapshot) => {
    const userData = snapshot.val()
    if (userData === null) createNewAccount(user, commit, state)
    else {
      // Merge completed lesson while not logged in
      if (state.completedUnlogged !== {}) {
        const courses = mergeDeep(userData.courses, state.completedUnlogged)
        if (courses) {
          firebase.database()
            .ref(`accounts/${state.user.uid}`)
            .update({ courses })
        }
      }
    }
  })
}

const updateUser = (state, update) => {
  return firebase.database().ref(`accounts/${state.user.uid}`).update(update)
}

export const actions = {
  setAccountRef: firebaseAction(({ bindFirebaseRef }, path) => {
    return bindFirebaseRef('account', firebase.database().ref(path))
  }),
  userCreate ({ state, commit }, account) {
    return firebase.auth()
      .createUserWithEmailAndPassword(account.email, account.password)
      .then(({user}) => {
        return createNewAccount(user, commit, state)
      })
  },
  userGoogleLogin ({ commit, state }) {
    firebase.auth().useDeviceLanguage()
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/plus.login')
    provider.setCustomParameters({
      'login_hint': 'youareawesome@example.com'
    })
    return firebase.auth()
      .signInWithPopup(provider)
      .then(({user, additionalUserInfo}) => {
        checkForFirstTime({
          // just use their existing user image to start
          newImage: additionalUserInfo.profile.picture,
          ...user
        }, commit, state)
        return commit('SET_USER', user)
      }).catch((error) => {
        throw new Error(error)
      })
  },
  userGithubLogin ({ commit, state }) {
    firebase.auth().useDeviceLanguage()
    const provider = new firebase.auth.GithubAuthProvider()
    provider.addScope('user:email')
    return firebase.auth()
      .signInWithPopup(provider)
      .then(({user, additionalUserInfo}) => {
        checkForFirstTime({
          // just use their existing user image to start
          newImage: additionalUserInfo.profile.avatar_url,
          ...user
        }, commit, state)
        return commit('SET_USER', user)
      }).catch((error) => {
        throw new Error(error)
      })
  },
  userLogin ({ commit }, account) {
    return firebase.auth()
      .signInWithEmailAndPassword(account.email, account.password)
      .then((user) => {
        return commit('SET_USER', user)
      })
      .catch((error) => {
        throw new Error(error)
      })
  },
  userLogout ({ commit }) {
    return firebase.auth()
      .signOut()
      .then(() => {
        commit('RESET_USER')
      })
  },
  deleteUser ({ commit }) {
    const user = firebase.auth().currentUser

    firebase.database().ref(`accounts/${user.uid}`).remove()

    return user.delete().then(() => {
      firebase.auth()
        .signOut()
        .then(() => {
          commit('RESET_USER')
        })
    }).catch((error) => {
      console.log(error)
    })
  },
  userUpdatePassword ({ state }, newPassword) {
    const user = firebase.auth().currentUser

    return user.updatePassword(newPassword).catch((error) => {
      console.log(`Can't update the password. Error:  ${error}`)
      throw error
    })
  },
  userUpdateEmail ({ state }, newEmail) {
    const user = firebase.auth().currentUser
    firebase.database().ref(`accounts/${state.user.uid}`).update({
      email: newEmail
    })
    return user.updateEmail(newEmail).catch((error) => {
      console.log(`Can't update the email. Error:  ${error}`)
      throw error
    })
  },
  userRetrievePassword ({ state }, account) {
    return firebase.auth()
      .sendPasswordResetEmail(account.email)
      .then(() => {
        // Email sent.
        this.$toast.show('We\'ve sent an email to let you reset your password. Please check your inbox.', {
          duration: 7000,
          className: 'vm-toasted',
          action: {
            text: 'Close',
            onClick: (e, toastObject) => {
              toastObject.goAway(0)
            }
          }
        })
      }).catch((error) => {
        // An error happened.
        console.log(`Can't send retrieve password email. Error:  ${error}`)
      })
  },
  userUpdateSubscription ({ state }, subscribedToMailingList) {
    return updateUser(state, { subscribedToMailingList: subscribedToMailingList })
  },
  userEnrollFreeWeekend ({ state }) {
    return updateUser(state, { enrolledFreeWeekend: true })
  },
  userUpdate ({ state }, newData) {
    return updateUser(state, { displayName: newData.displayName })
  },
  userUpdateImage ({ state }, image) {
    return updateUser(state, { image })
  },
  userUpdateSubscribe ({ state }, courseSlug) {
    let courses = getCourseHistory(state.account.courses, courseSlug)
    courses[courseSlug].subscribed = !courses[courseSlug].subscribed
    return updateUser(state, { courses })
  },
  userUpdateSubscribeConference ({ state }, conferenceSlug) {
    let conferences = getConferenceHistory(state.account.conferences, conferenceSlug)
    conferences[conferenceSlug].subscribed = !conferences[conferenceSlug].subscribed
    return updateUser(state, { conferences })
  },
  userUpdateCompleted ({ state, commit }, lesson) {
    // Check if the user is logged and get either user hisotry or current completed lessons
    let history = state.account ? state.account.courses : state.completedUnlogged
    let courses = getCourseHistory(history, lesson.courseSlug)
    if (courses[lesson.courseSlug]['completedLessons'] === undefined) {
      courses[lesson.courseSlug].completedLessons = {}
    }
    courses[lesson.courseSlug].completedLessons[lesson.lessonSlug] = lesson.isCompleted
    if (state.account) {
      return firebase.database()
        .ref(`accounts/${state.user.uid}`)
        .update({ courses })
    } else {
      commit('UPDATE_COMPLETED', courses)
    }
  },
  userUpdatePlaybackRate ({ state, commit }, newRate) {
    return firebase.database().ref(`accounts/${state.user.uid}`).update({
      playbackRate: newRate
    })
  },
  fakeSubscribe ({ commit, state }) {
    commit('FAKE_SUBSCRIBE')
  }
}

export const mutations = {
  ...vuexfireMutations,
  'RESET_USER' (state, user) {
    state.user = null
    state.account = null
  },
  'SET_USER' (state, user) {
    state.user = user
    return this.dispatch('account/setAccountRef', `accounts/${state.user.uid}`)
  },
  'NEW_USER' (state) {},
  'FAKE_SUBSCRIBE' (state) {
    if (state.account) {
      const subs = {
        subscribed: true
      }
      state.account = { ...state.account, ...subs }
    }
  },
  'UPDATE_COMPLETED' (courses) {
    state.completedUnlogged = courses
  }
}
