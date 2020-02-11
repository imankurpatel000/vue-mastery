<template lang="pug">
.banner
  nuxt-link(to='/conferences')
    h2.title Learn from the Experts.
    p.lead Binge our exclusive collection of global Vue Conference talks.
</template>

<script>
export default {
  name: 'learn-from-experts'
}
</script>

<style lang="stylus" scoped>
.banner
  background radial-gradient(216.07% 73.11% at 79.7% 6.54%, #65FFC7 0%, #40D6BB 14.99%, #008EA7 38.39%, #0087A0 41.48%, #00516A 68.64%, #003049 88.96%, #00233C 100%)
  background-attachment fixed
  position relative
  z-index 1
  overflow hidden
  padding-top 20vh

  &:before,
  &:after
    content: ''
    width 100%
    height 100%
    position absolute
    z-index 2
    top 0

  &:before
    background-image url(/images/community/background.svg)
    background-size 100% auto
    background-position center
    background-attachment fixed
    

  &:after
    background radial-gradient(62.98% 54.91% at 78.4% 7.19%, #FFFFF6 0%, rgba(246, 255, 244, 0.9803) 1.97%, rgba(206, 255, 237, 0.876) 12.4%, rgba(171, 255, 231, 0.7651) 23.49%, rgba(143, 255, 226, 0.648) 35.2%, rgba(121, 255, 222, 0.5228) 47.72%, rgba(106, 255, 219, 0.3857) 61.43%, rgba(97, 255, 218, 0.2276) 77.24%, rgba(94, 255, 217, 0) 100%)
    background-attachment fixed
    height 71vw

a
  text-align center
  position relative
  display flex
  flex-direction column
  background-image url(/images/community/foreground.svg)
  background-repeat no-repeat
  background-position 50% 80%
  background-size auto 50%
  height 100vh
  padding-top 8vh
  text-decoration none
  color #fff
  z-index 3

.lead
  margin-top 0

</style>
