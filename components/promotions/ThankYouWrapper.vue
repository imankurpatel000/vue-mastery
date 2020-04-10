<template lang="pug">
.container
  .wrapper
    div(v-if='ready')
      free-period-badges(:animate='true')

      .content
        .title
          transition-group(name="thankyou" appear)
            h1.headline(key="headline") Thank You
            p.copy(key="copy") {{copy}}

        transition(name="thankyou" appear)
          .card
            .card-body
              slot
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

              //- NOT FREE PERIOD
              //- h4
              //-   i.fa.fa-play-circle &nbsp;	
              //-   | Get a Head Start on Learning	

              //- p Our #[nuxt-link(to='/courses/intro-to-vue-js/vue-instance') Intro to Vue.js course] is completely free, as are many of the first lessons of each course.  Take a look at the #[nuxt-link(to='/courses') courses page], and consider watching all our free content.
              //- p
              //-   nuxt-link.button.primary(to='/courses') View Courses
</template>

<script>
import { mapState } from 'vuex'
import FreePeriodBadges from '~/components/promotions/FreePeriodBadges'

export default {
  name: 'thank-you-wrapper',

  components: {
    FreePeriodBadges
  },

  props: {
    copy: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      ready: false
    }
  },

  computed: {
    ...mapState({
      account: result => result.account.account
    })
  },

  mounted () {
    if (this.account && !this.account.enrolledFreePeriod) {
      // This is to ensure people that are just login are subscribed
      this.$store.dispatch('account/userEnrollFreePeriod')
    }
    setTimeout(() => {
      this.ready = true
    }, 500)
  }
}
</script>

<style lang="stylus" scoped>
.container
  position relative
  overflow hidden
  padding-top 100px
  background-image url(/images/free-period/background.svg)
  padding $vertical-space*1.5 0
  min-height 100vh

  +desktop-up()
    min-height 1350px
    padding $vertical-space*2 0

.button
  margin-bottom 0

.social-wrapper
  max-width: 500px
  padding-left: 1.5rem;
  padding-bottom: 1rem;

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
  margin-bottom 3rem
  margin-top -1rem

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

