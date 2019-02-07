<template lang='pug'>
  no-ssr
    a.button(v-if='account' v-cloak
             href='/enroll-free-weekend'
             :class='buttonClass'
             download) Enroll Free Now

    button.button(v-else :class='buttonClass' v-cloak 
                  @click='openLogin') Enroll Free Now
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'free-enroll-button',

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
        headerTitle: 'Please sign up to enroll free',
        redirect: '/enroll-free-weekend',
        location: this.location
      })
    }
  }
}
</script>
