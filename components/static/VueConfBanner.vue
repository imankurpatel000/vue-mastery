<template lang="pug">
  .banner
    //- nuxt-link.button.secondary(to="/vueconf") View Talks
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables'
.banner
  position relative
  height 354px
  margin-bottom ($vertical-space/3)
  background-image url(/images/bkg-vueconf.svg)
  background-position center bottom
  background-size 140%
  +tablet-up()
    background-size 100%
  +laptop-up()
    height 654px
    background-size auto 100%

.vue-conf-page .banner
  margin-top -100px

.button
  position absolute
  left 50%
  bottom ($vertical-space/3)
  transform translateX(-50%)

  height $button-height-small
  padding 0 15px
  line-height $button-height-small

</style>
