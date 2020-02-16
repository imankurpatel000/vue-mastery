<template lang='pug'>
section.bg-wrapper(v-once)
  .body
    h2.title Stay sharp
    p.lead New topics every week so you can sharpen your skills and deepen your understanding of Vue.js and its ecosystem of tools.
</template>

<script>
export default {
  name: 'level-up'
}
</script>


<style lang='stylus' scoped>
section.bg-wrapper
  background linear-gradient(0deg, #B5FFDA 3.85%, #8CE5CE 13.14%, #23A4B1 33.95%, #008EA7 40.76%, #0087A0 43.73%, #00516A 69.85%, #003049 89.38%, #00233C 100%)
  background-attachment scroll
  height 520px
  margin-top -2px
  z-index 3
  display flex
  justify-content center

  &:before
    background-image url(/images/stay-sharp/middle.svg)
    background-size auto 100%
    background-position center bottom 15px

  &:after
    background-image url(/images/stay-sharp/foreground.svg)
    background-size 100% auto

  +mobile-only()
    &:before,
    &:after
      background-size 200% auto

.body
  position absolute
  text-align center
  display flex
  flex-direction column
  align-items center
  color #fff
  z-index 3
  width 100%
  max-width 430px
  padding 0 30px
  top 60px

  +desktop-up()
    width 310px
    max-width 50%
    padding-left 83px
    top 35px
    left 50%

.title
  margin-bottom 0
  font-size 1.8rem

.lead
  font-size: 1rem
  line-height: 1.3rem
</style>
