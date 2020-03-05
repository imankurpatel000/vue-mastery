<template lang='pug'>
client-only
  .cheatsheets-carousel-wrapper(:class='shift')
    .cheatsheets-carousel
      a.cheatsheets-item.cheatsheets-essential(
        ref='cheatsheet2'
        :href='account ? "/pdf/Vue-Essentials-Cheat-Sheet.pdf": "#createAccount"'
        @click='checkAccount(0, $event)'
        download
      )

      a.cheatsheets-item.cheatsheets-nuxt(
        ref='cheatsheet0'
        :href='account ? "/pdf/Nuxtjs-Cheat-Sheet.pdf": "#createAccount"'
        @click='checkAccount(1, $event)'
        download
      )

      a.cheatsheets-item.cheatsheets-vue-3(
        ref='cheatsheet1'
        :href='account ? "/pdf/Vue-3-Cheat-Sheet.pdf": "#createAccount"'
        @click='checkAccount(2, $event)'
        download
      )

      button.prev(@click='prev')
      button.next(@click='next')

    .buttons
      button.prev(@click='prev')
        i.fa.fa-chevron-left
      button.button.inverted(@click='download') Download
      button.next(@click='next')
        i.fa.fa-chevron-right
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'download-button',

  data () {
    return {
      slide: 0
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
    }),
    shift () {
      return 'shift-' + Math.abs(this.slide % 3)
    }
  },

  methods: {
    openLogin () {
      this.$modal.show('login-form', {
        newAccount: true,
        headerTitle: 'Please sign up to download free',
        location: this.location
      })
    },
    checkAccount (num, e) {
      if (!this.account) {
        e.preventDefault()
        this.openLogin()
      }
    },
    download () {
      this.$refs[`cheatsheet${this.slide}`].click()
    },
    prev () {
      this.slide >= 2 ? this.slide = 0 : this.slide++
    },
    next () {
      this.slide ? this.slide-- : this.slide = 2
    }
  }
}
</script>

<style lang='stylus' scoped>
.cheatsheets-carousel-wrapper
  position absolute
  width 100%
  left 0
  top 167px
  border-bottom 20px solid #021c35
  height 355px
  z-index 4

.cheatsheets-carousel
  cursor pointer
  width 375px
  height 337px
  position absolute
  right 50%
  background-image url(/images/cheatsheets/light.svg)
  background-size 100% auto
  background-position 12px bottom
  background-repeat no-repeat
  transform translateX(50%)
  perspective 1000px
    
  +desktop-up()
    transform translateX(0)

  .next,
  .prev
    position absolute
    height 240px
    width 120px

  .prev
    left -18px

  .next
    right -18px

.next,
.prev
  background none
  border none
  cursor pointer

i
  font-size 28px
  color #fff

.buttons
  display flex
  justify-content: space-evenly
  width 300px
  margin 0 auto 0 auto
  bottom -110px
  position absolute
  left 50%
  transform translateX(-50%)

  +desktop-up()
    transform translateX(0%)
    max-width 50%
    width 700px
    justify-content center
    top 60%
    bottom auto

    .next,
    .prev
      padding 0 20px

.cheatsheets-item
  background-image url(/images/cheatsheets/cheatsheets.png)
  display block
  background-size auto 100%
  width 192px
  height 260px
  position absolute
  transition all cubic-bezier(0, 0, 0.2, 1) 0.2s
  border 10px solid #fff
  box-shadow 0 1px 10px 0 rgba(0,0,0,.5)

.cheatsheets-essential
  left: 0
  opacity .8
  transform scale(.8) translateX(-25%)
  background-position 0% center

.cheatsheets-nuxt
  left: 50%
  transform translateX(-50%)
  background-position 50% center

.cheatsheets-vue-3
  left 100%
  opacity .8
  transform scale(.8) translateX(-100%)
  background-position 100% center
  z-index -1

.shift-1
  .cheatsheets-essential
    left 100%
    opacity .8
    z-index -1
    transform scale(.8) translateX(-100%)

  .cheatsheets-nuxt
    left: 0
    opacity .8
    z-index -1
    transform scale(.8) translateX(-25%)
  .cheatsheets-vue-3
    left: 50%
    opacity 1
    z-index 2
    transform translateX(-50%)

.shift-2
  .cheatsheets-essential
    left: 50%
    opacity 1
    z-index 2
    transform translateX(-50%)
    
  .cheatsheets-nuxt
    left 100%
    opacity .8
    z-index -1
    transform scale(.8) translateX(-100%)

  .cheatsheets-vue-3
    left: 0
    opacity .8
    z-index -1
    transform scale(.8) translateX(-25%)

</style>
