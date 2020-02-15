<template lang='pug'>
section.bg-wrapper
  .body
    h2.title Want Vue Pro Tips?
    p.lead Get pro tipsand occasional special offers in your inbox
</template>

<script>
export default {
  name: 'pro-tips'
}
</script>


<style lang='stylus' scoped>
section.bg-wrapper
  height 500px
  z-index: 3
  margin-bottom: 1vw

  &:before
    background-image url(/images/pro-tips/background.svg)
    background-size 100% auto
    bottom -64px

  &:after
    background url(/images/pro-tips/ship.svg)
    background-size 652px auto 
    background-position 15% bottom
    background-repeat no-repeat

.body
  position absolute
  text-align center
  display flex
  flex-direction column
  align-items center
  color #fff
  z-index 3
  width 100%
  top 20px

  +desktop-up()
    width 700px
    max-width 50%
    top 200px
    left 50%


.lead,
.title
  max-width 400px
</style>
