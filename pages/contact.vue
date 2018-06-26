<template lang='pug'>
.container
  .wrapper
    .contact-body
      h1.title Contact Us
      p If you have any feedback, suggestions, or need a little support we're here to help.  If you've run into a bug with your Vue.js application and need a hand (aside from googling your error) we'd recommend the <a href='https://forum.vuejs.org/' target='_new'>Vue.js Forum</a> or <a href='https://discordapp.com/invite/HBherRA' target='_new'>Vue Land Chat</a>.

      h3.subtitle Follow us
      SocialMediaLinks

    .contact-form
      form.form(@submit.prevent='submit')
        .form-group
          label.visually-hidden(for='name') Name
          input(class='input -hollow' placeholder='Name' v-model='name' autofocus)
        .form-group
          label.visually-hidden(for='email') Email
          input(class='input -hollow' placeholder='Email' type='email' v-model='email')
        .form-group
          label.visually-hidden(for='message') Message
          textarea(class='textarea -hollow' placeholder='Message' rows='5' v-model='message')

        .form-error
          .-is-error(v-if='formError.length > 0' v-text='formError')
          .-is-success(v-if='formSuccess.length > 0' v-text='formSuccess')

        .form-group
          input.button.primary(type='button' value='Send' @click='sendForm()' ref='submit')
</template>
<script>
import SocialMediaLinks from '~/components/static/SocialMediaLinks'

export default {
  name: 'page-contact',

  middleware: 'anonymous',

  components: {
    SocialMediaLinks
  },

  head () {
    return {
      title: 'Contact Us | Vue Mastery',
      meta: [{
        hid: 'og:url',
        property: 'og:url',
        content: `${process.env.url}/contact`
      }]
    }
  },

  data () {
    return {
      name: '',
      email: '',
      message: '',
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
        if (this.message === '') {
          this.formError = 'Please enter a message'
          return false
        }
        this.$store.dispatch('sendContactRequest', {
          name: this.name,
          email: this.email,
          message: this.message
        })
          .then(() => {
            this.name = ''
            this.email = ''
            this.message = ''
            this.$refs.submit.value = 'Thank you'
            this.formSuccess = 'Successfully sent your message.'
          })
          .catch((err) => {
            this.formError = 'Error sending your email. Please try again later.'
            console.error(err)
          })
      }, 500)
    }
  }
}
</script>
<style lang='stylus' scoped>
  @import '~assets/css/_variables'
  
  build-grid-area(contact-body contact-form)

  .wrapper
    margin-top ($vertical-space/4)
    margin-bottom ($vertical-space/4)
    grid-template-columns 1fr
    grid-row-gap ($vertical-space/4)
    grid-template-areas 'contact-body'\
                        'contact-form'

    +laptop-up()
      margin-top $vertical-space
      margin-bottom $vertical-space
      grid-template-columns 1fr 1fr
      grid-row-gap $vertical-space * 1.5
      grid-column-gap ($vertical-space/2)
      grid-template-areas 'contact-body contact-form'

  .title
    color: $primary-color
    font-weight 600
  .subtitle
    color $secondary-color
    margin-bottom 0
</style>
