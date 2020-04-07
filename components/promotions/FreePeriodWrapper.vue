<template lang='pug'>
  .banner
    .wrapper
      free-period-badges
      .body
        slot
</template>

<script>

import FreePeriodBadges from '~/components/promotions/FreePeriodBadges'

export default {
  name: 'cheat-sheet-main',

  components: {
    FreePeriodBadges
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
  font-weight bold
  max-width 410px
  margin 2rem auto

  +laptop-up()
    max-width 690px
    font-size 24px

.normal
  font-size 14px
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
