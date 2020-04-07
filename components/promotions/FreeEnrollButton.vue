<template lang='pug'>
  client-only
    button.button(
      @click='enroll'
      :class='buttonClass'
    ) Enroll Free Now
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
    redirect: {
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
    enroll () {
      if (this.account) {
        // Enroll user directly
        this.$store.dispatch('account/userEnrollFreePeriod')
          .then(() => {
            this.$router.push(this.redirect)
          })
      } else {
        // Login user then redirect redirect
        this.$modal.show('login-form', {
          newAccount: true,
          headerTitle: 'Please sign up to enroll free',
          redirect: this.redirect,
          location: this.location
        })
      }
    }
  }
}
</script>
