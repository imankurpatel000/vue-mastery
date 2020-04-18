<template lang="pug">
.container
  ContactTeamModal(:account='account')
  .wrapper
    .pricing-layout
      .text-center
        h2.page-title A Vue Mastery subscription gives you access to our library of Vue courses
        .tab-switch(@click='team = !team' :class='{ "switch-active": team }')
          .switch-item Personal
          .switch-item Team

      transition(:name='team ? "swipe-back" : "swipe"' mode='out-in')
        .pricing-cards(v-if='!team' key='personnal')
          .card.side-card.monthly(
            @mouseover='updateParticipation(19)'
            @mouseout='updateParticipation()'
            @click="subscribe('monthly-subscription')"
          )
            .card-body
              h3.text-center Monthly
              .money
                .symbol $
                .decimal 19
                .permonth / Month
              .benefits-list
                .benefit.first-benefit
                  i.fa.fa-check
                  | Watch premium Vue courses
                .benefit
                  i.fa.fa-check
                  span New tutorials released weekly
                .benefit
                  i.fa.fa-check
                  span Donate to the Vue.js project
              button.button.primary.-full Start Plan

          .card.annually(
            @mouseover='updateParticipation(190)'
            @mouseout='updateParticipation()'
            @click="subscribe('year-subscription')"
          )
            .card-body
              .ribbon
                span Most Popular
              h3.text-center Annual
              .money
                .symbol $
                .decimal 16
                .permonth / Month
              .total-price
                span.normal-price $220
                span.discount-price $190
                span.billed-yearly billed yearly
              .benefits-list
                //- .benefit.first-benefit
                //-   i.fa.fa-check
                //-   span 2 Months Free
                .benefit
                  i.fa.fa-check
                  | Watch premium Vue courses
                .benefit
                  i.fa.fa-check
                  span New tutorials released weekly
                //- .benefit
                //-   i.fa.fa-check
                //-   span Exclusive content w/ Evan You
                .benefit
                  i.fa.fa-check
                  span Donate to the Vue.js project
              button.button.primary.-full Start Plan

          .card.side-card(@click='openLogin')
            .card-body.free-sub
              h3.text-center Free
              .money
                .symbol $
                .decimal 0
              .benefits-list
                .benefit.first-benefit
                  i.fa.fa-check
                  | Unlock additional free lessons
                .benefit
                  i.fa.fa-check
                  | Track your progress
                .benefit
                  i.fa.fa-check
                  | Download our cheat sheets
              button.button.-full.secondary.border(:disabled='this.account') Create Free account

        .team-wrapper(
          v-else
          key='team'
          @mouseover='updateParticipation(800)'
          @mouseout='updateParticipation()'
          @click='openTeamContact'
        )
          .card.team-card
            .card-body
              h3.text-center Team Discount
              .money
                .decimal 35
                .pourcent-off
                  .pourcent %
                  .off Off
              .benefits-list
                .benefit
                  i.fa.fa-check
                  | Watch premium Vue courses
                .benefit
                  i.fa.fa-check
                  span New tutorials released weekly
                //- .benefit
                //-   i.fa.fa-check
                //-   span Exclusive content w/ Evan You
                .benefit
                  i.fa.fa-check
                  span Donate to the Vue.js project
              button.button.primary.-full Let's talk

          .card.team-description
            .benefits-list
              .benefit
                i.fa.fa-check
                | Level up your team’s Vue skills
              .benefit
                i.fa.fa-check
                | Quickly onboard team members
              .benefit
                i.fa.fa-check
                | Keep your team current on your technology
              .benefit
                i.fa.fa-check
                | Support open source

            p Team can be any size, and you can add or switch members as needed. Companies using our platform include:
            img(src='/images/price/teams.png')

  counter(:participation='amount' :hover='hover')
  testimonials
  collapse-faq
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import ContactTeamModal from '~/components/account/ContactTeamModal.vue'
import Testimonials from '~/components/static/Testimonials.vue'
import CollapseFaq from '~/components/ui/CollapseFaq.vue'
import Counter from '~/components/ui/Counter.vue'

