const functions = require('firebase-functions')
const Mailerlite = require('mailerlite')
const firebaseConfig = functions.config()
const mailerlite = new Mailerlite(firebaseConfig.mailerlite.key)
const mailerliteSubscribers = mailerlite.Subscribers
const mailerliteList = mailerlite.Lists

var mailgun = require('mailgun-js')({
  apiKey: firebaseConfig.mailgun.apikey,
  domain: firebaseConfig.mailgun.domain
})

const mailerlist = []

const preloadList = () => {
  return mailerliteList.getAll().then((result) => {
    result.Results.forEach(r => {
      mailerlist.push({
        name: r.name,
        id: r.id
      })
    })
    console.log('Initialise mailerlite list')
  })
}

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

  // Return asynchronusly the id of the mailerlite list
  async getMailerListId (mailerliteListName) {
    let resultId = null

    // Wait for the mailerlite group list to be available
    if (!mailerlist.length) await preloadList()

    // Find the list that as the same name
    const list = mailerlist.filter(list => {
      return list.name === mailerliteListName
    })

    // It will create the list if it doesn't exist
    if (list.length) {
      console.log(`Using list: ${mailerliteListName}`)
      resultId = list[0].id
    } else {
      console.log(`Create new list: ${mailerliteListName}`)
      await mailerliteList.addList(mailerliteListName).then(res => {
        mailerlist.push({
          name: res.name,
          id: res.id
        })
        resultId = res.id
      })
    }
    return resultId
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

  emailAdminFailedSubscription (email) {
    return mailgun.messages().send({
      from: 'team@vuemastery.com',
      to: 'schweiger.pierre@gmail.com',
      subject: `Failed subscription from ${email}`,
      html: `Failed subscription from ${email}`
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
  },

  unsubscribeSubscriber (email) {
    return mailerliteSubscribers.unsubscribeSubscriber(email)
  },

  getUserLists (email) {
    return mailerliteSubscribers
      .getDetails(email)
      .then(details => {
        let list = []
        const group = details.groups
        if (group) {
          list = Object.keys(group).forEach(function (item) {
            return group[item].id
          })
        } else {
          console.log(`No group for the user ${email}`)
        }
        return list
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
