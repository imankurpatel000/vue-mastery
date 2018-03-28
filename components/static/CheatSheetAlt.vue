<template lang='pug'>
  .banner
    .wrapper
      .body
        h2.title Grab our free 2-page cheat sheet!
        DownloadButton(button-class='primary' :location='location')
</template>

<script>
import DownloadButton from '~/components/static/DownloadButton'

export default {
  name: 'cheat-sheet-alt',

  props: {
    location: String,
    required: true
  },

  components: {
    DownloadButton
  }
}
</script>

<style lang='stylus' scoped>
@import '~assets/css/_variables'

.wrapper
  grid-template-rows $vertical-space 1fr $vertical-space
  align-items center
  justify-content center
  text-align center

.banner
  background-image url(/images/bkg-cheatsheet-alt.jpg)

  +desktop-up()
    background-repeat repeat-x
    background-size: contain;

  .body
    grid-row-start 2

  .title
    color #fff
    padding-top 0
    +tablet-up()
      font-size 56px

  .button
    justify-self center
    text-transform uppercase
</style>
