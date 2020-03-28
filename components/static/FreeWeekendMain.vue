<template lang='pug'>
  .banner
    .wrapper
      free-weekend-badges
      .body
        h2.title Free Weekend is Now Over
        p.lead
          | However, our #[nuxt-link(to='/courses/intro-to-vue-js/vue-instance') Intro to Vue course] is free, and many of our courses start with free lessons.

        p
          nuxt-link.button.primary(to='/courses') View Courses
</template>

<script>
import FreeEnrollButton from '~/components/static/FreeEnrollButton'
import FreeWeekendBadges from '~/components/static/FreeWeekendBadges'

export default {
  name: 'cheat-sheet-main',

  components: {
    FreeEnrollButton,
    FreeWeekendBadges
  }
}
</script>


<style lang='stylus' scoped>
.wrapper
  padding-top 320px
  position relative

  +desktop-up()
    padding-top $vertical-space

.banner
  background-image url(/images/free-weekend/background.svg)
  overflow hidden
  padding-top 100px

.body
  padding-bottom 1em
  padding-bottom $vertical-space
  text-align center
  position: relative;

  +laptop-up()
    width 50%
    margin-left auto

.title
  margin 0
  padding-top 0
  color #fff

  +tablet-up()
    font-size 56px

.lead
  font-size 16px
  color #fff
  font-weight: bold

  +laptop-up()
    max-width 690px
    font-size 24px

.normal
  font-size 16px
  color #fff
  font-weight normal

  +laptop-up()
    max-width 690px
    font-size 24px

.button
  justify-self center
  text-transform uppercase

.date
  color #fff

</style>
