<template lang='pug'>
  .banner
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
.banner
  background-image url(/images/cheatsheets/background.svg)
  background-size cover
  background-position bottom center
  margin-bottom -168px
  position relative
  height 924px
  z-index 2

.body
  text-align center
  max-width 400px
  color #fff
  position relative
  left 55%
  padding-top 100px

</style>
