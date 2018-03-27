<template lang="pug">
  no-ssr
    modal(name="login-form" v-cloak height="auto" @before-open="beforeOpen" @before-close="beforeClose" scrollable=true)
      AuthForm(:new-account="newAccount" :header-title="headerTitle" :header="header" :location="location")
</template>

<script>
import AuthForm from './AuthForm.vue'
import { mapState } from 'vuex'

export default {
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
        this.$toast.show('You are now logged in. You can now view your course progress on your', {
          duration: 5000,
          action: {
            text: 'dashboard.',
            onClick: (e, toastObject) => {
              this.$router.push('/account')
            }
          }})
        if (this.redirect) this.$router.push(this.redirect)
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
