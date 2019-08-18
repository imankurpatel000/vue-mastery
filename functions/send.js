const functions = require('firebase-functions')
const firebaseConfig = functions.config()

var mailgun = require('mailgun-js')({
  apiKey: firebaseConfig.mailgun.apikey,
  domain: firebaseConfig.mailgun.domain
})

module.exports = {
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
      html: `Please contact ${val.name}(${val.email}):
        <br><br>
        They would like ${val.accountNumber} subscriptions.
        <br><br>
        Phone number: ${val.phoneNumber}
        <br><br>
        Website: ${val.companyWebsite}`
    }) // TODO verify mulitline
  }
}
