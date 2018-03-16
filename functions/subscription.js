const functions = require('firebase-functions')
const Mailerlite = require('mailerlite')
const mailerlite = new Mailerlite(functions.config().mailerlite.key)
const mailerliteSubscribers = mailerlite.Subscribers
const mailerliteList = mailerlite.Lists
// const SparkPost = require('sparkpost')

var mailgun = require('mailgun-js')({
  apiKey: functions.config().mailgun.apikey,
  domain: functions.config().mailgun.domain
})

module.exports = {
  subscribeUser (account, listID, isSubcribing) {
    if (isSubcribing) {
      console.log(`Subscribe ${account.email} to mailing list ${listID}`)
      return mailerliteSubscribers.addSubscriber(listID, account.email, account.displayName, {}, 1)
    } else {
      console.log(`Unsubscribe ${account.email} from mailing list ${listID}`)
      return mailerliteSubscribers.deleteSubscriber(listID, account.email)
    }
  },

  getMailerList (mailerliteListName) {
    return mailerliteList.getAll().then((res) => {
      const list = res.Results.filter(list => list.name === mailerliteListName)
      if (list.length) {
        console.log(`Using list: ${mailerliteListName}`)
        return list[0].id
      } else {
        console.log(`Create new list: ${mailerliteListName}`)
        return mailerliteList.addList(mailerliteListName).then(res => res.id)
      }
    })
  },

  sendContactEmail (val) {
    const mailOptions = {
      from: val.email,
      to: 'team@vuemastery.com',
      'h:Reply-To': val.email
    }

    // The user subscribed to the newsletter.
    mailOptions.subject = `Vue Mastery website Request`
    mailOptions.html = `Message from ${val.name}(${val.email}): ${val.message}`

    return mailgun.messages().send(mailOptions)
  },

  deleteSubscriber (listId, email) {
    return mailerliteSubscribers.deleteSubscriber(listId, email)
  }
}
