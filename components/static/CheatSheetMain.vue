<template lang='pug'>
section.bg-wrapper.align-top
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
.bg-wrapper
  position relative
  overflow hidden
  background-size cover
  background-attachment fixed
  background-position center
  -webkit-overflow-scrolling touch

  &::before,
  &::after
    content ''
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    background-size cover
    background-position center bottom
    background-repeat no-repeat
    z-index 1

  &::before
    /* Move the pseudo-element back away from the camera,
    * then scale it back up to fill the viewport.
    * Because the pseudo-element is further away, it appears to move more slowly, like in real life. */
    transform translateZ(-1px) scale(1.5)
    bottom -1px // Remove bottom artfacts
    left -4px // Remove bottom artfacts

section.bg-wrapper
  margin-bottom -186px
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

  &:not(.index)
    margin-bottom -140px
    +desktop-up()
      margin-bottom 0
      height 510px

    &:before
      height: 100%

    &:after
      background-position: top

    +desktop-up()
      .body
        top 120px

      .buttons
        top 180px
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
    top 15%
    left 50%
    height auto


.lead,
.title
  max-width 320px
  +tablet-up()
    max-width 366px

.title
  margin-bottom 0
  font-size 2rem

  +desktop-up()
    font-size 2.5rem
</style>
