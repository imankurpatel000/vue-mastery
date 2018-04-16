<template lang="pug">
div(v-if='account')
  p We will be sending $X of your monthly payment to the Vue.js project.
  router-link(to='https://github.com/vuejs/roadmap' target='_blank') VUE. JS ROADMAP
  p Your subscription will automatically renew on {date}
  p If you ever want to modify, suspend, or cancel your subscription, just head over to your profile page by clicking the image in the top right of your screen, and hitting the button that looks like:
  router-link(to='/account/my-subscription') MY SUBSCRIPTION
  p 
    | If you have any feedback for us, need some support, or want to request any content, we’d love to hear from you. You can use the&nbsp
    nuxt-link(to='/contact') contact
    |  us form or just email&nbsp
    a(href='mailto:team@vuemastery.com' target='_blank') team@vuemastery.com

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'page-thank-you',

  middleware: 'anonymous',

  computed: {
    ...mapState({
      account: result => result.account.account
    })
  }
}
</script>
