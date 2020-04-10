<template lang='pug'>
.container(:class='{"show-announcement": showAnnouncement, "open-nav": $store.state.openNav}')
  .main(ref='main')
    Announcement(v-if='showAnnouncement' v-cloak)
    .relative(:class='{"no-sticky-footer": noStickyFooter}')
      PageHeader(:class='{"no-header-background": noHeaderBackground}')
      PageSearch(:class='[noHeaderBackground ? "no-header-background" : "", $route.name]')
      nuxt.page
    PageFooter(:class='[$route.name,noStickyFooter ? "no-sticky-footer" : "",]')

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
      ready: false,
      main: {}
    }
  },

  mounted () {
    setTimeout(() => {
      this.ready = true
    }, 2000)
  },

  watch: {
    $route () {
      setTimeout(() => {
        this.$refs.main.scroll({
          top: 0,
          behavior: 'auto'
        })
      }, 0)
    }
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
      return [
        'index',
        'courses',
        'courses-path',
        'thank-you-free-weekend',
        'free-weekend',
        'free-week',
        'thank-you-free-week'
      ].indexOf(this.$route.name) >= 0
    },
    noStickyFooter () {
      return [
        'index',
        'thank-you-free-weekend',
        'free-weekend',
        'free-week',
        'thank-you-free-week'
      ].indexOf(this.$route.name) >= 0
    }
  }
}
</script>

<style lang="stylus">
#__layout
  overflow hidden
  background-color #082a4e;
  background url(/images/footer.svg)
  background-position center top -32px
  z-index -3
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
  min-height calc(100% - 32.25rem)

.main
  position relative
  z-index 2
  transition padding-top ease-out .3s
  height 100vh
  overflow-x hidden
  overflow-y auto
  perspective 2px
</style>