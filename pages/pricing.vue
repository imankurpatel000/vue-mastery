<template lang="pug">
.container
  ContactTeamModal(:account='account')
  .wrapper
    .pricing-layout
      .pricing-content

        div(v-if="current === 'Gift'")
          img.gift-icon(src='/images/img-vue-gift.png')
          img.gift-icon(src='/images/img-vue-gift.png')
          h2.title Giving the gift of code means you are:
          ul
            li Encouraging someone to further advance their career
            li Giving someone access to all of our courses, with new videos weekly
        
        div(v-else cloak)
          h2.title Becoming a Vue Mastery Paid Subscriber means:
          ul
            li Access to all paid content. New Lessons Weekly.
            li The ability to track your course progress.
            li Supporting the Vue.js News Podcast.
            li Most importantly, supporting the Vue.js project itself.

      .pricing-structure
        PanelSwitch(:current.sync="current")
          Panel(title="Personal"
            :selected="true")
            PricingCard.w-30(title='Free' price='0')
              .text-center(slot='benefits')
                p Free Vue.js CheatSheet
                p Access to the complete Intro to Vue course
                p Free educational content delivered to your inbox

              button.button.-full(slot="action" 
                @click='openLogin' 
                :class="[account ? 'secondary border' : 'primary']" 
                :disabled='this.account') {{ freeText }}
            
            PricingCard.w-30(title="Monthly" price="19" per="month")
              .benefit(slot="benefits")
                img(src="/images/lgo-vue.svg" alt="Vue.js")
                span $5 of your monthly subscription goes to supporting the Vue.js project itself.

              .benefit.color-gold(slot="benefits")
                i.fas.fa-shield-alt
                span 14-day money-back guarantee

              button.button.primary.-full(slot="action"
                @click="subscribe('monthly-subscription')") Select Plan    

            PricingCard.w-30(title="Annual" price="190" per="year")
              template(slot="benefits")
                .benefit
                  img(src="/images/lgo-vue.svg" alt="Vue.js")
                  span $50 of your yearly subscription goes to supporting the Vue.js project itself.

                .benefit.color-gold
                  i.fas.fa-shield-alt
                  span 14-day money-back guarantee

                .benefit.color-primary
                  i.fa.fa-piggy-bank
                  b Get 2 months free <br>
                    small ($38 discount)
              
              button.button.primary.-full(slot="action"
                @click="subscribe('year-subscription')") Select Plan
          
          Panel(title="Business")
            .team
              .card
                .card-body
                  h3.text-center Team Accounts
                  img(src="/images/img-group-dark.svg" alt="Team accounts VueMastery")

                  div
                    p Reach out for special pricing for your team.
                    p FYI, all team accounts are billed yearly.

                  button.button.secondary.border(@click='openTeamContact') Contact Us
          
          Panel(title="Gift")
            PricingCard.w-30(title="3 Months" price="49" align="center")
              template(slot="benefits")
                .benefit.color-primary(style="pace-items: center")
                  i.fa.fa-piggy-bank
                  b 14% off regular price <br>
                    small ($8 discount)

                .benefit
                  img(src="/images/lgo-vue.svg" alt="Vue.js")
                  span $12 goes to support Vue.js.

              a.button.primary.-full(slot="action" href="javascript:void(0)" data-cb-type="checkout" data-cb-plan-id="3-months-gift-test") Purchase Gift

            PricingCard.w-30(title="6 Months" price="89" align="center")
              template(slot="benefits")
                .benefit.color-primary(style="pace-items: center")
                  i.fa.fa-piggy-bank
                  b 22% off regular price<br>
                    small ($25 discount)

                .benefit
                  img(src="/images/lgo-vue.svg" alt="Vue.js")
                  span $22 goes to support Vue.js.

              a.button.primary.-full(slot="action" href="javascript:void(0)" data-cb-type="checkout" data-cb-plan-id="3-months-gift-test") Purchase Gift

            PricingCard.w-30(title="12 Months" price="149" align="center")
              template(slot="benefits")
                .benefit.color-primary(style="pace-items: center")
                  i.fa.fa-piggy-bank
                  b 35% off regular price <br>
                    small ($79 discount)

                .benefit
                  img(src="/images/lgo-vue.svg" alt="Vue.js")
                  span $37 goes to support Vue.js.

              a.button.primary.-full(slot="action" href="javascript:void(0)" data-cb-type="checkout" data-cb-plan-id="3-months-gift-test") Purchase Gift

            .faq-panel
              h3.text-center Frequently Asked Questions:
              ul
                li 
                  h4 Can I buy a gift for myself?
                  p Yes, you deserve it.  
                li 
                  h4 Can I send this to someone on Christmas (a later date)?  
                  p Yes, we even will automate this for you and send them the email on the day you want.
                li
                  h4 Do I or the recipient need a Vue Mastery account created to purchase this?
                  p No.
                li
                  h4 When does the gift subscription start? 
                  p The gift subscription will need to be redeemed within 45 days of it being sent.  It will start when it is redeemed, not when you purchase it.  If it's not activated within 45 days after it's sent it will activate automatically.

  Testimonials
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import ContactTeamModal from '~/components/account/ContactTeamModal.vue'
import Testimonials from '~/components/static/Testimonials.vue'
import Panel from '~/components/ui/Panel.vue'
import PanelSwitch from '~/components/ui/PanelSwitch.vue'
import PricingCard from '~/components/ui/PricingCard.vue'

