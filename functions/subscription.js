const functions = require('firebase-functions')
const Mailerlite = require('mailerlite')
const mailerlite = new Mailerlite(functions.config().mailerlite.key)
const mailerliteSubscribers = mailerlite.Subscribers
const mailerliteList = mailerlite.Lists

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
    return mailgun.messages().send({
      from: val.email,
      to: 'team@vuemastery.com',
      'h:Reply-To': `${val.name} <${val.email}>`,
      subject: 'Vue Mastery website Request',
      html: `Message from ${val.name}(${val.email}):<br><br>${val.message}`
    })
  },

  sendTeamSubscriptionRequest (val) {
    return mailgun.messages().send({
      from: val.email,
      to: 'team@vuemastery.com',
      'h:Reply-To': `${val.name} <${val.email}>`,
      subject: 'Team Subscription Request',
      html: `Please contact ${val.name}(${val.email}):<br><br>They would like ${val.accountNumber} subscriptions.<br><br> Phone number: ${val.phoneNumber}<br><br> Website: ${val.companyWebsite}`
    })
  },

  deleteSubscriber (listId, email) {
    return mailerliteSubscribers.deleteSubscriber(listId, email)
  }
}
