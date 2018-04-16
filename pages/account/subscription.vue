
<template lang="pug">
div(v-if='account')
  .general-description
    h1.title Becoming a Vue Mastery Subscriber means

    ul
      li 
        | Access to all paid content&nbsp
        i new lessons weekly.
      li The ability to track your course progress
      li
        | Most importantly, supporting the Vue project&nbsp
        i we give back

  .plans
    h2 Pricing
    .plan-group
      h3.plan-title Monthly
      .price
        span.currency $
        .price-tag 19
        label per month

      p.plan-description
        span.plan-price $5
        i  of your monthly subscription got to supporting the Vue.js project itself.

      p.garantee 100% money-back garantee
  
      ChargeBeeSubscription(plan='year-subscription' :link='chargbeeLink')

    .plan-group
      h3.plan-title Annual
      .price
        span.currency $
        .price-tag 190
        label per year

      p.plan-description
        span.plan-price $50
        i  of your monthly subscription got to supporting the Vue.js project itself.

      p.free
        i 
          strong Get two months free
          |  ($38 discount)

      p.garantee 100% money-back garantee
  
      ChargeBeeSubscription(plan='year-subscription' :link='chargbeeLink')

    .plan-group
      h3.plan-title Team

      p Looking for discounted team account for 4+ people?

      p Please conntact us and we'll be in touch.

      a Contact Us

div(v-else)
  h3 You need to login first
  AuthForm

</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import ChargeBeeSubscription from '~/components/account/3rd-party/ChargeBeeSubscription.vue'
import AuthForm from '~/components/account/AuthForm.vue'

export default {
  name: 'page-subscribe',

  data () {
    return {
      chargebeeInstance: null,
      chargbeeLink: ''
    }
  },

  middleware: 'anonymous',

  components: {
    ChargeBeeSubscription,
    AuthForm
  },

  computed: {
    ...mapState({
      account: result => result.account.account
    })
  },

  watch: {
    account () {
      this.getPortalLink()
    }
  },

  mounted () {
    if (!process.server) {
      this.chargebeeInstance = window.Chargebee.init({
        site: 'vuemastery-test'
      })
      if (this.account) {
        this.getPortalLink()
      }
    }
  },

  methods: {
    getPortalLink () {
      console.log('Get portal link method', this.chargebeeInstance, this.chargebeeInstance.setPortalSession)
      this.chargebeeInstance.setPortalSession(() => {
        console.log('Get portal Session')
        return axios.post('/create_portal_session', {customer_id: this.account.key})
          .then((response) => {
            console.log('Charge be response.data', response.data)
            this.link = response.data.access_url
          })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
