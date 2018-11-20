<template lang='pug'>
  transition(name="push" mode='out-in' appear)
    section.announcement-bar(v-if="ready && !account || (account && !account.subscribed)" v-cloak)
      p #[b() 35% Off] a year with Vue Mastery. Use code: #[b() BLACKFRIDAY] at checkout.
      .anounce-icon
        img(src='/images/ico-vue-master-yay.png')
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

<style lang="stylus" scoped>
.announcement-bar
  display flex
  align-items center
  justify-content center
  text-align center
  font-size 22px
  color #fff
  height $vertical-space
  background: $secondary-color

.anounce-icon
  width 42px
  height 42px
  margin 0 18px


.push-enter-active
  transition margin-top ease-in .5s

.push-leave-active
  transition margin-top ease-out .5s

.push-enter, .push-leave-to
  margin-top: -90px

</style>

