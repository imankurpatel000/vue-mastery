<template lang='pug'>
  .banner
    .wrapper
      free-weekend-badges
      .body
        h2.title Free Weekend is Now Live
        p.lead
          | You can watch all our Vue.js courses free.
          br
          span.normal Just click the button below.
        
        p.lead.date
          | Friday through Sunday
          br
          | March 13 at 12 PM ET until March 15, 11:59 PM ET

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
  min-height calc(100vh - 616px)

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
