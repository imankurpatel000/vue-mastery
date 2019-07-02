const test = require('firebase-functions-test')({
  databaseURL: 'https://vue-mastery.firebaseio.com',
  projectId: 'vue-mastery'
}, '../serviceAccountKey.json')

const subscription = require('../subscription')
const db = require('../helpers')
const myFunctions = require('../index.js')
const admin = require('firebase-admin')

const fakeUserData = {
  disabled: false,
  displayName: 'Automatic test',
  email: 'automatic-test@vuemastery.com',
  uid: 'x2rJfLxzvGNp7BH3tzXCcxA8QWI3'
}
const fakeUser = test.auth.makeUserRecord(fakeUserData)
const firebaseUser = admin.database().ref(`accounts/${fakeUserData.uid}`)
let createdUser = {}
beforeAll(async () => {
  await firebaseUser.set({
    email: fakeUser.email
  })
})

it('It should subscribe new user to mailerlite, have a subscription and a team account', async () => {
  const wrapped = test.wrap(myFunctions.createCustomer)
  await wrapped(fakeUser)

  createdUser = await subscription.getUserDetail(fakeUser.email)
  expect(createdUser).toHaveProperty('email', fakeUser.email)
  expect(createdUser).toHaveProperty('status', 'active')

  createdUser = await db.account(fakeUser.uid)
  createdUser = createdUser.val()

  expect(createdUser).toHaveProperty('email', fakeUser.email)

  // TODO split this when team can be created programatically
  expect(createdUser).toHaveProperty('subscribed', true)
  expect(createdUser.team).toHaveProperty('companyName', 'Test Pop LLC')
})

it('It should update mailerlite email on firebase email change', async () => {
  const newEmail = 'automatic-test-changed@vuemastery.com'
  const oldEmail = createdUser.email
  const newCreatedUser = Object.create(createdUser)
  newCreatedUser.email = newEmail

  const before = test.database.makeDataSnapshot(createdUser, '/accounts/{uid}')
  const after = test.database.makeDataSnapshot(newCreatedUser, '/accounts/{uid}')
  const wrapped = test.wrap(myFunctions.updateUser)
  await wrapped({
    before: before,
    after: after
  }, {params: {uid: fakeUserData.uid}})

  createdUser = await subscription.getUserDetail(oldEmail)
  expect(createdUser).toHaveProperty('status', 'unsubscribed')

  createdUser = await subscription.getUserDetail(newEmail)
  expect(createdUser).toHaveProperty('status', 'active')

  // Rollback
  await wrapped({
    before: after,
    after: before
  }, {params: {uid: fakeUserData.uid}})
})

it('It should subscribe user to course', async () => {
  const wrapped = test.wrap(myFunctions.subscribeUserToCourse)
  const after = test.database.makeDataSnapshot({
    subscribed: true
  }, '/accounts/{uid}/courses/{cid}')
  await wrapped({
    before: null,
    after: after
  }, {
    params: {
      uid: fakeUserData.uid,
      cid: 'advanced-components'
    }
  })

  // Get user list
  const groups = await subscription.getSubscriberGroups(fakeUserData.email)
  // The list should contains the test
  const hasList = groups.filter(group => group.name === 'Course: advanced-components')
  expect(hasList.length).toEqual(1)
})

it('It should subscribe user to a conference', async () => {
  const wrapped = test.wrap(myFunctions.subscribeUserToConference)
  const after = test.database.makeDataSnapshot({
    subscribed: true
  }, '/accounts/{uid}/conferences/{cid}')
  await wrapped({
    before: null,
    after: after
  }, {
    params: {
      uid: fakeUserData.uid,
      cid: 'vuejs-london-2018'
    }
  })

  // Get user list
  const groups = await subscription.getSubscriberGroups(fakeUserData.email)
  // The list should contains the test
  const hasList = groups.filter(group => group.name === 'Course: vuejs-london-2018')
  expect(hasList.length).toEqual(1)
})

// TODO: Find a way to test contact inquiries form and team requests

// TODO test chargebe change

it('It should unsubscribe user from mailerlite', async () => {
  const wrapped = test.wrap(myFunctions.deleteCustomer)
  await wrapped(fakeUser)

  createdUser = await subscription.getUserDetail(fakeUser.email)
  expect(createdUser).toHaveProperty('status', 'unsubscribed')
})

it('It should unsubscribe user from team', async () => {
  const before = await admin.database().ref('/flamelink/environments/production/content/team/en-US/1526393070788').once('value')
  const testTeam = before.val()
  testTeam.members = testTeam.members.filter(teamMember => {
    return teamMember.email !== 'automatic-test@vuemastery.com'
  })
  const wrapped = test.wrap(myFunctions.subscribeTeamMember)
  const after = test.database.makeDataSnapshot(testTeam, '/flamelink/environments/production/content/team/en-US/{cid}')
  await wrapped({
    before: before,
    after: after
  }, {
    params: {
      cid: '1526393070788'
    }
  })

  createdUser = await db.account(fakeUser.uid)
  createdUser = createdUser.val()
  expect(createdUser).toHaveProperty('subscribed', false)
})

it('It should count lessons in course', async () => {
  let course = await db.course('1516789793545')
  course = course.val()
  let count = 0
  let duration = 0
  await Promise.all(course.lessons.map(async (lessonsId) => {
    let lesson = await db.lesson(lessonsId)
    lesson = lesson.val()
    if (lesson.status === 'published') {
      count++
      duration = db.addTimes(duration, lesson.duration)
    }
  }))

  expect(duration).toEqual(course.duration)
  expect(count).toEqual(course.lessonsCount)

  const lessonRef = await admin.database().ref('/flamelink/environments/production/content/courses/en-US/1516789793545/lessons/1517861162312').once('value')
  const wrapped = test.wrap(myFunctions.countLessonsInCourse)
  await wrapped({
    before: null,
    after: lessonRef
  }, {
    params: {
      cid: '1516789793545',
      lid: '1517861162312'
    }
  })

  course = await db.course('1516789793545')
  course = course.val()
  expect(duration).toEqual(course.duration)
  expect(count).toEqual(course.lessonsCount)
})
