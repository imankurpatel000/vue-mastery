<template lang='pug'>
  .container(:class="$store.state.openNav ? 'open-nav': ''")
    //- Announcement
    PageHeader(:class='$route.name')
    nuxt
    VuePodcast(v-if="showPodcast" v-cloak)
    PageFooter
    AuthForm
</template>

<script>
import Announcement from '~/components/static/Announcement.vue'
import PageHeader from '~/components/header/Header.vue'
import VuePodcast from '~/components/static/VuePodcast.vue'
import PageFooter from '~/components/footer/Footer.vue'
import AuthForm from '~/components/account/Accountmodal.vue'

export default {
  name: 'default-layout',

  components: {
    Announcement,
    PageHeader,
    VuePodcast,
    PageFooter,
    AuthForm
  },

  computed: {
    showPodcast () {
      const exceptions = ['thank-you-annual', 'thank-you-monthly', 'thank-you-summer', 'pricing', 'blog-slug']
      return exceptions.indexOf(this.$route.name) < 0
    }
  }
}
</script>