export default {
  name: 'page-pricing',

  head () {
    return {
      title: 'Pricing | Vue Mastery',
      script: [{
        innerHTML: 'var chargebeeTrackFunc=function(fprom) {var tid = fprom.data.tid;var chargebeeInstance;try{chargebeeInstance = Chargebee.getInstance();}catch(err){}; if(tid && chargebeeInstance){var cart = chargebeeInstance.getCart();cart.setCustomer({cf_tid:tid});} else if (tid){ document.addEventListener("DOMContentLoaded",function(){chargebeeTrackFunc(fprom)}); }}; if(window.$FPROM){chargebeeTrackFunc($FPROM);}else{_fprom=window.fprom||[]; window._fprom=_fprom;_fprom.push(["_init",chargebeeTrackFunc]);}',
        type: 'text/javascript',
        charset: 'utf-8'
      }],
      __dangerouslyDisableSanitizers: ['script']
    }
  },

  middleware: 'anonymous',

  components: {
    ContactTeamModal,
    Testimonials,
    CollapseFaq,
    Counter
  },

  data () {
    return {
      chargebeeInstance: null,
      chargbeeLink: '',
      team: false,
      amount: 205278,
      baseAmount: 205278,
      hover: false
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
    updateParticipation (num) {
      if (num) {
        this.amount += num * 25 / 100
        this.hover = true
      } else {
        this.amount = this.baseAmount
        this.hover = false
      }
    },
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
          let lastName = ''
          let firstName = ''
          if (this.account.displayName) {
            lastName = this.account.displayName.split(' ')[1] || this.account.displayName
            firstName = this.account.displayName.split(' ')[0] || ' '
          }
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
          switch (plan) {
            case 'monthly-subscription':
              redirect = '/thank-you-monthly'
              if (this.$trackMonthly) this.$trackMonthly()
              break

            case '3-month-subscription':
              redirect = '/thank-you-summer'
              if (this.$track3Months) this.$track3Months()
              break

            case 'annual-subscription':
              redirect = '/thank-you-annual'
              if (this.$trackAnnual) this.$trackAnnual()
              break
            default:
              break
          }
          this.$store.dispatch('account/fakeSubscribe')
          this.$router.push(redirect)
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
build-grid-area(monthly annually team)
.container
  background #fff

.pricing-cards
  display grid
  margin-bottom $vertical-space
  grid-row-gap 20px
  grid-template-columns 1fr
  align-items center
  grid-template-areas 'annually'\
                      'monthly'\
                      'free-sub'

  +tablet-up()
    grid-template-columns 1fr 1fr
    grid-column-gap 20px
    grid-template-areas 'annually annually'\
                        'monthly free-sub'

  @media screen and (min-width: 60em)
    grid-template-columns 1fr 1fr 1fr
    grid-column-gap auto
    grid-template-areas 'monthly annually free-sub'

.page-title
  margin 1rem auto 3rem auto
  max-width 84vw
  font-size 20px
  
  +tablet-up()
    font-size 28px
    width 33rem
    margin 3rem auto
    color $secondary-color
    font-weight bold

.card
  color $secondary-color
  cursor pointer
  transition transform .2s ease-in
  &:hover
    text-decoration none
    transform: scale(1.03)

  .card-body
    display flex
    flex-direction column

  h3
    padding-top 0

  .button
    margin-bottom 0

  &.side-card
    margin auto
    width 100%

    @media screen and (min-width: 60em)
      max-width 330px

    .money
      margin-bottom: -1.8rem
      margin-top: .9rem

.benefit
  display flex
  align-items flex-start
  margin-bottom 10px
  margin-top 10px
  text-align left

  i
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

  span
    color #fff

.decimal
  color $secondary-color
  font-weight 700
  font-size 100px
  line-height 1

.fa-unlock
  margin-left 3px
  margin-top -6px

.first-benefit
  margin-top 25px




.pricing-structure
  margin-top 7rem
  align-items center

.annually
  padding-bottom 1rem
  position relative

  .text-center
    margin-top 1rem
    margin-bottom 1rem

  .total-price
    font-size 24px
    text-align center;
    margin 0rem auto -1.5rem auto

  .normal-price
    text-decoration line-through
    padding-right 5px
    color $gray-light

  .discount-price
    font-weight 600

  .billed-yearly
    display block
    text-transform uppercase
    color $primary-color
    font-size 10px
    line-height 16px
    font-weight bold

.benefits-list
  display flex
  flex-direction column
  justify-content center
  text-align center
  position relative
  padding 2rem 0
  margin 0 auto

.benefit
  font-size 16px
  line-height 16px

  &:before,
  &:after
    content ''
    background #082a4e
    width 10px
    height 1px
    position absolute
    left 0
    top 50%
    opacity 0

  &:after
    right 0
    left auto

.pricing-structure
  margin-top 7rem
  align-items center

.permonth
  position absolute
  bottom 1rem
  margin-left 3.5rem
  left 50%
  font-weight bold
  color $primary-color

.money
  position relative

i.fa-check
  font-size 16px
  color $primary-color

.team-wrapper
  display flex
  min-height 38.6rem
  justify-content center
  align-items center
  padding-bottom 5rem
  transition transform .2s ease-in
  flex-direction column

  +tablet-up()
    flex-direction row

  .card:hover
    transform scale(1)

  &:hover
    transform scale(1.03)

.team-card
  width 26rem
  max-width 92vw

  +tablet-up()
    max-width 43vw

.pourcent-off
  display flex
  flex-direction column
  justify-content flex-end
  font-size 24px
  font-weight bold
  padding-bottom 0.6rem
  padding-left 0.5rem
  line-height 1.9rem

.pourcent
  font-size 2.5rem
  font-weight bold

.off
  color $primary-color

.team-description
  flex-direction column
  width 23rem
  position relative
  padding 0 2rem 2rem 2rem
  border-radius 0 0 12px 12px
  max-width 80vw
  
  +tablet-up()
    width 43rem
    border-radius 0 12px 12px 0
    padding 0 1rem 2rem 2rem
    max-width 38vw

  +desktop-up()
    padding 0 3rem 2rem 4rem

  &:before
    content ''
    position absolute
    top -1rem
    left 0
    width 100%
    height 2rem
    background linear-gradient(180deg, #fff 40%, #f3f3f3 58%, #fff 100%)

    +tablet-up()
      content ''
      position absolute
      left -1rem
      top 0
      width 3rem
      height 100%
      background linear-gradient(90deg, #FFFFFF 25%, #f3f3f3 39%, #FFFFFF 90%)

  .benefits-list
    margin 0
    padding-bottom 0

.swipe-back-enter-active, .swipe-back-leave-active,
.swipe-enter-active, .swipe-leave-active
  transition opacity .3s, transform .3s

.swipe-back-enter,
.swipe-enter
  opacity 0
  transform translateX(-20px)

.swipe-back-leave-to,
.swipe-leave-to
  opacity 0
  transform translateX(20px)

.swipe-back-enter
  transform translateX(20px)
.swipe-back-leave-to
  transform translateX(-20px)
</style>
