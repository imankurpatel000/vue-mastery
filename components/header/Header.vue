<template lang="pug">
  header.header
    .wrapper(@click='toggleNav(true)')
      nuxt-link.logo(to="/")
        span.visually-hidden Vue mastery
        img(src="/images/lgo-vuemastery.svg" role="logo" alt="Vue Mastery logo")

      Navigation(:account='account' @closeNav='toggleNav(true)')
    Hambuger(@toggleNav='toggleNav()')
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Navigation from './Navigation'
import Hambuger from './Hamburger'

export default {
  name: 'page-header',
  components: {
    Navigation,
    Hambuger
  },
  computed: {
    ...mapState({
      account: result => result.account.account
    })
  },
  methods: {
    ...mapActions(['toggleNav'])
  }
}
</script>

<style lang="stylus">
.open-nav
  .logo
    transform: translateX(-50%)
    margin-left: 50%
</style>

<style lang="stylus" scoped>
.header
  position relative
  top 0
  z-index 2
  .wrapper
    height $header-height
    display flex
    flex-wrap wrap
    align-items center

.logo
  display block
  max-width 200px
  margin-top -5px
  position: relative
  z-index: 1
  transition: all ease-in .2s

  img
    display block
    width 100%

  +laptop-up()
    transform: none
    max-width 282px
    min-width 200px
    margin: -10px 70px 0 0
</style>
