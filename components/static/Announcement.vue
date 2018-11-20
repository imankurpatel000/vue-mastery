<template lang='pug'>
  section.announcement-bar(v-if="!account || (account && !account.subscribed)")
    p #[b() 35% Off] a year with Vue Mastery. Use code: #[b() BLACKFRIDAY] at checkout.
    .anounce-icon
      img(src='/images/ico-vue-master-yay.png')
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'announcement-bar',
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

</style>

