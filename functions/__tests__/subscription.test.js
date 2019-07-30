const subscription = require('../subscription')

const account = {
  displayName: 'userTest',
  email: 'usertest@vuemastery.com'
}

const account2 = {
  displayName: 'userTest2',
  email: 'usertest2@vuemastery.com'
}

let testList = {
  name: 'This is a test of subscription list',
  id: 0
}

let lists = []

it('Should load the mailerlite list and return list name', async () => {
  const list = await subscription.getMailerList('VueMastery.com New Users')
  expect(list).toEqual({
    id: 9028842,
    name: 'VueMastery.com New Users'
  })
})

it('Should load the mailerlite list and return list id (much faster)', async () => {
  const list = await subscription.getMailerList(9028842)
  expect(list).toEqual({
    id: 9028842,
    name: 'VueMastery.com New Users'
  })
})

it('Should have preload the list', () => {
  lists = subscription.getProloadedList()
  expect(lists.length).toBeGreaterThan(10)
})

it('Should create a list that doesn\'t exist and return the id and name', async () => {
  testList = await subscription.getMailerList(testList.name)
  // TODO: check if the list exist
  expect(testList.name).toEqual('This is a test of subscription list')
  expect(testList.name).toBeTruthy()
})

it('The user should not have any list', async () => {
  // Get user list
  let groups = await subscription.getSubscriberGroups(account.email)

  // After 30 days the user will be remove completly
  if (groups !== undefined) {
    await subscription.subscribeUserToLists(account, groups, false)
    // Get user list
    groups = await subscription.getSubscriberGroups(account.email)
    expect(groups.length).toEqual(0)
  }

  // Get user 2 list
  groups = await subscription.getSubscriberGroups(account2.email)
  // After 30 days the user will be remove completly
  if (groups !== undefined) {
    await subscription.subscribeUserToLists(account2, groups, false)
    // Get user 2 list
    groups = await subscription.getSubscriberGroups(account2.email)
    expect(groups.length).toEqual(0)
  }
})

it('Should subscribe User to a list', async () => {
  // test subscribeUser
  await subscription.subscribeUser(account, testList.id, true)
  // Get user list
  const groups = await subscription.getSubscriberGroups(account.email)
  // The list should contains the test
  const hasList = groups.filter(group => group.id === testList.id)
  expect(hasList.length).toEqual(1)
})

it('Should unsubscribe User to a list', async () => {
  // Test deleteSubscriber
  await subscription.deleteSubscriber(testList.id, account.email)
  // Get user list
  const groups = await subscription.getSubscriberGroups(account.email)
  // The list should contains the test
  const hasList = groups.filter(group => group.id === testList.id)
  // The list should not contains the test
  expect(hasList.length).toEqual(0)
})

it('Should subscribe user to many lists', async () => {
  // Test subscribeUserToLists
  await subscription.subscribeNewMember(account)
  // Get user list
  const groups = await subscription.getSubscriberGroups(account.email)
  // The list shoud be egual to lists
  expect(groups.length).toEqual(4)
})

it('Should also unsubscribe User to all the current lists', async () => {
  // Get user list
  let groups = await subscription.getSubscriberGroups(account.email)
  // Unsubscribe user using subscription.subscribeUser
  await subscription.subscribeUserToLists(account, groups, false)
  // Get user list
  groups = await subscription.getSubscriberGroups(account.email)
  // The list should not contains any list
  expect(groups.length).toEqual(0)
})

it('User can subscribe to monthly subscription', async () => {
  // Test subscribeUserToPlan (user, planId, isSubcribing)
  await subscription.subscribeUserToPlan(account, 'monthly-subscription', true)
  // The user should be subscribed to ['Active Monthly Subscribers', 'Vue Mastery Subscribers']
  const groups = await subscription.getSubscriberGroups(account.email)
  const result = groups.filter(group => {
    return ['Active Monthly Subscribers', 'Vue Mastery Subscribers'].includes(group.name)
  })
  expect(result.length).toEqual(2)
})

