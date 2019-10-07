<template lang='pug'>
  no-ssr
    a.button(v-if='account' v-cloak
             href='/pdf/Vue-3-Cheat-Sheet.pdf'
             :class='buttonClass'
             download) Download It Free

    button.button(v-else :class='buttonClass' v-cloak 
                  @click='openLogin') Download It Free
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'download-button',

  props: {
    location: {
      type: String,
      required: true
    },
    buttonClass: {
      type: String,
      required: false
    }
  },

  computed: {
    ...mapState({
      account: result => result.account.account
    })
  },

  methods: {
    openLogin () {
      this.$modal.show('login-form', {
        newAccount: true,
        headerTitle: 'Please sign up to download free',
        redirect: '/download-vue3',
        location: this.location
      })
    }
  }
}
</script>
