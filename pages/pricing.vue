<template lang="pug">
  .wrapper
    ContactTeamModal(:account='account')
    .pricing-content
      h2.title Becoming a Vue Mastery Subscriber means
      ul
        li Access to all paid content.  New Lessons Weekly.
        li The ability to track your course progress.
        li Supporting the Vue.js News Podcast.
        li Most importantly, supporting the Vue.js project itself.

    .pricing-structure
      .page-title.text-center
        h2 Pricing

      .monthly
        .card
          .card-body
            h3.text-center Monthly

            .money
              .symbol $
              .decimal 19

            .text-center
              i per month

            .benefit
              img(src="/images/lgo-vue.svg" alt="Vue.js")
              span $5 of your monthly subscription goes to supporting the Vue.js project itself.

            .benefit.color-gold
              i.fas.fa-shield-alt
              b Guaranteed Value

            button.button.primary.-full( @click="subscribe('monthly-subscription')") Select Plan

      .annually
        .card
          .card-body
            h3.text-center Annual

            .money
              .symbol $
              .decimal 190

            .text-center
              i per year

            .benefit
              img(src="/images/lgo-vue.svg" alt="Vue.js")
              span $50 of your yearly subscription goes to supporting the Vue.js project itself.

            .benefit.color-primary
              i.fa.fa-piggy-bank
              b Get 2 months free <br>
                small ($38 discount)

            .benefit.color-gold
              i.fas.fa-shield-alt
              b Guaranteed Value

            button.button.primary.-full( @click="subscribe('year-subscription')") Select Plan

      .team
        .card.secondary
          .card-body
            h3.text-center Team
            img(src="/images/img-group.svg" alt="Team accounts VueMastery")

            div
              p Please contact us, and we’ll take care of you.
              p FYI, all team accounts are billed yearly.

            button.button.inverted.border(@click='openTeamContact') Contact Us
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import ContactTeamModal from '~/components/account/ContactTeamModal.vue'

export default {
  name: 'page-pricing',

  middleware: 'anonymous',

  components: {
    ContactTeamModal
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
        site: 'vuemastery-test'
        // domain: process.env.url
      })
    }
  },

  methods: {
    subscribe (plan) {
      if (this.account) {
        if (this.account.chargebeeId) {
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
            function: this.openCheckout,
            params: plan
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
          params.append('email', this.account.email)
          params.append('plan_id', plan)
          if (this.account.chargebeeId) {
            params.append('customer_id', this.account.chargebeeId)
          }
          return axios.post('https://us-central1-vue-mastery-staging.cloudfunctions.net/generate_hp_url', params)
          // return axios.post('http://localhost:5000/vue-mastery-staging/us-central1/generate_hp_url', params)
            .then((response) => {
              return response.data
            })
        },

        success: () => {
          this.chargebeeInstance.closeAll()
          const redirect = plan === 'monthly-subscription' ? 'thank-you-monthly' : 'thank-you-annual'
          this.$router.push(redirect)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables'

build-grid-area(pricing-content pricing-structure page-title monthly annually team)

.wrapper
  background url(/images/bkg-outline-mountains.svg)
  background-position center bottom
  background-size cover
  grid-template-columns 1fr
  grid-template-areas 'pricing-content'\
                      'pricing-structure'

  +laptop-up()
    grid-template-columns 33% 1fr
    grid-column-gap 2%
    grid-template-areas 'pricing-content pricing-structure'


.pricing-content
  display flex
  flex-direction column
  justify-content start

  .title
    color $secondary-color
  +laptop-up()
    padding-top $vertical-space

  +desktop-up()
    justify-content center
    padding-top 0

.pricing-structure
  display grid
  margin-bottom $vertical-space
  grid-column-gap 20px
  grid-row-gap 20px
  grid-template-columns 1fr
  grid-template-areas 'page-title'\
                      'monthly'\
                      'annually'\
                      'team'

  +tablet-up()
    grid-template-columns 1fr 1fr
    grid-template-areas 'page-title page-title'\
                        'monthly annually'\
                        'team team'

  +desktop-up()
    align-items stretch
    grid-template-columns 1fr 1fr 1fr
    grid-template-areas 'page-title page-title page-title'\
                        'monthly annually team'\

.page-title h2
  color $secondary-color
  font-weight 400

.card
  height 100%
  color $secondary-color

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

.team
  .card-body
    text-align center

    h3
      width 100%
    img
      margin 10px auto 0
      max-width 140px

    div
      flex-grow 1

    +tablet-up()
      display flex
      align-items center
      flex-wrap wrap

    +laptop-up()
      text-align center

      .button
        width 100%

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
