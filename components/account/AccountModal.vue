<template lang="pug">
  client-only
    modal(name="login-form" v-cloak height="auto" @before-open="beforeOpen" @before-close="beforeClose" :scrollable="true" :adaptive="true")
      AuthForm(:new-account="newAccount" :header-title="headerTitle" :header="header" :location="location")
</template>

<script>
import AuthForm from './AuthForm.vue'
import { mapState } from 'vuex'

export default {
  name: 'account-modal',

  components: {
    AuthForm
  },

  data () {
    return {
      newAccount: true,
      headerTitle: false,
      header: false,
      redirect: false,
      location: '',
      isOpen: false
    }
  },

  computed: {
    ...mapState({
      account: result => result.account.account
    })
  },

  watch: {
    account () {
      if (this.account && this.isOpen) {
        this.$modal.hide('login-form', { newAccount: false })
        if (this.redirect) {
          if (typeof (this.redirect) === 'string') this.$router.push(this.redirect)
          else {
            // Check for mobile because the chargebee popup doesn't show after login
            const isMobile = typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1
            if (this.redirect.newSubscription && isMobile) {
              this.$toast.show('<span><b>You are now logged in</b>.</span>', {
                duration: 20000,
                className: 'vm-toasted-subscribe',
                action: {
                  text: 'Click here to Susbcribe',
                  onClick: (e, toastObject) => {
                    this.redirect.function(this.redirect.params)
                  }
                }
              })
            } else {
              this.redirect.function(this.redirect.params)
            }
          }
        } else {
          this.$toast.show('<span><b>You are now logged in</b>. View your course progress in the Dashboard.</span>', {
            duration: 7000,
            className: 'vm-toasted',
            action: {
              text: 'Close',
              onClick: (e, toastObject) => {
                toastObject.goAway(0)
              }
            }})
        }
      }
    }
  },

  methods: {
    beforeOpen (event) {
      this.isOpen = true
      this.newAccount = event.params.newAccount
      this.headerTitle = event.params.headerTitle
      this.header = event.params.header
      this.redirect = event.params.redirect || false
      this.location = event.params.location || ''
    },

    beforeClose (event) {
      this.isOpen = false
    }
  }
}
</script>
