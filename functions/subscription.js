const functions = require('firebase-functions')
const Mailerlite = require('mailerlite')
const firebaseConfig = functions.config()
const mailerlite = new Mailerlite(firebaseConfig.mailerlite.key)
const mailerliteSubscribers = mailerlite.Subscribers
const mailerliteList = mailerlite.Lists
let mailerlist = []

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
  getProloadedList () {
    return mailerlist
  },

  // #### Only use (atm) for tests ####
  async removeList (id) {
    await mailerliteList.removeList(id)
    mailerlist = mailerlist.filter((list) => {
      return list.id !== id
    })
    return mailerlist
  },

  async getSubscriberGroups (email) {
    const account = await mailerliteSubscribers.getDetails(email, false)
    return account.groups
  },

  async getUserDetail (email) {
    const account = await mailerliteSubscribers.getDetails(email, false)
    return account
  },

  /**
   * Add or remove a user from a list.
   * @param {object} account - The account including email and displayName.
   * @param {string|number} list - A list id or a list name.
   * @param {boolean} isSubcribing - Your MailerLite API key.
   * @return {promise} - Return Mailerlite promise of addSubscriber or deleteSubscriber
   */
  async subscribeUser (account, list, isSubcribing) {
    // Get the list id of the group or the new group if the name doesn't exist
    list = await this.getMailerList(list)

    if (isSubcribing) {
      console.log(`Subscribe ${account.email} to mailing list ${list.name}`)
      return mailerliteSubscribers.addSubscriber(list.id, account.email, account.displayName, {}, 1)
    } else {
      console.log(`Unsubscribe ${account.email} from mailing list ${list.name}`)
      return mailerliteSubscribers.deleteSubscriber(list.id, account.email)
    }
  },

  deleteSubscriber (listId, email) {
    return mailerliteSubscribers.deleteSubscriber(listId, email)
  },

  subscribeUserToLists (user, groups, isSubcribing = true) {
    return Promise.all(
      groups.map(list => {
        // We don't know what kind of object we have
        const listSearch = list.id || list.name || list
        return this.subscribeUser(user, listSearch, isSubcribing)
      })
    ).then(() => {
      console.log(`Successfully ${isSubcribing ? 'added' : 'removed'} new client ${isSubcribing ? 'to' : 'from'} mailerlite groups`)
    })
  },

  subscribeNewMember (user) {
    const mailingList = [
      'VueMastery.com New Users',
      'Biweekly Newsletter',
      'Subscription Discounts and Promotions',
      'New Free Content Announcements'
    ]

    // Wait for all the subscription to be done before stoping the execution
    return this.subscribeUserToLists(user, mailingList)
  },

  unsubscribeSubscriber (email) {
    // Marks subscriber as unsubscribed. He will no longer receive any campaigns.
    return mailerliteSubscribers.unsubscribeSubscriber(email)
  },

  subscribeUserToPlan (user, planId, isSubcribing = true) {
    let toRemove = []
    let toAdd = []

    switch (planId) {
      case 'monthly-subscription':
        toRemove = ['Active Annual Subscribers', 'Active Gift Subscription']
        toAdd.push('Active Monthly Subscribers')
        break
      case 'year-subscription':
      case 'team-annual-(10-19)-subscription':
      case 'team-annual-(4-9)-subsciption':
        toRemove = ['Active Monthly Subscribers', 'Active Gift Subscription']
        toAdd.push('Active Annual Subscribers')
        break
      case '12-months-gift':
      case '6-months-gift':
      case '3-months-gift':
        toRemove = ['Active Annual Subscribers', 'Active Monthly Subscribers']
        toAdd.push('Active Gift Subscription')
        break
    }
    if (isSubcribing) {
      if (planId === 'team-annual-(10-19)-subscription' || planId === 'team-annual-(4-9)-subsciption') {
        toAdd.push('Vue Mastery Team Subscribers')
      } else {
        toAdd.push('Vue Mastery Subscribers')
      }
      return Promise.all([
        this.subscribeUserToLists(user, toAdd),
        this.subscribeUserToLists(user, toRemove, false)
      ])
    } else {
      return this.subscribeUserToLists(user, toAdd, false)
    }
  },

  // Return asynchronusly the id of the mailerlite list
  async getMailerList (search) {
    let result = null

    // Wait for the mailerlite group list to be available
    if (!mailerlist.length) await preloadList()

    // Find the list that as the same name or id
    const list = mailerlist.filter(list => {
      // Check if list is an interger or a string
      const type = /^\d+$/.test(search) ? 'id' : 'name'
      return list[type] === search
    })

    // It will create the list if it doesn't exist
    if (list.length) {
      console.log(`Found list: ${list[0].name} ${list[0].id}`)
      result = list[0]
    } else {
      console.log(`List ${search} not found. Creating new list...`)
      await mailerliteList.addList(search)
        .then(res => {
          // Add new list to preloaded list
          mailerlist.push({
            name: res.name,
            id: res.id
          })
          result = res
          console.log(`New list created ${res.name} (${res.id})`)
        })
    }
    return result
  },

  async subscribeUserToNewEmail (oldAccount, newAccount) {
    // Get the list that the user is currently subscribing
    let groups = await this.getSubscriberGroups(oldAccount.email)
    if (groups) {
      return Promise.all([
        this.subscribeUserToLists(newAccount, groups),
        this.subscribeUserToLists(oldAccount, groups, false),
        this.unsubscribeSubscriber(oldAccount.email)
      ])
    } else {
      console.log(`The user ${oldAccount.displayName}, with the new email ${oldAccount.email} had no email subscriptions`)
    }
  }
}
