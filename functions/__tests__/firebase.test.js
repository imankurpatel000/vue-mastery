it('should pass', () => {
  // meaningless test
  expect(1).toBe(1)
})

// const functions = require('firebase-functions-test')
// const admin = require('firebase-admin')
// const serviceAccount = require('../../serviceAccountKey.json')

// const projectConfig = {
//   projectId: 'vue-mastery',
//   databaseURL: 'https://vue-mastery.firebaseio.com'
// }

// const testEnv = functions(projectConfig, serviceAccount)

const test = require('firebase-functions-test')()

console.log(test.auth.exampleUserRecord())
// const myFunctions = require('../index.js')

// const wrapped = test.wrap(myFunctions.createCustomer)

// // Mock the configuration
// test.mockConfig({
//   gmail: {
//     email: "testsender@test.com",
//     password: "testpassword"
//   }
// })

// const testUser = {
//   uid: "9999",
//   displayName: "Test User"
// }

// // Invoke the wrapped function without specifying the event context.
// wrapped(data)
