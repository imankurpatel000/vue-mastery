
<template lang='pug'>
section.bg-wrapper(v-once)
  .hero
    h1.title The ultimate learning resource for Vue developers
    p.lead Weekly Vue.js tutorials to guide your journey to Mastery.

  .actions
    nuxt-link.button.inverted(to='/courses') Explore courses
</template>

<script>
export default {
  name: 'hero'
}
</script>

<style lang='stylus' scoped>
section.bg-wrapper
  position relative
  height 92vh
  min-height 600px
  background-image url(/images/hero/background.svg)
  background-position calc(50% - 8px) center
  +mobile-only()
    background-position 35% center

    &::before
    &::after
      background-position 10% bottom

  &::before
    background-image url(/images/hero/middle.svg)

  &::after
    background-image url(/images/hero/foreground.svg)

  @media (orientation: portrait)
    min-height 600px

.title
  max-width: 300px
  padding-top 0
  margin 0 auto
  font-size 24px
  font-weight 600

  +tablet-up()
    max-width 400px
    font-size 29px

  +laptop-up()
    max-width 550px
    font-size 40px

.hero
  position absolute
  z-index 2
  top 20%
  width 100%
  height 100%
  padding 0 15px
  color white
  text-align center

  +tablet-up()
    top 20%

  @media screen and (orientation: landscape) and (max-width: 40em)
    top 90px

.lead
  font-size 16px
  font-weight 400

.actions
  position absolute
  z-index 6
  width 100%
  left 0
  bottom 37%
  text-align center

  +laptop-up()
    bottom 37%
</style>