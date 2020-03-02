const serviceAccount = require('../../serviceAccountKey.json')

const Mailerlite = require('mailerlite')
const mailerlite = new Mailerlite(serviceAccount.mailerlite)
// const mailerliteSubscribers = mailerlite.Subscribers
const mailerliteList = mailerlite.Lists

mailerliteList.getAll().then((result) => {
  const list = []
  result.Results.forEach(r => {
    list.push({
      name: r.name,
      id: r.id
    })
  })
  // console.log(list.filter(list => list.name === 'Course: token-based-authentication'))
  console.log('Initialise mailerlite list', list)
})
