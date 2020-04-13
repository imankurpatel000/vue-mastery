
<template lang='pug'>
section.bg-wrapper(
  @mousemove='calculDistance'
  @mouseleave='distance = 1000'
)
  .bg
  .hero
    h1.title The ultimate learning resource for Vue developers
    p.lead Weekly Vue.js tutorials to guide your journey to Mastery.

  .actions
    nuxt-link.button.modern.border.-small.-plain(
      ref='link'
      to='/courses'
      :style='bgPosition') Explore courses
</template>

<script>
export default {
  name: 'hero',

  data () {
    return {
      distance: 1000
    }
  },

  methods: {
    calculDistance (e) {
      if (this.$refs.link) {
        const { offsetWidth, offsetHeight } = this.$refs.link.$el
        const { left, top } = this.$refs.link.$el.getBoundingClientRect()
        this.distance = Math.floor(Math.sqrt(Math.pow(e.pageX - (left + (offsetWidth / 2)), 2) + Math.pow(e.pageY - (top + (offsetHeight / 2)), 2)))
      }
    }
  },

  computed: {
    bgPosition () {
      const color = `rgb(2, ${Math.max(142, 300 - this.distance / 2)}, 187)`
      return { 'border-left-color': color, 'border-right-color': color }
    }
  }
}
</script>

<style lang='stylus' scoped>
.bg
  position absolute
  width 100%
  height 100%
  min-height 600px
  background-image url(/images/hero/background0.jpg)
  background-position 35% center
  background-size cover
  background-attachment fixed

  +tablet-up()
    background-position 15% center

  +desktop-up()
    background-position calc(50% - 8px) center

section.bg-wrapper
  position relative
  height 92vh
  

  &::before
  &::after
    background-position 10% bottom

  &::before
      background-image url(/images/hero/middle.svg)

    &::after
      background-image url(/images/hero/foreground.svg)

  +tablet-up()
    &::before
    &::after
      background-position 5% bottom

  +desktop-up()
    &::before
      background-position center bottom

    &::after
      background-position center bottom

  @media (orientation: portrait)
    min-height 600px

.title
  max-width: 300px
  padding-top 0
  margin 0 auto

  +tablet-up()
    max-width 500px
    font-size 2.5rem

  +laptop-up()
    max-width 550px
    font-size 40px

  +desktop-up()
    font-size: 6vh
    max-width: 75vh

.hero
  position absolute
  z-index 2
  top 15%
  width 100%
  height 100%
  padding 0 15px
  color white
  text-align center

  +desktop-up()
    top 17%

  @media screen and (orientation: landscape) and (max-width: 40em)
    top 90px

.lead
  font-size 16px
  font-weight 400

  +laptop-up()
    font-size: 2.5vh

.actions
  position absolute
  z-index 3
  width 100%
  left 0
  bottom 9%
  text-align center

  +tablet-up()
    bottom 37%

  +tablet-up()
    bottom 30%
</style>