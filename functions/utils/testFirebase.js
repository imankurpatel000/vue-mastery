const admin = require('firebase-admin')
admin.initializeApp()

let subscribe = (email, id, planId, subscribing = true) => {
  return new Promise(function (resolve, reject) {
    if (subscribing) console.log(`Attempt to subscribe user with email ${email}`)
    admin
      .database()
      .ref('accounts')
      .orderByChild('email')
      .equalTo(email)
      .once('value', snapshot => {
        snapshot.forEach(function(child) {
          let user = child.val()
          console.log(typeof user, user)
          if (user) {
            const promises = []
            console.log(`${subscribing ? 'Subscribe' : 'Unsubscribe'} ${user.displayName}`)
            // console.log(snapshot.ref)
            promises.push(child.ref
              .update({
                subscribed: subscribing,
                chargebeeId: id
              }, (error) => {
                if (error) {
                  console.log(`Error subscribing the user: ${error}`)
                } else {
                  console.log(`Success subscribing the user`)
                }
              })
            )

            // let mailingList = ['Vue Mastery Subscribers']
            // switch (planId) {
            //   case 'monthly-subscription':
            //     mailingList.push('Active Monthly Subscribers')
            //     break
            //   case 'year-subscription':
            //     mailingList.push('Active Annual Subscribers')
            //     break
            //   case 'team-annual-(10-19)-subscription':
            //   case 'team-annual-(4-9)-subsciption':
            //     mailingList.push('Vue Mastery Team Subscribers')
            //     break
            //   case '12-months-gift':
            //   case '6-months-gift':
            //   case '3-months-gift':
            //     mailingList.push('Active Gift Subscription')
            //     break
            // }

            // console.log(`List found: ${mailingList}`)

            // mailingList.forEach((list) => {
            //   console.log(`List added: ${list}`)
            //   promises.push(subscription.getMailerListId(list)
            //     .then(listID => {
            //       console.log(`Subscribing user to list: ${user.email}, ${listID}, ${subscribing}`)
            //       subscription.subscribeUser(user, listID, subscribing)
            //     })
            //     .catch(function (error) {
            //       console.log(error)
            //     })
            //   )
            // })
            Promise.all(promises).then((result) => {
              return resolve(result)
            })
          } else {
            return reject(new Error('User not found in firebase'))
          }
        })
      }, (error) => {
        return reject(error)
      })
  })
}

const checkFunction = async () => {
  await subscribe('schweiger.pierre@gmail.com', 'HsTrPisQsDleZbCrU', '')
    .then(values => {
      console.log(`Promise.all give me this values: ${values}`)
    }).catch(err => {
      console.log(`Ohoho ${err}`)
    })
  process.exit()
}

checkFunction()
