<template lang='pug'>
no-ssr
  modal(name="contact-team-form" v-cloak height="auto" scrollable=true)
    form.form(@submit.prevent='submit')
      h3.form-title {{ title }}

    .contact-form
      form.form(@submit.prevent='submit')
        .form-group
          label.visually-hidden(for='name') Name
          input(class='input -hollow' placeholder='Name' v-model='name' autofocus)
        .form-group
          label.visually-hidden(for='email') Email
          input(class='input -hollow' placeholder='Email' type='email' v-model='email')
        .form-group
          label.visually-hidden(for='companyWebsite') Company website?
          input(class='input -hollow' placeholder='Company website?' v-model='companyWebsite')
        .form-group
          label.visually-hidden(for='phoneNumber') Phone Number?
          input(class='input -hollow' placeholder='Phone Number?' v-model='phoneNumber')
        .form-group
          label.visually-hidden(for='accountNumber') How many accounts do you think you’ll need?
          input(class='input -hollow' placeholder='How many accounts do you think you’ll need?' v-model='accountNumber')

        .form-error
          .-is-error(v-if='formError.length > 0' v-text='formError')
          .-is-success(v-if='formSuccess.length > 0' v-text='formSuccess')

        .form-group
          input.button.primary(type='button' value='Send' @click='sendForm()' ref='submit')
</template>
<script>
export default {
  name: 'contact-team-modal',

  props: {
    account: {
      type: Object,
      required: false
    }
  },

  data () {
    return {
      name: this.account.name || '',
      email: this.account.email || '',
      companyWebsite: '',
      accountNumber: '',
      phoneNumber: '',
      debounceTimer: setTimeout(() => {}),
      formError: '',
      formSuccess: ''
    }
  },

  methods: {
    resetFormMessages () {
      this.formSuccess = this.formError = ''
    },

    sendForm () {
      this.resetFormMessages()
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        if (this.name === '') {
          this.formError = 'Please enter your name'
          return false
        }
        let re = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(String(this.email).toLowerCase())) {
          this.formError = 'Please enter a valid email'
          return false
        }
        if (this.companyWebsite === '') {
          this.formError = 'Please enter a company Website'
          return false
        }
        if (this.accountNumber === '') {
          this.formError = 'Please enter how many accounts you need'
          return false
        }
        if (this.phoneNumber === '') {
          this.formError = 'Please enter a phone number'
          return false
        }

        this.$store.dispatch('sendTeamSubscriptionRequest', {
          name: this.name,
          email: this.email,
          companyWebsite: this.companyWebsite,
          accountNumber: this.accountNumber,
          phoneNumber: this.phoneNumber
        })
          .then(() => {
            this.name = ''
            this.email = ''
            this.companyWebsite = ''
            this.accountNumber = ''
            this.phoneNumber = ''
            this.$modal.hide('contact-team-form')
            this.$refs.submit.value = ''
            this.formSuccess = 'Successfully sent your message.'
            this.$toast.show('Thank you for your interest, we should be in touch within a day (unless it’s a weekend).', {
              duration: 10000,
              className: 'vm-toasted',
              action: {
                text: 'Close',
                onClick: (e, toastObject) => {
                  toastObject.goAway(0)
                }
              }})
          })
          .catch((err) => {
            this.formError = 'Error sending your request. Please try again later.'
            console.error(err)
          })
      }, 500)
    }
  }
}
</script>
<style lang='stylus' scoped>

</style>
