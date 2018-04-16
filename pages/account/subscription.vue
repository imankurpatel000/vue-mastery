
<template lang="pug">
div(v-if='account')
  h1 Subscriptions

div(v-else)
  h3 You need to login first
  AuthForm

</template>

<script>
import { mapState } from 'vuex'
import AuthForm from '~/components/account/AuthForm.vue'

export default {
  name: 'subscription',

  components: {
    AuthForm
  },

  computed: {
    ...mapState({
      account: result => result.account.account
    })
  }
}
</script>

<style lang="stylus" scoped>

</style>
