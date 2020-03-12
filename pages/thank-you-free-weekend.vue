<template lang="pug">
.container
  .wrapper
    div(v-if='ready')
      free-weekend-badges(:animate='true')

      .content
        .title
          transition-group(name="thankyou" appear)
            h1.headline(key="headline") Thank You
            p.copy(key="copy") You now have access to Vue Mastery Free Weekend.

        transition(name="thankyou" appear)
          .card
            .card-body
              h4
                i.fa.fa-lock-open &nbsp;
                | All Courses are Unlocked 
              p You have until March 15th at 11:59 PM EST (23:59) to watch as many of our premium courses as you want. 

              p
                nuxt-link.button.primary(to='/courses') View Courses

              h4
                i.fa.fa-share-square &nbsp;
                | Don't Let your Friends Miss Out
              p Have any friends that'd appreciate free learning?  Share #[a(:href="link") this link] or hit a share button below to make sure they don't miss out.
                social-sharing(inline-template 
                    :url='link'
                    :title="description"
                    :description="description"
                    :quote="description"
                    twitter-user='vuemastery')
                  .social-wrapper
                    network.button.primary.border.-has-icon(network='twitter')
                      i.fab.fa-twitter
                      span Twitter
                    network.button.primary.border.-has-icon(network='facebook')
                      i.fab.fa-facebook
                      span Facebook
                    network.button.primary.border.-has-icon(network='linkedin')
                      i.fab.fa-linkedin
                      span LinkedIn
                    network.button.primary.border.-has-icon(network='reddit')
                      i.fab.fa-reddit
                      span Reddit
</template>

<script>
import { mapState } from 'vuex'
import FreeWeekendBadges from '~/components/static/FreeWeekendBadges'

export default {
  name: 'page-thank-you-free-weekend',

  components: {
    FreeWeekendBadges
  },

  head () {
    return {
      title: 'Thank you | Vue Mastery'
    }
  },

  middleware: 'anonymous',

  data () {
    return {
      ready: false,
      show: false,
      card: false,
      link: 'https://www.vuemastery.com/free-weekend',
      description: 'I\'m sharpening my Vue skills on Vue Mastery\'s free weekend.  Don\'t miss out on these free Vue.js courses.'
    }
  },

  computed: {
    ...mapState({
      account: result => result.account.account
    })
  },

  mounted () {
    setTimeout(() => {
      this.ready = true
      if (this.account && !this.account.enrolledFreeWeekend) {
        // This is to ensure people that are just login are subscribed
        this.$store.dispatch('account/userEnrollFreeWeekend')
      }
    }, 500)
  }
}
</script>

<style lang="stylus" scoped>
.container
  position relative
  overflow hidden
  padding-top 100px
  background-image url(/images/free-weekend/background.svg)
  padding $vertical-space*1.5 0
  min-height 100vh

  +desktop-up()
    min-height 1350px
    padding $vertical-space*2 0

.button
  margin-bottom 0

.social-wrapper
  max-width: 500px

  >>> .button
    margin 15px 21px 0px 0
    min-width 162px

.content
  position relative
  top 0
  bottom 0
  z-index 1
  width 100%
  margin 0 auto

  +desktop-up()
    width 50%
    z-index 0
    margin-right 0

.headline
  color #FFFFFF
  font-size 60px
  +tablet-up()
    font-size 80px

.copy
  color #FFFFFF
  margin-bottom 40px

.card
  box-shadow none
  transform-origin top center

  +desktop-up()
    transform-origin center left

.card-body
  padding 22px 40px
  h4
    color $secondary-color
  i
    color $primary-color

  +tablet-up()
    p
      padding-left 28px

.thankyou-enter-active
  &.headline
    transition opacity .3s ease-out .7s, transform .5s ease-out .7s

  &.copy
    transition opacity .3s ease-out .9s, transform .5s ease-out .7s

  &.start
    transition opacity .4s ease-out 1.1s, transform .4s ease-out 1.1s

  &.card
    transition opacity .5s ease-in-out 1.1s, transform .5s ease-in-out 1.1s

.thankyou-enter, .thankyou-leave-to
  transform translateX(200px)
  opacity 0

</style>

