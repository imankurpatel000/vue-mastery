<template lang='pug'>
section.bg-wrapper(v-once)
  .body
    h2.title Level-up your knowledge - fast
    p.lead Our course break down concept visually, giving you the knowledge you need to start coding immediatly
</template>

<script>
export default {
  name: 'level-up'
}
</script>


<style lang='stylus' scoped>
section.bg-wrapper
  background linear-gradient(0deg, #9FFFC7 21.49%, #76E1BF 30.01%, #0D96AA 49.1%, #008CA7 51.48%, #02627B 63.63%, #052E45 80.31%, #070D24 92.81%, #080117 99.6%)
  background-attachment scroll
  height 580px
  margin-top -2px
  display flex
  justify-content center
  z-index 3

  &:before
    background-image url(/images/level-up/middle.svg)
    background-size 100% auto
    background-position center bottom 15px

  &:after
    background-image url(/images/level-up/foreground.svg)
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
  max-width 400px
  padding 0 30px
  top 100px

  +desktop-up()
    width 310px
    max-width 50%
    padding-right 50px
    top 120px
    right 50%

.title
  margin-bottom 0
  font-size 1.8rem
  max-width 212px

.lead
  font-size: 1rem
  line-height: 1.3rem
</style>
