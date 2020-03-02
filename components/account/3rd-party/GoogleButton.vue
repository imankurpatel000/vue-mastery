<template lang='pug'>
button(type='button'
        :disabled='disabled'
        @click.prevent='GoogleButton')
  i.fab.fa-google
  | {{ label }}

</template>

<script>
export default {
  name: 'google-button',

  props: {
    label: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    redirect: {
      type: String,
      default: ''
    }
  },

  methods: {
    GoogleButton () {
      this.$store.dispatch('account/userGoogleLogin')
        .then(() => {
          if (this.redirect !== '') this.$router.push(this.redirect)
        })
        .catch((error) => {
          this.$emit('error', error)
        })
    }
  }
}
</script>
