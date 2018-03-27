<template lang="pug">
  .container(:class="openNav ? 'open-nav': ''")
    Top(:class="$route.name")
    nuxt
    VuePodcast
    Bottom
    AuthForm
</template>

<script>
import { mapGetters } from 'vuex'
import Top from '~/components/header/PageHeader.vue'
import VuePodcast from '~/components/static/VuePodcast.vue'
import Bottom from '~/components/footer/PageFooter.vue'
import AuthForm from '~/components/account/Accountmodal.vue'

export default {
  components: {
    Top,
    VuePodcast,
    Bottom,
    AuthForm
  },
  computed: {
    ...mapGetters([
      'openNav'
    ])
  }
}
</script>
