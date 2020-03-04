<template lang='pug'>
  .container(:class="$store.state.openNav ? 'open-nav': ''")
    Announcement
    .main
      HeroImage(:class='$route.name' :isIndex='$route.name === "index"')
      PageHeader(:class='{"no-header-background": noHeaderBackground}')
      PageSearch(:class='$route.name')
      nuxt
      PageFooter
      AuthForm

</template>

<script>
import Announcement from '~/components/static/Announcement.vue'
import PageHeader from '~/components/header/Header.vue'
import PageFooter from '~/components/footer/Footer.vue'
import AuthForm from '~/components/account/AccountModal.vue'
import HeroImage from '~/components/static/HeroImage'
import PageSearch from '~/components/search/Search'

export default {
  name: 'default-layout',

  components: {
    Announcement,
    HeroImage,
    PageHeader,
    PageSearch,
    PageFooter,
    AuthForm
  },

  computed: {
    noHeaderBackground () {
      return ['index', 'courses', 'courses-path', 'thank-you-free-weekend', 'free-weekend'].indexOf(this.$route.name) >= 0
    }
  }
}
</script>

<style lang="stylus" scoped>
.main
  position: relative
</style>