<template lang='pug'>
section.bg-wrapper(v-once)
  .body
    h2.title Choose your learning path
    p.lead Our paths guide you along your journey, whether you’re beginner, intermediate, or advanced.
    .actions
      nuxt-link.button.modern.border.-small.-plain(to='/courses-path/beginner') Start learning
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

  +desktop-up()
    height 720px

  &:before
    background-image url(/images/level-up/middle.svg)
    background-size 100% auto
    background-position center bottom
    bottom -43px

  &:after
    background-image url(/images/level-up/foreground.svg)
    background-size 100% auto

  
  +mobile-only()
    &:before,
    &:after
      background-size 800px auto

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

  @media screen and (min-width: 50em)
    width 375px
    max-width 50%
    top 60px
    right 50%

  +desktop-up()
    top 16%
    padding-right 50px

.title
  margin-bottom 0
  font-size 2rem

  +desktop-up()
    font-size 2.5rem

.lead
  font-size: 1rem
  line-height: 1.3rem
</style>