export default {
  name: 'page-pricing',

  head () {
    return {
      title: 'Pricing | Vue Mastery'
    }
  },

  middleware: 'anonymous',

  components: {
    ContactTeamModal,
    Testimonials,
    Panel,
    PanelSwitch,
    PricingCard
  },

  data () {
    return {
      chargebeeInstance: null,
      chargbeeLink: '',
      current: undefined
    }
  },

  computed: {
    ...mapState({
      account: result => result.account.account
    }),
    freeText () {
      return this.account ? 'Current Plan' : 'Select Plan'
    }
  },

  mounted () {
    if (!process.server) {
      this.chargebeeInstance = window.Chargebee.init({
        site: process.env.chargebeeSite
      })
    }
  },

  methods: {
    openLogin () {
      if (!this.account) {
        this.$modal.show('login-form', {
          newAccount: true,
          headerTitle: 'Sign Up for a Free Account',
          location: this.location
        })
      }
    },

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
          let redirect
          if (plan === 'monthly-subscription') {
            redirect = '/thank-you-monthly'
            if (this.$trackMonthly) this.$trackMonthly()
          } else {
            redirect = '/thank-you-annual'
            if (this.$trackAnnual) this.$trackAnnual()
          }
          this.$store.dispatch('fakeSubscribe')
          this.$router.push(redirect)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
build-grid-area(pricing-content pricing-structure)

.pricing-layout
  display grid
  grid-template-columns 1fr
  grid-template-areas 'pricing-content'\
                      'pricing-structure'

.pricing-content
  display flex
  position relative
  justify-self center
  flex-direction column
  align-items center
  max-width 500px

  +laptop-up()
    padding-top $vertical-space

  +desktop-up()
    justify-content center
    padding-top 0

  .title
    color $secondary-color
    text-align center

    +laptop-up()
      text-align center

.gift-icon
  position absolute
  width 100px
  top 30px
  display none

  +tablet-up()
    display block

  &:first-of-type
    left -100px
    transform rotate(-10deg)

  &:last-of-type
    right -100px
    transform rotate(10deg)

.pricing-structure
  margin-bottom: $size.by-5

.w-30
  width 100%
  +tablet-up()
    width 30%

.team
  +tablet-up()
    width 50%

  .card-body
    text-align center

    h3
      width 100%
    img
      margin 10px auto 0
      max-width 140px

.faq-panel
  width 100%
  margin-top: $size.by-2
  padding: 0 $size.by-2
  color $secondary-color

  ul
    max-width 650px
    margin 0 auto
    list-style-type none

    li > p
      font-size 1.1em
      font-style italic
      padding-left: $size.by-1
      border-left solid 2px $primary-color
</style>
