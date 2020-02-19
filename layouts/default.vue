<template lang='pug'>
.container(:class='{"show-announcement": showAnnouncement, "open-nav": $store.state.openNav}')
  Announcement(v-if='showAnnouncement' v-cloak)
  .main
    PageHeader(:class='$route.name')
    PageSearch(:class='$route.name')
    nuxt
    PageFooter

  AuthForm

</template>

<script>
import { mapState } from 'vuex'
import Announcement from '~/components/static/Announcement.vue'
import PageHeader from '~/components/header/Header.vue'
import PageFooter from '~/components/footer/Footer.vue'
import AuthForm from '~/components/account/AccountModal.vue'
import PageSearch from '~/components/search/Search'

export default {
  name: 'default-layout',

  components: {
    Announcement,
    PageHeader,
    PageSearch,
    PageFooter,
    AuthForm
  },

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
    }),
    showAnnouncement () {
      return (this.ready && !this.account) || (this.account && !this.account.subscribed)
    }
  }
}
</script>

<style lang="stylus">
#__layout
  overflow hidden
  background-color: #0a0018;
  background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230e4b8a' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")
  z-index: -3;
</style>

<style lang="stylus" scoped>
.container
  max-width 1600px
  margin 0 auto
  background-color #fff
  position relative

  &::before
    content ''
    position absolute
    z-index -1
    top 0
    bottom 0
    height 100%
    width: 2500px
    left: -450px
    background: radial-gradient(#0a1121 0%, #0a11210d 100%) 50%

.main
  position relative
  z-index 2
  transition padding-top ease-out .3s
  height 100vh
  overflow-x hidden
  overflow-y auto
  perspective: 2px

.show-announcement
  .main
    padding-top: 90px
</style>