<template lang='pug'>
button(type='button'
       :disabled='disabled'
       @click.prevent='GithubButton')
  i.fab.fa-github
  | {{ label }}

</template>

<script>
export default {
  name: 'github-button',

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
    GithubButton () {
      this.$store.dispatch('account/userGithubLogin')
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
