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

<style lang="stylus" scoped>
.main
  position: relative
  transition padding-top ease-out .3s
  height 100vh
  overflow-x: hidden
  overflow-y: auto
  perspective: 2px

.show-announcement
  .main
    padding-top: 90px
</style>