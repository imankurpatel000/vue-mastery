<template lang='pug'>
  transition(name="push" mode='out-in' appear)
    section.announcement-bar(v-if="ready && !account || (account && !account.subscribed)" v-cloak)
      p #[b() 25% Off] a year with Vue Mastery. Use code: #[b() HOLIDAY25] at checkout.
      .anounce-icon
        img(src='/images/ico-vue-mastery-holiday.png')
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

