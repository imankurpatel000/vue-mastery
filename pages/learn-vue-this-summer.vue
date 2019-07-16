<template lang="pug">
.container
  .wrapper
    img.summer-img(src="/images/marguerite.jpg")
    .summer-layout
      .summer-content
        h2.title Learn Vue this Summer
        p
          | Watch all our premium content for 3 months at a discounted price this Summer.
          br
          br
          | This recurring offer gives you access to all our courses, along with every new video tutorial we release each week.

      .summer-card
        .card
          .card-body
            h3.text-center 3 Months

            .money
              .symbol $
              .decimal 49

            .text-center
              i Access to all premium content

            .benefit
              img(src="/images/lgo-vue.svg" alt="Vue.js")
              span $12 of your subscription goes to supporting the Vue.js project itself.

            button.button.primary.-full( @click="subscribe('3-month-subscription')") Select Plan

  Testimonials
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import Testimonials from '~/components/static/Testimonials.vue'

export default {
  name: 'page-pricing',

  head () {
    return {
      title: 'Learn Vue this Summer | Vue Mastery'
    }
  },

  middleware: 'anonymous',

  components: {
    Testimonials
  },

  data () {
    return {
      chargebeeInstance: null,
      chargbeeLink: ''
    }
  },

  computed: {
    ...mapState({
      account: result => result.account.account
    })
  },

  mounted () {
    if (!process.server) {
      this.chargebeeInstance = window.Chargebee.init({
        site: process.env.chargebeeSite
      })
    }
  },

  methods: {
    subscribe (plan) {
      if (this.account) {
        if (this.account.subscribed) {
          this.$router.push('/account/my-subscription')
        } else {
          this.openCheckout(plan)
        }
      } else {
        this.$modal.show('login-form', {
          newAccount: true,
          headerTitle: 'Please Create an Account',
          location: 'Pricing page',
          redirect: {
            function: this.subscribe,
            params: plan,
            newSubscription: true
          }
        })
      }
    },

    openTeamContact () {
      this.$modal.show('contact-team-form')
    },

    openCheckout (plan) {
      this.chargebeeInstance.openCheckout({
        // This function returns a promise that resolves a hosted page object.
        // If the library that you use for making ajax calls, can return a promise, you can directly return that
        hostedPage: () => {
          let params = new URLSearchParams()
          const lastName = this.account.displayName.split(' ')[1] || this.account.displayName
          const firstName = this.account.displayName.split(' ')[0] || ' '
          params.append('email', this.account.email)
          params.append('last_name', lastName)
          params.append('first_name', firstName)
          params.append('plan_id', plan)
          if (this.account.chargebeeId) {
            params.append('customer_id', this.account.chargebeeId)
          }
          return axios.post(`${process.env.cloudfunctions}/generate_hp_url`, params)
            .then((response) => {
              this.$toast.clear()
              return response.data
            })
        },

        success: () => {
          this.chargebeeInstance.closeAll()
          if (this.$track3Months) this.$track3Months()
          this.$store.dispatch('fakeSubscribe')
          this.$router.push('/thank-you-summer')
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
build-grid-area(pricing-content pricing-structure page-title monthly annually team)

.summer-img
  height: 240px
  margin: 53px auto
  display: block
  object-fit: cover

.summer-layout
  display: flex
  flex-direction: column
  align-items: center

  +desktop-up()
    flex-direction: row

.summer-content
  display flex
  align-items: center
  text-align: center
  max-width 568px
  margin 0 auto
  flex-direction: column

  +desktop-up()
    width: 54%
    margin-right: 4%

  .title
    color $secondary-color
    text-align: center;

    +desktop-up()
      font-size: 3.4rem

  p
    max-width: 400px

.summer-card
  display: flex
  justify-content: center
  align-items: center
  align-content: center
  justify-items: center
  max-width: 550px
  margin: 40px 15px

  +desktop-up()
    width: 43%
    margin-left: 7%

.card
  height 100%
  color $secondary-color
  max-width: 350px

  &:hover
    text-decoration none

  h3
    padding-top 0

  &.secondary
    color #FFFFFF
    background $secondary-color
    &:hover button
      color $secondary-color

  .button
    margin-bottom 0
    margin-top: 25px

  .card-body
    display flex
    flex-direction column

.benefit
  display flex
  align-items start
  margin-bottom 10px
  margin-top 10px

  &.color-primary
    color $primary-color

  &.color-gold
    color #968E11
    flex-grow 1

  i
  img
    margin-right 10px
    font-size 30px
    max-width 30px

.money
  display flex
  justify-content center

.symbol
  font-weight 700
  color $primary-color
  font-size 35px
  padding-top 10px
  margin-left -20px

.decimal
  color $secondary-color
  font-weight 700
  font-size 100px
  line-height 1
</style>
