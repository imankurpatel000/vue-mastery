<template lang='pug'>
  .banner
    .canvas
      img.lgo-vue(src='/images/lgo-vue.svg')
      h2.title Learn from the experts. <br/> Watch the VueConf US talks.
      p.lead The first ever VueConf US took place in New Orleans on March 26-28, 2018.
      .stand
    img.vue-img-right(src='/images/img-vueconf-right.svg')
    img.vue-img-left(src='/images/img-vueconf-left.svg')
</template>

<script>
export default {
  name: 'vue-conf-hero'
}
</script>

<style lang='stylus' scoped>
@import '~assets/css/_variables'

.banner
  display flex
  justify-content: center
  position relative
  margin-bottom ($vertical-space/3)
  border-bottom: solid 4px $primary-color
  background-image url(/images/bkg-outline-mountains.svg)
  background-position center bottom
  background-size contain

  +laptop-up()
    height 654px
    background-size cover

.title
  font-weight 600
  margin-bottom 0
  padding 0


.lead,
.lead-2
  margin 0
  padding 0
  font-size 1.2em
  font-weight 400

+tablet-up()
  .lead
    font-size 20px
  .lead-2
    font-size 26px



.canvas
  display flex
  flex-flow column
  justify-content center
  align-items center
  position relative
  background #FFF
  color $secondary-color
  padding 40px
  margin 100px 0 160px 0
  width 90%
  max-width 600px
  height auto
  text-align center
  border solid 1px $secondary-color
  border-bottom-left-radius: 12px
  border-bottom-right-radius: 12px

  &::after
    content ''
    height 12px
    background $secondary-color
    position absolute
    top -6px
    left -1%
    width 102%
    border-radius 2px

.lgo-vue
  max-width 100px

.stand
  position absolute
  width 1px
  bottom -160px
  left 50%
  transform translateX(-1px)
  height 160px
  background $secondary-color
  &::before,
  &::after
    content ''
    position absolute
    top -4px
    width 1px
    height 30px
    background $secondary-color
  &::before
    transform rotate(45deg)
    left 10px
  &::after
    transform rotate(-45deg)
    right 10px

.vue-img-left
  position absolute
  width 422px
  bottom 0
  left 25%
  transform scale(0.8) translateX(-85%)
  transition: transform 0.5s linear

  +tablet-up()
    transform scale(0.9) translateX(-65%)
    bottom 10px

  +laptop-up()
    transform scale(1) translateX(-50%)

.vue-img-right
  position absolute
  width 422px
  bottom 0
  right 25%
  transform scale(0.8) translateX(85%)
  transition: transform 0.5s linear

  +tablet-up()
    transform scale(0.9) translateX(65%)
    bottom 10px
  +laptop-up()
    transform scale(1) translateX(50%)

.button
  margin-bottom 0

.vue-conf-page
  .button
    display none

  .banner
    padding-top 100px
    margin-top -100px

  .canvas
    margin-top 50px
    margin-bottom 120px

  .stand
    height 120px
    bottom -120px

</style>
