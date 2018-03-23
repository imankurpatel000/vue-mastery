<template lang="pug">
form.form.card
  .card-body
    .form-group.-inline
      label.label New Password
      input.input(type="password" placeholder="New Password" v-model="newPassword" ref="password")
      button.button.-has-icon.-small.link(type="button" @click="switchVisibility()")
        i.fa.fa-eye-slash(v-if='showPassword')
        i.fa.fa-eye(v-else)
        span.visually-hidden show / hide

    .form-group
      label.label Confirm Password
      input.input(type="password" placeholder="Confirm Password" v-model="confirmPassword" @blur="validatePassword"  ref="confirmPassword")

    .form-error
      .-is-error(v-if="formError.length > 0" v-text="formError")
      .-is-success(v-if="formSuccess.length > 0" v-text="formSuccess")

    button.button.primary(type="button" @click="updatePassword") Update Password
</template>

<script>
export default {
  data () {
    return {
      newPassword: '',
      confirmPassword: '',
      showPassword: false,
      debounceTimer: setTimeout(() => {}),
      formError: '',
      formSuccess: ''
    }
  },
  methods: {
    resetFormMessages () {
      this.formSuccess = this.formError = ''
    },
    validatePassword () {
      this.resetFormMessages()
      if (this.confirmPassword !== this.newPassword) {
        this.formError = 'The two passwords don\'t match. Please verify your password'
        return false
      } else return true
    },
    updatePassword () {
      this.resetFormMessages()
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        if (this.newPassword === '') {
          this.formError = 'Please enter a valid password'
          return false
        }
        if (this.validatePassword()) {
          this.$store.dispatch('userUpdatePassword', this.newPassword)
            .then(() => {
              this.formSuccess = 'Successfully updated your account password'
            })
            .catch((err) => {
              this.formError = err.message
              console.error(err)
            })
        }
      }, 500)
    },
    switchVisibility () {
      this.showPassword = !this.showPassword
      this.$refs.password.type = this.showPassword ? 'text' : 'password'
      this.$refs.confirmPassword.type = this.showPassword ? 'text' : 'password'
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~assets/css/_variables'
.form-group.-inline .button
  right: 10px
</style>
