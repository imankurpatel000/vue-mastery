<template lang="pug">
.banner
  h2.title Learn from the Experts.
  p.lead Binge our exclusive collection of global Vue Conference talks.

  .actions
    nuxt-link.button.inverted(to='/conferences') Explore conferences
</template>

<script>
export default {
  name: 'learn-from-experts'
}
</script>

<style lang="stylus" scoped>
.banner
  position relative
  z-index 2
  overflow hidden
  padding-top 150px
  text-align center
  position relative
  height 800px
  display flex
  flex-direction column
  background-image url(/images/learn-from-experts/foreground.svg)
  background-repeat no-repeat
  background-position 50% 80%
  background-size auto 50%
  text-decoration none
  color #fff
  z-index 3

  +tablet-up()
    height 1200px
    padding-top 250px
    background-size auto 580px


.lead
  margin-top 0

</style>
