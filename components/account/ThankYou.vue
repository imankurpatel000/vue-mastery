<template lang="pug">
.container
  .cloud-cover
  .wrapper
    div(v-if='ready')
      transition-group(name="nature" @after-enter="showContent" appear)
        img.sm-range(src="/images/img-sm-mountain.svg" key="sm-range")
        img.bk-cloud(src="/images/img-cloud-back.svg" key="bk-cloud")
        img.md-range(src="/images/img-md-mountain.svg" key="md-range")
        img.mid-cloud(src="/images/img-cloud-middle.svg" key="mid-cloud")
        img.lg-range(src="/images/img-lg-mountain.svg" key="lg-range")
        img.fr-cloud(src="/images/img-cloud-front.svg" key="fr-cloud")

      .title
        transition-group(name="thankyou" @after-enter="showCard")
          h1.headline(v-if='show' key="headline") Thank You
          p.copy(v-if='show' key="copy") You now have access to all of our content.
          nuxt-link.start.button.primary(to='/courses' v-if='show' key="start") START LEARNING

      transition(name="thankyou")
        .card(v-if="card")
          .card-body
            h4
              i.fa.fa-piggy-bank &nbsp;
              | You are supporting Open Source!
            p
              | We will be sending ${{monthlyPayment}} of your {{paySchedule}} payment to support the Vue.js project. If you’re wondering what they’re working on next, see&nbsp;
              a(href='https://github.com/vuejs/roadmap' target='_blank') their Roadmap.

            h4
              i.fa.fa-book &nbsp;
              | Our Content
            p
              | We’ll be releasing content weekly.  See our most recent lessons and what's upcoming on the&nbsp; 
              nuxt-link(to='/courses') courses page
              | . Your support also helps us produce the weekly&nbsp;
              a(href='https://news.vuejs.org/' target='_blank') Vue News Podcast
              | , where we cover the latest news and tutorials.

            h4
              i.fa.fa-dollar-sign &nbsp;
              | Your Subscription
            p Your subscription will automatically renew on {{renewal}}
            p If you ever want to modify or cancel your subscription, just head over to your dashboard and click the “My Subscription” button you’ll find there.

            h4
              i.far.fa-thumbs-up &nbsp;
              | Your Feedback
            p
              | If you have any feedback for us, need some support, or want to request any content, we’d love to hear from you. You can use the&nbsp;
              nuxt-link(to='/contact') contact
              |  us form or just email&nbsp;
              a(href='mailto:team@vuemastery.com' target='_blank') team@vuemastery.com
</template>

<script>
export default {
  name: 'thank-you',

  middleware: 'anonymous',

  props: {
    monthlyPayment: {
      type: String,
      required: true
    },
    paySchedule: {
      type: String,
      require: true
    },
    renewal: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      ready: false,
      show: false,
      card: false
    }
  },

  mounted () {
    setTimeout(() => {
      this.ready = true
    }, 500)
  },

  methods: {
    showContent () {
      this.show = true
    },
    showCard () {
      this.card = true
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables'

.container
  position relative
  overflow hidden
  margin-top -100px
  padding-top 100px
  background linear-gradient(to bottom right, #90C3D3, #EDFFED)

.cloud-cover
  display none

  +laptop-up()
    display block
    position absolute
    top -590px
    width 100%
    height 100%
    background-size cover
    background-position center top
    background-repeat no-repeat
    background-image url(/images/bkg-cloud-top.svg)

.wrapper
  position relative
  height 950px

  +desktop-up()
    height 890px

.button
  margin-bottom 0

img[class*="range"]
img[class*="cloud"]
  position absolute

.lg-range
  width 1147px
  height 672px
  bottom 0
  right 50%
  transform translateX(50%)
  +laptop-up()
    right -265px
    transform none

.md-range
  display none
  +laptop-up()
    display block
    width 865px
    height 487px
    bottom 0
    right 275px

.sm-range
  display none
  +laptop-up()
    display block
    width 653px
    height 440px
    right 643px
    bottom 0

.bk-cloud
  display none
  +laptop-up()
    display block
    width 550px
    height 56px
    right 600px
    top 50%

.mid-cloud
  display none
  +laptop-up()
    display block
    width 747px
    height 76px
    right 450px
    top 60%

.fr-cloud
  width 2861px
  height 503px
  right -626px
  bottom 70px

.title
  position relative
  top 0
  bottom 0
  z-index 10
  width 100%

  +laptop-up()
    margin-top $vertical-space*1.5
    padding-left 5%
    width 45%
    z-index 0

.headline
  position absolute
  top 0
  color #FFFFFF
  font-size 60px
  +tablet-up()
    font-size 80px

.copy
  position absolute
  top 90px
  +tablet-up()
    top 120px

.start
  position absolute
  top 140px
  +tablet-up()
    top 170px

.card
  position absolute
  box-shadow none
  width 90%
  top 240px
  transform-origin top center

  +tablet-up()
    top 280px

  +laptop-up()
    top 0
    width 45%
    left 50%
    margin-top $vertical-space
    transform-origin center left

  +desktop-up()
    width 42%

.card-body
  padding 22px 40px
  h4
    color $secondary-color
  i
    color $primary-color

  +tablet-up()
    p
      padding-left 28px

.nature-enter-active
  transition opacity .3s ease-in

  &.lg-range
    transition transform 1.5s ease-in-out

  &.fr-cloud
    transition transform 2s ease-in-out

  +laptop-up()
    &.sm-range
      transition transform 1s ease-in-out

    &.md-range
      transition transform 1.3s ease-in-out

    &.bk-cloud
      transition transform 2.8s ease-in-out

    &.mid-cloud
      transition transform 2.5s ease-in-out

.nature-enter, .nature-leave-to
  opacity 0
  transform translateX(100%)

  &.fr-cloud
    transform translateX(25%)

.thankyou-enter-active
  &.headline
    transition transform 0.7s ease-out

  &.copy
    transition transform 0.9s ease-out

  &.start
    transition transform 1.1s ease-out

  &.card
    transition transform .5s ease-in-out

.thankyou-enter, .thankyou-leave-to
  transform translateY(800px)

  &.card
    transform scale(0)

</style>
