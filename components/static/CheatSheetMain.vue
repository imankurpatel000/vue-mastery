<template lang='pug'>
section.bg-wrapper
  .body
    h2.title Download the cheatsheets
    p.lead Our Vue essentials, Vue 3, and Nuxt.Js cheat sheets save you time and energy by giving you essential syntax at your fingertips.

  CheatSheets(button-class='inverted' location='Front-page cheat sheet download')
</template>

<script>
import CheatSheets from '~/components/static/CheatSheets'

export default {
  name: 'cheat-sheet-main',

  components: {
    CheatSheets
  }
}
</script>


<style lang='stylus' scoped>
section.bg-wrapper
  margin-bottom -168px
  margin-top -2px
  height 924px
  z-index: 3

  &:after,
  &:before
    background-image url(/images/cheatsheets/background.svg)

  &:before
    background: linear-gradient(360deg, #B5FFDA -3.63%, #8CE5CE 6.41%, #23A4B1 28.9%, #008EA7 36.25%, #0087A0 39.46%, #00516A 67.67%, #003049 88.78%, #00233C 100.25%) fixed;
    transform none
    height: 70%

.body
  position absolute
  text-align center
  display flex
  flex-direction column
  align-items center
  color #fff
  z-index 3
  width 100%
  height: 740px
  padding 0 30px
  top 26px
  justify-content space-between

  +desktop-up()
    width 700px
    max-width 50%
    top 100px
    left 50%
    height auto


.lead,
.title
  max-width 320px
  +tablet-up()
    max-width 400px
</style>
