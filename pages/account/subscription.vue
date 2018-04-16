
<template lang="pug">
div
  div(v-if='account')
    .form
      h3.form-title Select you plan

      .form-group
        Label Yearly Subscription
        ChargeBeeSubscription(plan='year-subscription' :link='chargbeeLink')

      .form-group
        Label Monthly Subscription
        ChargeBeeSubscription(plan='monthly-subscription' :link='chargbeeLink')
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
