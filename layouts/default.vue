<template lang='pug'>
  .container(:class="$store.state.openNav ? 'open-nav': ''")
    Announcement
    .main
      HeroImage(:class='$route.name' :isIndex='$route.name === "index"')
      PageHeader(:class='$route.name')
      nuxt
      PageFooter
      AuthForm

</template>

<script>
// import Announcement from '~/components/static/Announcement.vue'
import PageHeader from '~/components/header/Header.vue'
import PageFooter from '~/components/footer/Footer.vue'
import AuthForm from '~/components/account/Accountmodal.vue'
import HeroImage from '~/components/static/HeroImage'

export default {
  name: 'default-layout',

  components: {
    // Announcement,
    HeroImage,
    PageHeader,
    PageFooter,
    AuthForm
  }
}
</script>

<style lang="stylus" scoped>
.main
  position: relative
</style>