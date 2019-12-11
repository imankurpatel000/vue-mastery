<template lang='pug'>
  transition(name="push" mode='out-in' appear)
    nuxt-link(to='/pricing' class="announcement-bar" v-if="ready && !account || (account && !account.subscribed)" v-cloak)
      p Get 20% off a year of Vue Mastery, with new Vue 3 content. Use #[b() VUE3ACCESS] at checkout.
      .anounce-icon
        img(src='https://storage.googleapis.com/vue-mastery.appspot.com/flamelink%2Fmedia%2F1569440526519_11.png?GoogleAccessId=firebase-adminsdk-otdiq%40vue-mastery.iam.gserviceaccount.com&Expires=16725243600&Signature=18e4j%2Bal59Ew8Tz0qv526uCtDk08Us0RUk9sKvPKS9Xa7fvvKHB%2BW%2BraFTYtDUeUP%2FIvaeOhfP%2F6%2BOkouSW1G%2BLL4fI7QxeDy6FFoW%2B7w3cNE8dIm7tQwKxk2h6j%2BwdGN16xoFAjHKs0DLAfVfqtsEil3LixxREXGnKgH7kpLwJIWwFFEFPrxvxgl69wCsuzcOmojEv7gsptGdoCQFbwH8rc19z5mXakq9TkyxjKJQv5yOeAC5%2Bp3JdloK5pUz1pcQEZAgIMvH4BFjBYIwg1EFbnCSbUmWWVCBQyySzxhf6E5u0qODLoe1KczHiU9cozYUWl0kHtY9ov69hkhL0PSA%3D%3D')
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'announcement-bar',

  data () {
    return {
      ready: false
    }
  },

  mounted () {
    setTimeout(() => {
      this.ready = true
    }, 2000)
  },

  computed: {
    ...mapState({
      account: result => result.account.account
    })
  }
}
</script>


<style lang="stylus">
.open-nav
  .announcement-bar
    +laptop-down()
      position absolute
      opacity 0
</style>

<style lang="stylus" scoped>
.announcement-bar
  display flex
  flex-direction row-reverse
  align-items center
  padding 0 10px
  justify-content center
  text-align left
  font-size 18px
  color #fff
  min-height $vertical-space
  background: $secondary-color

  +tablet-up()
    flex-direction row
    text-align center
    font-size 22px

.anounce-icon
  display flex
  align-items center
  width 80px
  margin 0 10px

  +tablet-up()
    width 70px
    margin 0 18px


.push-enter-active
  transition margin-top ease-in .5s

.push-leave-active
  transition margin-top ease-out .5s

.push-enter, .push-leave-to
  margin-top: -90px

</style>

