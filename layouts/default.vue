<template lang='pug'>
.container(:class='{"show-announcement": showAnnouncement, "open-nav": $store.state.openNav}')
  .main
    Announcement(v-if='showAnnouncement' v-cloak)
    .relative
      PageHeader(:class='{"no-header-background": noHeaderBackground}')
      PageSearch(:class='[noHeaderBackground ? "no-header-background" : "", $route.name]')
      nuxt.page
    PageFooter(:class='$route.name')

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
      // FREE WEEKEND
      // return this.ready && !this.account
      return (this.ready && !this.account) || (this.account && !this.account.subscribed)
    },
    noHeaderBackground () {
      return ['index', 'courses', 'courses-path', 'thank-you-free-weekend', 'free-weekend'].indexOf(this.$route.name) >= 0
    }
  }
}
</script>

<style lang="stylus">
#__layout
  overflow hidden
  background-color: #082a4e;
  background: url(/images/footer.svg);
  background-position: center top -32px;
  // background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230e4b8a' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")
  z-index: -3;
</style>

<style lang="stylus" scoped>
.container
  max-width 1600px
  margin 0 auto
  background-color #fff
  position relative

.relative
  position relative
  z-index 1
  background #fff
  min-height calc(100vh - 516px)

.main
  position relative
  z-index 2
  transition padding-top ease-out .3s
  height 100vh
  overflow-x hidden
  overflow-y auto
  perspective: 2px
</style>