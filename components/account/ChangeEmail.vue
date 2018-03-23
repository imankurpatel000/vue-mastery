<template lang="pug">
form.form.card
  .card-body
    .form-group.-inline
      label.label New Email
      input.input(type="email" placeholder="New Email" v-model="email" ref="email")

    .form-error
      .-is-error(v-if="formError.length > 0" v-text="formError")
      .-is-success(v-if="formSuccess.length > 0" v-text="formSuccess")

    button.button.primary(type="button" @click="updateEmail") Update Email
</template>

<script>
export default {
  data () {
    return {
      email: '',
      debounceTimer: setTimeout(() => {}),
      formError: '',
      formSuccess: ''
    }
  },
  methods: {
    resetFormMessages () {
      this.formSuccess = this.formError = ''
    },
    validateEmail () {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(this.email).toLowerCase())
    },
    updateEmail () {
      this.resetFormMessages()
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        if (this.email !== '' && this.validateEmail()) {
          this.$store.dispatch('userUpdateEmail', this.email)
            .then(() => {
              this.formSuccess = 'Successfully updated your account email'
            })
            .catch((err) => {
              this.formError = err.message
              console.log(err)
            })
        } else {
          this.formError = 'Please enter a valid email'
        }
      }, 500)
    }
  }
}
</script>
