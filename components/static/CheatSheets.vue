<template lang='pug'>
client-only
  .cheatsheets-carousel-wrapper
    .cheatsheets-carousel(
      :class='active'
      @click='openLogin'
    )
      a.cheatsheets-item.cheatsheets-essential(
        href='/pdf/Vue-Essentials-Cheat-Sheet.pdf'
        download
      )

      a.cheatsheets-item.cheatsheets-nuxt(
        href='/pdf/Nuxtjs-Cheat-Sheet.pdf'
        download
      )

      a.cheatsheets-item.cheatsheets-vue-3(
        href='/pdf/Vue-3-Cheat-Sheet.pdf'
        download
      )
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'download-button',

  data () {
    return {
      active: String
    }
  },

  props: {
    location: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapState({
      account: result => result.account.account
    })
  },

  methods: {
    openLogin () {
      if (this.account) {
        this.$modal.show('login-form', {
          newAccount: true,
          headerTitle: 'Please sign up to download free',
          redirect: '/download',
          location: this.location
        })
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
.cheatsheets-carousel-wrapper
  position absolute
  width 100%
  left 0
  top 170px
  border-bottom 20px solid #021c35
  height 355px

.cheatsheets-carousel
  width 375px
  height 337px
  position absolute
  z-index 2
  right 50%
  background-image url(/images/cheatsheets/light.svg)
  background-size 100% auto
  background-position 7px bottom
  background-repeat no-repeat
  transform translateX(50%)
    
  +desktop-up()
    transform translateX(0)

.cheatsheets-item
  display block
  background #fff
  width 140px
  height 240px
  position absolute

.cheatsheets-essential
  left: 0
  opacity .8
  transform scale(.8)
.cheatsheets-nuxt
  left: 50%
  transform translateX(-50%)
.cheatsheets-vue-3
  right 0
  opacity .8
  transform scale(.8) 

</style>
