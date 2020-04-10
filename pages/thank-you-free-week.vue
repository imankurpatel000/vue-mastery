<template lang="pug">
thank-you-wrapper(
  :link='link',
  description='I\'ll be sharpening my Vue skills during Vue Mastery\'s free week.  Don\'t miss out on these free Vue.js courses.'
  copy='You now have access to Vue Mastery Free Week.'
)
  h4
    i.fa.fa-lock-open &nbsp;
    | All Courses are Unlocked
  p You have until April 19th at 11:59 PM EST (23:59) to watch as many of our premium courses as you want.

  p
    nuxt-link.button.primary(to='/courses') View Courses


  h4
    i.fa.fa-share-square &nbsp;
    | Don't Let your Friends Miss Out
  p Have any friends that'd appreciate free learning?  Share #[a(:href="link") this link] or hit a share button below to make sure they don't miss out.
</template>

<script>
import ThankYouWrapper from '~/components/promotions/ThankYouWrapper'

export default {
  name: 'page-thank-you-free-week',

  components: {
    ThankYouWrapper
  },

  data () {
    return {
      link: 'https://www.vuemastery.com/free-week'
    }
  },

  head () {
    return {
      title: 'Thank you | Vue Mastery'
    }
  },

  middleware: 'anonymous'
}
</script>

<style lang="stylus" scoped>
.card-body
  padding 22px 40px
  h4
    color $secondary-color
  i
    color $primary-color

  +tablet-up()
    p
      padding-left 28px
</style>

