const test1 = () => {
  return new Promise((resolve, reject) => {
    console.log('test1 start')
    setTimeout(() => {
      console.log('test1 end')
      return resolve('message from test1')
    }, 2000)
  }).then(res => {
    return res
  })
}

// const testAsync = async () => {
//   const test = await test1()
//   console.log(test)
//   return test
// }
// const test2 = () => {
//   return testAsync().then(res => {
//     console.log('test 2', res)
//     return res
//   })
// }

// return Promise.all([test1(), test2()])

// return Promise.all([test1(), test2()]).then((test) => {
//   console.log('YO', test[1])
// })

// Promise.all([test1(), test2()]).then((result) => {
//   return resolve(result)
// })

const test3 = () => {
  console.log('test function that return true instead or promise')
  // return true
}
const promises = []
promises.push(test1())
promises.push(test3())

return Promise.all(promises)
