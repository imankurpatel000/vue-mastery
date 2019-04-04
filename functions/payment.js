const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG)
const admin = require('firebase-admin')
const stripe = require('stripe')(firebaseConfig.stripe.token)

// Configure stripe
stripe.currency = firebaseConfig.stripe.currency || 'USD'

module.exports = {
  // register Stripe user
  register (user) {
    return stripe.customers.create({
      email: user.email
    })
      .then(customer => {
        // update database with stripe customer id
        const updates = {}
        updates[`/accounts/${user.uid}/customerId`] = customer.id
        return admin.database().ref().update(updates)
      })
  }
}
