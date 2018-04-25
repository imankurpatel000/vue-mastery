<template lang="pug">
//- .container(v-if='account')
.container
  .cloud-cover
  .wrapper
    div(v-if='ready')
      .title
        transition-group(name="thankyou" @after-enter="showCard")
          h1.headline(v-if='show' key="headline") Thank You
          p.copy(v-if='show' key="copy") You now have access to all of our paid content.
          nuxt-link.start.button.primary(to='/courses' v-if='show' key="start") START LEARNING

      transition-group(name="nature" @after-enter="showContent" appear)
        img.sm-range(src="/images/img-sm-mountain.svg" key="sm-range")
        img.bk-cloud(src="/images/img-cloud-back.svg" key="bk-cloud")
        img.md-range(src="/images/img-md-mountain.svg" key="md-range")
        img.mid-cloud(src="/images/img-cloud-middle.svg" key="mid-cloud")
        img.lg-range(src="/images/img-lg-mountain.svg" key="lg-range")
        img.fr-cloud(src="/images/img-cloud-front.svg" key="fr-cloud")

      transition(name="thankyou")
        .card(v-if="card")
          .card-body
            p We will be sending ${{monthlyPayment}} of your monthly payment to the Vue.js project.
            router-link(to='https://github.com/vuejs/roadmap' target='_blank') VUE. JS ROADMAP
            p Your subscription will automatically renew on {{renewal}}
            p If you ever want to modify, suspend, or cancel your subscription, just head over to your profile page by clicking the image in the top right of your screen, and hitting the button that looks like:
            router-link(to='/account/my-subscription') MY SUBSCRIPTION
            p
              | If you have any feedback for us, need some support, or want to request any content, we’d love to hear from you. You can use the&nbsp;
              nuxt-link(to='/contact') contact
              |  us form or just email&nbsp;
              a(href='mailto:team@vuemastery.com' target='_blank') team@vuemastery.com
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'thank-you',

  middleware: 'anonymous',

  props: {
    monthlyPayment: {
      type: String,
      required: true
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

  computed: {
    ...mapState({
      account: result => result.account.account
    })
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
  position absolute
  top -500px
  width 100%
  height 100%
  background-size cover
  background-position center top
  background-repeat no-repeat
  background-image url(/images/bkg-cloud-top.svg)

.wrapper
  position relative
  height 800px

img[class*="range"]
img[class*="cloud"]
  position absolute

.lg-range
  width 1147px
  height 672px
  bottom 0
  right -265px

.md-range
  width 865px
  height 487px
  bottom 0
  right 275px

.sm-range
  width 653px
  height 440px
  bottom 0
  right 643px

.bk-cloud
  width 550px
  height 56px
  top 50%
  right 600px

.mid-cloud
  width 747px
  height 76px
  top 60%
  right 450px

.fr-cloud
  width 2861px
  height 503px
  right -626px
  bottom 70px

.title
  margin-top $vertical-space*1.5
  position relative
  top 0
  bottom 0
  padding-left 5%
  width 45%

.headline
  position absolute
  top 0
  color #FFFFFF
  font-size 85px

.copy
  position absolute
  top 130px

.start
  position absolute
  top 180px

.card
  position absolute
  left 50%
  top 0
  width 40%
  margin-top $vertical-space
  transform-origin center left
  box-shadow none

.nature-enter-active
  transition opacity .3s ease-in

  &.sm-range
    transition transform 1s ease-in-out

  &.md-range
    transition transform 1.3s ease-in-out

  &.lg-range
    transition transform 1.5s ease-in-out

  &.bk-cloud
    transition transform 2.8s ease-in-out

  &.mid-cloud
    transition transform 2.5s ease-in-out

  &.fr-cloud
    transition transform 2s ease-in-out

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
