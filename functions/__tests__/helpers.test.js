require('firebase-functions-test')({
  databaseURL: 'https://vue-mastery.firebaseio.com',
  projectId: 'vue-mastery'
}, '../serviceAccountKey.json')

// jest.setTimeout(50000)

const db = require('../helpers')

// Firebase data example
const account = {
  id: '5WzRzcvHtncB8imVIfGocXZMiMo2',
  email: 'schweiger.pierre@gmail.com',
  team: 'Vue Mastery'
}

// Chargbee data example
const customer = {
  'id': 'Hr5510pQu2E2fD1FKJ',
  'first_name': 'Pierre',
  'last_name': 'Schweiger',
  'email': 'schweiger.pierre@gmail.com'
}
// const course = {
//   id: 1516789793545,
//   title: 'Intro to Vue.js'
// }

const lesson = {
  id: 1517861162312,
  title: 'The Vue Instance'
}

it('It should return user information from id', async () => {
  const snapshot = await db.account(account.id)
  const user = await snapshot.val()
  expect(user.displayName).toEqual('Pierre Schweiger')
})

it('It should return user information from email', async () => {
  const snapshot = await db.accountsFromEmail(account.email)
  snapshot.forEach((child) => {
    const user = child.val()
    expect(user.displayName).toEqual('Pierre Schweiger')
  })
})

// it('It should return a course', async () => {
//   const snapshot = await db.course(course.id)
//   const courseContent = await snapshot.val()
//   expect(courseContent.title).toEqual(course.title)
// })

it('It should return a lesson', async () => {
  const snapshot = await db.lesson(lesson.id)
  const lessonContent = await snapshot.val()
  expect(lessonContent.title).toEqual(lesson.title)
})

it('It should return the teams', async () => {
  const snapshot = await db.teams()
  let foundMember = false
  snapshot.forEach((teamSnapshot) => {
    const company = teamSnapshot.val()
    if (company.companyName === 'Vue Mastery') {
      foundMember = company.members.filter(member => {
        return member.email === account.email
      })
    }
  })
  expect(foundMember[0].email).toEqual(account.email)
})

it('It should unsubscribe', async () => {
  const snapshotAccount = await db.account(account.id)
  let user = await snapshotAccount.val()
  await db.subscribe(customer, 'monthly-subscription', false)
  const snapshot = await db.account(account.id)
  user = await snapshot.val()
  expect(user.subscribed).toBeFalsy()
})

it('It should subscribe', async () => {
  const snapshotAccount = await db.account(account.id)
  let user = await snapshotAccount.val()
  await db.subscribe(customer, 'monthly-subscription', true)
  const snapshot = await db.account(account.id)
  user = await snapshot.val()
  expect(user.subscribed).toBeTruthy()
})

// it('It should be part of a team', async () => {
//   const snapshot = await db.lesson(lesson.id)
//   const lessonContent = await snapshot.val()
//   console.log(lessonContent.title)
//   expect(lessonContent.title).toEqual(lesson.title)
// })

it('It should unsubscribe team member', async () => {
  await db.subscribeTeamMember(account.email, null, false)
  const snapshot = await db.account(account.id)
  const user = await snapshot.val()
  expect(user.team).toBeUndefined()
  expect(user.subscribed).toBeFalsy()
})

it('It should subscribe team member if part of firebase team member', async () => {
  await db.checkIfTeamMember(account.email)
  const snapshot = await db.account(account.id)
  const user = await snapshot.val()
  expect(user.team.companyName).toEqual(account.team)
  expect(user.subscribed).toBeTruthy()
})

it('It should return time addition', async () => {
  const time = db.addTimes('00:05:42', '01:02:23')
  expect(time).toEqual('01:08:05')
})
