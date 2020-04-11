<template lang="pug">
.faq-wrapper
  h2.title Frequently Ask Questions
  .wrapper
    dl
      div(v-for='q, index in qa' :key='index')
        dt(@click='openTab(index)' :class='{active: q.active === true}')
          p(v-html='q.question')
          .close
        dd(:class='{active: q.active === true}')
          p(v-html='q.answer')

</template>

<script>
export default {
  name: 'CollapseFaq',
  data () {
    return {
      qa: [{
        question: 'I live in a country where the USD is very expensive. Do you offer purchasing power parity discounts?',
        answer: 'We understand that prices in the United States can weigh heavier in other places around the world. If you are coming from somewhere where the exchange rates with USD are too high, then shoot us an email at team@vuemastery.com and we\'ll provide assistance.',
        active: true
      }, {
        question: 'Do you offer student discounts?',
        answer: 'Yes. If you are a student, please send over an email and include your student email to team@vuemastery.com so we can verify it.',
        active: false
      }, {
        question: 'Can your courses prepare me for a career as a Vue developer?',
        answer: 'It\'s possible! We\'ve heard from subscribers who\'ve used our content to learn what they\'ve needed to get hired as a developer using Vue.',
        active: false
      }, {
        question: 'Are the lessons available to watch offline?',
        answer: 'They are! If you have a subscription, you can download all of the videos.',
        active: false
      }, {
        question: 'How do I cancel my subscription?',
        answer: 'In your account settings, you can cancel before your next billing date. If you are cancelling within the first 14 days of your subscription, reach out to us at team@vuemastery.com so you can get a refund. ',
        active: false
      }, {
        question: 'Can I pause my subscription?',
        answer: 'Yes, we have a pausing option. Just reach out to team@vuemastery.com and let us know the dates you\'d like your subscription paused and we\'ll set that up for you.',
        active: false
      }, {
        question: 'Can I change plans at any time?',
        answer: 'You can upgrade from a monthly subscription to an annual subscription! Email us at team@vuemastery.com to get your upgrade. Your most recent monthly payment will be used toward your annual payment. ',
        active: false
      }, {
        question: 'I subscribed! Where do I start first?',
        answer: 'On our courses page, you\'ll find different learning paths such as "beginner", "intermediate" and "advanced" which can guide you depending on your level of experience with Vue. You can also use the "latest" path to watch the most recently released lessons.',
        active: false
      }],
      previous: 0
    }
  },

  methods: {
    openTab (index) {
      this.qa[this.previous].active = false
      this.previous = index
      this.qa[index].active = !this.qa[index].active
    }
  }
}
</script>

<style lang="stylus" scoped>
.faq-wrapper
  background linear-gradient(0deg, #B5FFDA 3.85%, #8CE5CE 13.14%, #23A4B1 33.95%, #008EA7 40.76%, #0087A0 43.73%, #00516A 69.85%, #003049 89.38%, #00233C 100%)
  background-attachment scroll
  position relative

.title
  color #fff
  text-align center
  padding 5rem 0rem 0rem 0rem

.wrapper
  position relative
  overflow hidden
  background-size cover
  background-attachment fixed
  background-position center
  -webkit-overflow-scrolling touch
  color #fff
  max-width initial
  min-height 46rem

  +tablet-up()
    min-height 60rem

  &::before,
  &::after
    content ''
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    background-size cover
    background-position bottom
    background-repeat no-repeat
    z-index 1

  &::before
    transform translateZ(-1px) scale(1.5)
    bottom -1px // Remove bottom artfacts
    left -4px // Remove bottom artfacts
    background-image url(/images/stay-sharp/middle.svg)
    background-size 100% auto
    background-position center bottom 15px

  &::after
    background-image url(/images/faq/foreground.svg)
    background-size 100% auto

  +mobile-only()
    &::before,
    &::after
      background-size 800px auto

.close
  position relative
  -webkit-tap-highlight-color transparent
  cursor pointer
  height 40px

  &::before,
  &::after
    content ''
    position absolute
    top 19px
    left 14px
    width 16px
    height 2px
    background-color #fff
    transform-origin 50%
    transition all 0.2s ease-out

  &::after
    transform rotate(90deg)

dl
  max-width 50rem
  margin 3rem auto 8rem auto
  z-index 2
  overflow hidden
  border-radius 12px

  +tablet-up()
    position absolute
    width calc(100% - 2rem)
    left 50%
    transform translateX(-50%)
    margin-top 4rem

    p
      font-size 18px
      line-height 24px
      color #fff

dt
  position relative
  display flex
  justify-content space-between
  align-items center
  padding 0rem 3rem 0rem 1.5rem
  margin-top 1px
  background #01233c
  cursor pointer

  p
    font-weight bold

  &.active
    background $primary-color
    background linear-gradient(to top right, #41b782, #86d169)
    &:hover
      cursor initial
    .close::before,
    .close::after
      transform rotate(180deg)

  &:hover:not(.active)
    background: $primary-color
    background linear-gradient(to top right, #41b782, #86d169)

    .close::before
      transform rotate(-90deg)
    .close::after
      transform rotate(-0deg)

dd
  overflow hidden
  max-height 0
  background rgba(1,35,60,0.45)
  transition max-height 0.1s cubic-bezier(0.22, 0.61, 0.36, 1)
  margin 0
  padding 0 1rem

  +tablet-up()
    font-size 16px
    line-height 21px

    p
      margin 1.5rem 2rem 2rem .5rem

  &.active
    max-height 20rem
    transition max-height 1s ease-out
</style>
