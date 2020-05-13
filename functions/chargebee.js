const functions = require('firebase-functions')
const firebaseConfig = functions.config() // JSON.parse(process.env.FIREBASE_CONFIG)
const chargebee = require('chargebee')

chargebee.configure({
  site: firebaseConfig.chargebee.site,
  api_key: firebaseConfig.chargebee.key
})

const configHeader = (res) => {
  res.header('Content-Type', 'application/json')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  return res
}

module.exports = {
  updateEmailCustomer (chargbeeId, oldEmail, newEmail) {
    return chargebee.customer
      .update(chargbeeId, { email: newEmail })
      .request((error) => {
        console.log(error || `Update email ${oldEmail} to ${newEmail} on chargebee customer (${chargbeeId})`)
      })
  },

  unsubscribeSubscriber (chargbeeId) {
    return chargebee.customer.delete(chargbeeId).request((error, result) => {
      console.log(error || `Delete ${result.customer} with card ${result.card} on chargebee customer (${chargbeeId})`)
    })
  },

  createPortalSession (req, res) {
    res = configHeader(res)
    chargebee.portal_session.create({
      customer: {
        id: req.body.customer_id
      }
    }).request((error, result) => {
      if (error) {
        console.log('error', error)
        res.status(500).send(error)
      } else {
        res.send(result.portal_session)
      }
    })
  },

  getCoupon (req, res) {
    try {
      res = configHeader(res)
      chargebee.coupon.retrieve(req.body.coupon_id).request((error, result) => {
        if (error) console.log(error)
        else res.send(result.coupon)
      })
    } catch (error) {
      console.log(error)
    }
  },

  generateHostedPageCheckout (req, res) {
    res = configHeader(res)
    // First promoter affiliate link
    let cfTid = ''
    try {
      cfTid = req.body.cf_tid
    } catch (error) {
      console.log(error)
    }

    let coupon = false
    try {
      coupon = req.body.coupon
    } catch (error) {
      console.log(error)
    }

    const request = {
      subscription: {
        plan_id: req.body.plan_id
      },
      customer: {
        email: req.body.email,
        last_name: req.body.last_name,
        first_name: req.body.first_name,
        cf_tid: cfTid
      },
      embed: 'false'
    }

    if (coupon) request.subscription.coupon = coupon

    chargebee.hosted_page.checkout_new(request).request((error, result) => {
      if (error) {
        console.log('error', error)
        res.status(500).send(error)
      } else {
        res.send(result.hosted_page)
      }
    })
  }
}