it('User can unsubscribe from monthly subscription', async () => {
  // Test subscribeUserToPlan (user, planId, isSubcribing)
  subscription.subscribeUserToPlan(account, 'monthly-subscription', false)
  const groups = await subscription.getSubscriberGroups(account.email)
  expect(groups[0].name).toEqual('Vue Mastery Subscribers')
})

it('User can subscribe to annual subscription', async () => {
  // Test subscribeUserToPlan (user, planId, isSubcribing)
  await subscription.subscribeUserToPlan(account, 'year-subscription', true)
  // The user should be subscribed to ['Active Annual Subscribers', 'Vue Mastery Subscribers']
  const groups = await subscription.getSubscriberGroups(account.email)
  const result = groups.filter(group => {
    return ['Active Annual Subscribers', 'Vue Mastery Subscribers'].includes(group.name)
  })
  expect(result.length).toEqual(2)
})

it('User can unsubscribe from annual subscription', async () => {
  // Test subscribeUserToPlan (user, planId, isSubcribing)
  subscription.subscribeUserToPlan(account, 'year-subscription', false)
  const groups = await subscription.getSubscriberGroups(account.email)
  expect(groups[0].name).toEqual('Vue Mastery Subscribers')
})

it('User can subscribe to gift subscription', async () => {
  // Test subscribeUserToPlan (user, planId, isSubcribing)
  await subscription.subscribeUserToPlan(account, '6-months-gift', true)
  // The user should be subscribed to ['Active Gift Subscription', 'Vue Mastery Subscribers']
  const groups = await subscription.getSubscriberGroups(account.email)
  const result = groups.filter(group => {
    return ['Active Gift Subscription', 'Vue Mastery Subscribers'].includes(group.name)
  })
  expect(result.length).toEqual(2)
})

it('User can unsubscribe from gift subscription', async () => {
  subscription.subscribeUserToPlan(account, '6-months-gift', false)
  const groups = await subscription.getSubscriberGroups(account.email)
  expect(groups[0].name).toEqual('Vue Mastery Subscribers')
})

it('User can subscribe to 3 months gift subscription', async () => {
  await subscription.subscribeUserToPlan(account, '3-months-gift', true)
  // The user should be subscribed to ['Active Gift Subscription', 'Vue Mastery Subscribers']
  const groups = await subscription.getSubscriberGroups(account.email)
  const result = groups.filter(group => {
    return ['Active Gift Subscription', 'Vue Mastery Subscribers'].includes(group.name)
  })
  expect(result.length).toEqual(2)
})

it('User can change from 3 months gift subscription to annual subscription', async () => {
  await subscription.subscribeUserToPlan(account, 'year-subscription', true)
  // The user should be subscribed to ['Active Annual Subscribers', 'Vue Mastery Subscribers']
  const groups = await subscription.getSubscriberGroups(account.email)
  expect(groups.length).toEqual(2)

  const result = groups.filter(group => {
    return ['Active Annual Subscribers', 'Vue Mastery Subscribers'].includes(group.name)
  })
  expect(result.length).toEqual(2)
})

it('Subscriber can change email address', async () => {
  const origin = await subscription.getSubscriberGroups(account.email)
  await subscription.subscribeUserToNewEmail(account, account2)
  // newUserTest should have the same list as userTest
  let groups = await subscription.getSubscriberGroups(account2.email)
  expect(groups.groups).toEqual(origin.groups)

  // User test should not have subscription
  const detail = await subscription.getUserDetail(account.email)
  expect(detail.groups.length).toEqual(0)
  expect(detail.status).toEqual('unsubscribed')
})

// #### CLEANING ####
it('Should remove the list', async () => {
  const mailerlist = await subscription.removeList(testList.id)
  const hasList = mailerlist.filter((list) => {
    return list.id === testList.id
  })

  expect(hasList.length).toEqual(0)
})

it('The user should not be in mailerlite', async () => {
  // Test unsubscribeSubscriber (email)
  await subscription.unsubscribeSubscriber(account2.email)
  // Check if user exist
  const detail = await subscription.getUserDetail(account2.email)
  expect(detail.status).toEqual('unsubscribed')
})
