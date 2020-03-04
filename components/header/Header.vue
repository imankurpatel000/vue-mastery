<template lang="pug">
header.header
  .wrapper(@click='toggleNav(true)' role="banner")
    nuxt-link.logo(to="/")
      span.visually-hidden Vue mastery
      .vue-mastery-logo

      img.vuemastery-logo(src='/images/vuemastery.svg')
      img.vuemastery-logo-white(src='/images/vuemastery-white.svg')

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

<style lang="stylus" scoped>
.header
  background-color #fff
  position relative
  width 100%
  top 0
  z-index 4
  display flex
  justify-content center

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
    width 100%

  +laptop-up()
    transform: none
    max-width 240px
    min-width 200px
    margin: -10px 90px 0 0

.index
  .wrapper
    position: absolute
    width: 100%

.vuemastery-logo
  display block

.vuemastery-logo-white
  display none

.no-header-background
  position: absolute;
  width: 100%;
  background transparent

  +laptop-up()
    ::v-deep .navbar-item
      color: #fff

  .hamburger:before, .hamburger:after
    background-color: #fff

  .vuemastery-logo
    display none

  .vuemastery-logo-white
    display block
</style>

<style lang="stylus">
.open-nav
  .logo
    transform: translateX(-50%)
    margin-left: 50%

  .no-header-background
    .vuemastery-logo
      display block

    .vuemastery-logo-white
      display none

  .hamburger:before, .hamburger:after
    background-color: #222 !important
</style>
