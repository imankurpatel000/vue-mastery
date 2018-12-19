<template lang='pug'>
  transition(name="push" mode='out-in' appear)
    section.announcement-bar(v-if="ready" v-cloak)
      nuxt-link(to='/pricing/gifts') Need a gift for a coder?  View our discounted gift plans.
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
  flex-direction row-reverse
  align-items center
  padding 0 10px
  justify-content center
  text-align left
  font-size 18px
  color #fff
  min-height $vertical-space
  background: $secondary-color

  a
    color #fff

  +tablet-up()
    flex-direction row
    text-align center
    font-size 22px

.anounce-icon
  display flex
  align-items center
  width 70px
  margin 0 18px

  +tablet-up()
    width 50px


.push-enter-active
  transition margin-top ease-in .5s

.push-leave-active
  transition margin-top ease-out .5s

.push-enter, .push-leave-to
  margin-top: -90px

</style>

