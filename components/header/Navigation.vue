<template lang='pug'>
  nav.navbar(role='navigation' aria-label='main navigation' @click="$emit('toggleNav')")
    .navbar-main
      transition(name="linkin" mode='out-in' appear)
        router-link.navbar-item.underline(to="/account/dashboard" v-if="account") Dashboard
      router-link.navbar-item.underline(to="/courses") Courses
      router-link.navbar-item.underline(to="/pricing" v-if="!account || (account && !account.subscribed)" v-cloak) Pricing
      router-link.navbar-item.underline(to="/conferences") Conference Videos
      router-link.navbar-item.underline(to="/live-training") Live Training

    no-ssr
      transition(:name="account ? 'signin' : 'signout'" mode='out-in' appear)
        .navbar-secondary(v-if='account' v-cloak key='islogged')
          button.button.primary.-small.appear(type='button' @click='signOut') Sign Out

          nuxt-link.navbar-profile.appear(to='/account/profile')
            img(:src='account.image' :alt='account.displayName')

        .navbar-secondary.notlogged(v-else-if='ready' v-cloak key='notlogged')
          button.button.inverted.-small(type='button' @click='openSignUp') Sign Up
          button.button.primary.-small(type='button' @click='openLogin') Login
</template>

<script>
export default {
  name: 'header-navigation',

  props: {
    account: {
      type: Object,
      required: false
    }
  },

  data () {
    return {
      ready: false
    }
  },

  model: {
    event: 'toggleNav'
  },

  mounted () {
    setTimeout(() => {
      this.ready = true
    }, 2000)
  },

  methods: {
    signOut () {
      this.$store
        .dispatch('userLogout')
        .then(() => {
          this.$router.push('/')
        })
        .catch(error => {
          console.log(error)
        })
    },

    openLogin () {
      this.$modal.show('login-form', { newAccount: false })
    },

    openSignUp () {
      this.$modal.show('login-form', {
        newAccount: true,
        location: 'Top-right navigation'
      })
    }
  }
}
</script>

<style lang='stylus' scoped>

.navbar
  position: fixed
  height: 100%
  display: flex
  flex-wrap: wrap
  align-items: center
  justify-content: center
  flex: 1
  left: 0
  width: 100%
  flex-direction: column
  background-color: #fff
  opacity: 0
  transition: opacity .2s ease-in
  pointer-events: none
  top: 0

  *
    pointer-events none

  +laptop-up()
    top: 0
    background-color: transparent
    pointer-events: none
    opacity: 1
    justify-content: space-between
    position: relative
    height: $header-height
    flex-direction: row
    flex-wrap: initial

    *
      pointer-events initial

.navbar-item
  color: $secondary-color
  font-family: $font-family-base
  font-size: 20px
  text-decoration: none
  white-space: nowrap
  opacity: 0

  &.nuxt-link-active
    font-weight: 700

  &:last-child
    margin-right: 0

  +laptop-up()
    opacity: 1
    margin-right: 25px

.button
  opacity: 0
  font-size: 20px

  + button
    margin: 0

  +laptop-up()
    font-size: 18px
    opacity: 1

.navbar-main, .navbar-secondary
  display: flex
  flex-direction: column
  text-align: center
  justify-content: space-evenly
  align-items: center
  pointer-events: none

  +laptop-down()
    a, button
      margin-bottom 40px

    .inverted
      height: auto
      line-height: 24px

  +laptop-up()
    flex-direction: row
    height: $header-height
    pointer-events: initial

    .button
      margin-left: 18px

.navbar-profile
  display: flex
  border-radius: 50%
  overflow: hidden
  box-shadow: 0 1px 0 0 #E4E4E4
  background-color: #fff
  width: 40px
  height: 40px

  +laptop-up()
    margin-left: 18px

  img
    width: 100%

.signin-enter-active
  transition opacity ease-in .5s

  .appear
    transition transform ease-out .5s

  .navbar-profile
    transition opacity .3s .2s

.signin-leave-active
  transition opacity ease-out .3s

.signin-enter, .signin-leave-to
  opacity: 0

.signin-enter
  .appear
    transform translateX(58px)

  .navbar-profile
    opacity: 0

.linkin-enter-active
  transition margin-right ease-out .5s, opacity ease-out .3s .5s

.linkin-leave-active
  transition margin-right ease-out .5s .2s, opacity ease-out .3s

.linkin-enter, .linkin-leave-to
  margin-right: -91px
  opacity: 0

.signout-enter-active, .signout-leave-active
  transition opacity ease-in .3s

.signout-enter, .signout-leave-to
  opacity: 0
</style>

<style lang='stylus'>
.open-nav
  max-height: 100vh
  overflow: hidden

  .navbar *
    pointer-events: initial

  +laptop-up()
    max-height 100%

  .navbar
    opacity: 1

  .button,
  .navbar-item
    opacity: 1
    transition-duration: .4s
    for i in (1..2)
      &:nth-child({i})
        transition-delay: (i*100)ms

  .button
    for i in (1..2)
      &:nth-child({i})
        transition-delay: (i*100 + 200)ms
</style>
