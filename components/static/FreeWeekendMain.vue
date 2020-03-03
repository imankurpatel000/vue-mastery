<template lang='pug'>
  .banner
    .wrapper
      free-weekend-badges
      .body
        h2.title Enroll in Free Weekend
        p.lead
          | Reserve your spot to get access to all Vue.js courses free.
          br
          span.normal We will email you when the courses are unlocked.
        
        p.lead.date
          | Friday through Sunday
          br
          | Mar 13 at 12 PM ET until Mar 15, 11:59 PM ET

        FreeEnrollButton(button-class='tertiary' location='Free Weekend')
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
