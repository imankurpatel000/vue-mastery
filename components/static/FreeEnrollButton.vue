<template lang='pug'>
  client-only
    button.button(v-if='account' v-cloak
      @click='enroll'
      :class='buttonClass') Enroll Free Now

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
        redirect: '/thank-you-free-weekend',
        location: this.location
      })
    },
    enroll () {
      this.$store.dispatch('account/userEnrollFreeWeekend')
        .then(() => {
          this.$router.push('/thank-you-free-weekend')
        })
    }
  }
}
</script>
