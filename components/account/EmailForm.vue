<template lang='pug'>
form.form(@submit.prevent='submit')
  h3.form-title
    span {{ headerTitle }}
    button(@click="close") &times;
  .form-header(v-if="header !== ''" v-html='header')

  .form-group
    label.label(for='email') Email
    input.input(:class="{ '-is-error': invalidEmail }"
                type='email'
                placeholder='Account Email'
                @focus='isFocus = true'
                @blur='isFocus = false'
                v-model='email'
                autocomplete='email' autofocus)
    span.help-text.-is-error(v-if='invalidEmail' v-cloak) This email is invalid

  .form-error.text-center
    span.help-text.-is-error(v-if='formError.length > 0' v-text='formError' v-cloak)

  .form-actions
    button.button.primary.-full(type='submit') Next

</template>

<script>

export default {
  name: 'account-email-form',

  props: {
    headerTitle: {
      type: String,
      default: ''
    },
    header: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      email: '',
      formError: '',
      isFocus: false
    }
  },

  computed: {
    invalidEmail () {
      if (!this.isFocus && this.email !== '') {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return !re.test(String(this.email).toLowerCase())
      }
    }
  },

  methods: {
    checkForm () {
      let invalid = false
      if (this.email === '') {
        invalid = true
        this.formError = 'Please enter a valid email address'
      }
      if (this.invalidEmail) invalid = true
      return invalid
    },

    submit () {
      // Check if the form is valid and display errors
      this.formError = ''
      if (this.checkForm()) return false

      // Dispach information to the store
      this.$store.dispatch('giftCustomer', {
        email: this.email
      })
      this.close()
    },

    close (e) {
      // Prevent enter event to close the modal
      if (!e || e.screenX !== 0) this.$modal.hide('email-form')
    }
  }
}
</script>

<style lang='stylus' scoped>
.form-title
  justify-content space-between

.form-actions .control-group .label
  margin-right 2%

.form-actions
  margin-bottom 40px

.checkbox a
  color: #429ca8
</style>
