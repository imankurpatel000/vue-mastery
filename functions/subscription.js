const functions = require('firebase-functions')
const Mailerlite = require('mailerlite')
const firebaseConfig = functions.config()
console.log(process.env)
const mailerKey = firebaseConfig ? firebaseConfig.mailerlite.key : process.env.MAILERLIGHT_TOKEN
const mailerlite = new Mailerlite(mailerKey)
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

  async getUserDetail (email) {
    // getDetails(list_id, callback)
    const account = await mailerliteSubscribers.getDetails(email, false)
    return account
  },

  async getSubscriberGroups (email) {
    const account = await this.getUserDetail(email)
    return account.groups
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
    }).catch((error) => {
      console.log('error', error.message)
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
    let planGroup = -1
    let toRemove = []
    const toAdd = []
    const isTeamPlan = /^team-annual/.test(planId)
    const planIds = [
      'Active Monthly Subscribers',
      'Active Annual Subscribers',
      'Active Gift Subscription',
      '3 Month Subscription'
    ]

    switch (planId) {
      case 'monthly-subscription':
      case 'team-monthly-subscription':
        planGroup = 0
        break
      case 'year-subscription':
      case 'team-annual-(10-19)-subscription':
      case 'team-annual-(4-9)-subsciption':
      case 'team-custom-subscription':
        planGroup = 1
        break
      case '12-months-gift':
      case '6-months-gift':
      case '3-months-gift':
        planGroup = 2
        break
      case '3-month-subscription':
        planGroup = 3
        break
    }

    if (planGroup >= 0) {
      if (isSubcribing) {
        toAdd.push(planIds.splice(planGroup, 1)[0]) // Get plan name to add
        toRemove = planIds // Remove all other plan that the user potentially subscribed
      } else {
        toRemove.push(planIds.splice(planGroup, 1)[0]) // Get plan name to remove
      }

      const isAddingToTeamList = (isSubcribing && isTeamPlan) || (!isSubcribing && !isTeamPlan)
      const teamList = 'Vue Mastery Team Subscribers'
      const subscribersList = 'Vue Mastery Subscribers'

      toAdd.push(isAddingToTeamList ? teamList : subscribersList)
      toRemove.push(isAddingToTeamList ? subscribersList : teamList)

      const promises = [this.subscribeUserToLists(user, toRemove, false)]
      if (isSubcribing) promises.push(this.subscribeUserToLists(user, toAdd))

      return Promise.all(promises)
    } else {
      console.log('The plan Id is not handle', planId)
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
