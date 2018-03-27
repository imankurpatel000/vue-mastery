<template lang="pug">
form.form(@submit.prevent="submit")
  h3.form-title {{ title }}
  .form-header(v-if="header !== ''" v-html="header")

  .form-group
    .callout.-info(v-if="isNew" v-cloak)
      h4 Benefits for creating an account include:
      ul
        li The ability to track your progress as you complete lessons
        li Early access to lessons before we officially release them
        li Access to download our ultimate Vue.js Cheat Sheet

  .form-group
    label.label(for="email") Email
    input.input(:class="{ '-is-error': invalidEmail }"
                type="email"
                placeholder="Account Email"
                @focus="isFocus = true"
                @blur="isFocus = false"
                v-model="email"
                autocomplete="email" autofocus)
    span.help-text.-is-error(v-if="invalidEmail" v-cloak) This email is invalid

  .form-group.-inline(v-if="rememberPassword" v-cloak)
    label.label(for="password") Password
    input.input(:class="{ '-is-error': invalidPassword }" type="password" placeholder="Password" v-model="password" ref="password")
    span.help-text.-is-error(v-if="invalidPassword" v-cloak) This password is invalid
    button.button.-has-icon.-small.link(type="button" @click="switchVisibility()")
      i.fa.fa-eye-slash(v-if='showPassword')
      i.fa.fa-eye(v-else)
      span.visually-hidden show / hide

  .form-group.-center(v-if="isNew" v-cloak)
    label.checkbox(for="terms")
      input(type="checkbox" name="terms" v-model="terms")
      span I accept the&nbsp
      a(href="/terms" target="_blank" ) terms and conditions

  .form-error.text-center
    span.help-text.-is-error(v-if="formError.length > 0" v-text="formError" v-cloak)

  .form-actions(@click="checkDisabled")
    button.button.primary.-full(type="submit" :disabled="actionDisabled") {{ label }}
    .control-group.-spaced(v-if="rememberPassword" v-cloak)
      .label {{ label }} with:
      GoogleButton.button.secondary.border.-has-icon.-small(:label="'Google'" :disabled="actionDisabled")
      GithubButton.button.secondary.border.-has-icon.-small(:label="'Github'" :disabled="actionDisabled")

  .form-footer
    .control-group(v-if="isNew" v-cloak)
      button.button.link(type="button" @click="switchForm") I already have an account
    .control-group.-separate(v-else)
      button.button.link(type="button" @click="switchForm" v-if="rememberPassword" v-cloak) Sign Up
      button.button.link(type="button" @click="retrievePassword" v-if="rememberPassword" v-cloak) Forgot your password?
      button.button.link(type="button" @click="switchForm(false)" v-if="!rememberPassword" v-cloak) Or Sign in
</template>

<script>
import GoogleButton from '~/components/account/3rd-party/GoogleButton.vue'
import GithubButton from '~/components/account/3rd-party/GithubButton.vue'

export default {
  name: 'LoginForm',
  components: {
    GoogleButton,
    GithubButton
  },
  props: {
    newAccount: {
      type: Boolean,
      default: false
    },
    headerTitle: {
      type: String,
      default: ''
    },
    header: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      email: '',
      password: '',
      formError: '',
      showPassword: false,
      isNew: this.newAccount,
      terms: !this.newAccount,
      rememberPassword: true,
      isFocus: false
    }
  },
  computed: {
    title () {
      if (this.headerTitle !== '') return this.headerTitle
      let t = this.rememberPassword ? 'Welcome Back!' : 'Retrieve your password'
      if (this.isNew) t = 'Let\'s Get You Signed Up.'
      return t
    },
    label () {
      let l = this.rememberPassword ? 'Log In' : 'Reset'
      if (this.isNew) l = 'Sign Up'
      return l
    },
    invalidEmail () {
      if (!this.isFocus && this.email !== '') {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return !re.test(String(this.email).toLowerCase())
      }
    },
    invalidPassword () {
      return !this.password.length > 6
    },
    actionDisabled () {
      return this.isNew ? !this.terms : false
    }
  },
  methods: {
    switchForm (isNew) {
      this.rememberPassword = true
      this.isNew = isNew === false ? isNew : !this.isNew
      this.terms = false
      this.formError = ''
    },
    retrievePassword () {
      this.rememberPassword = false
    },
    checkDisabled () {
      this.formError = ''
      if (!this.terms && this.isNew) this.formError = 'Please read and accept the terms and conditions'
    },
    checkForm () {
      let invalid = false
      if (this.rememberPassword) invalid = this.invalidPassword
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

      // Define which action we do according to the state
      let action = 'userCreate'
      if (!this.isNew) {
        action = this.rememberPassword ? 'userLogin' : 'userRetrievePassword'
      } else {
        this.$ga.event('User', 'Created Account', this.location, 1)
      }

      // Dispach information to the store
      this.$store.dispatch(action, {
        email: this.email,
        password: this.password
      })
        .then(() => {
          if (action === 'userRetrievePassword') {
            this.switchForm(false)
          }
        })
        .catch((error) => {
          console.log(error)
          this.formError = error.message
        })
    },
    switchVisibility () {
      this.showPassword = !this.showPassword
      this.$refs.password.type = this.showPassword ? 'text' : 'password'
    }
  }
}
</script>

<style lang="stylus" scoped>
.form-actions .control-group .label
  margin-right 2%

.checkbox a
  color: #429ca8
</style>
