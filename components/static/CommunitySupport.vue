<template lang='pug'>
section.bg-wrapper(v-once)
  .body
    h2.title Support the community
    p.lead We give 25% of our revenue to the Vue.js framework, so learning with us means supporting the growth and the substainability of your technology.

    .actions
      nuxt-link.button.inverted(to='/pricing') Learn more
</template>

<script>
export default {
  name: 'level-up'
}
</script>


<style lang='stylus' scoped>
section.bg-wrapper
  background: linear-gradient(360deg, #B5FFDA 11.34%, #8CE5CE 20.89%, #23A4B1 42.29%, #008EA7 49.28%, #006C85 58.91%, #004C65 69.86%, #00354E 80.47%, #002841 90.49%, #00233C 99.31%)
  background-attachment scroll
  height 520px
  margin-top -2px
  z-index 3
  display flex
  justify-content center

  &:before
    background-image url(/images/community/background.svg)
    background-size 100% auto
    background-position center bottom 15px

  &:after
    background-image url(/images/community/foreground.svg)
    background-size 100% auto


  +mobile-only()
    &:before,
    &:after
      background-size 800px auto

  +desktop-up()
    height 720px

.body
  position absolute
  text-align center
  display flex
  flex-direction column
  align-items center
  color #fff
  z-index 3
  width 100%
  max-width 500px
  padding 0 30px
  top 0

.title
  margin-bottom 0
  font-size 2rem

  +desktop-up()
    font-size 2.5rem

.lead
  font-size: 1rem
  line-height: 1.3rem
</style>
