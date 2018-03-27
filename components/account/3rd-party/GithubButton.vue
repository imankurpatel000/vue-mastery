<template lang="pug">
  button(type="button" @click.prevent="GithubButton" :disabled="disabled")
    i.fab.fa-github
    | {{ label }}
  //- <button type="button" class="btn" v-on:click.prevent="GithubButton" :disabled="disabled">
  //-   <i class="fab fa-github"></i>
  //-   {{ label }}
  //- </button>
</template>

<script>
export default {
  name: 'GithubButton',
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
      this.$store.dispatch('userGithubLogin')
        .then(() => {
          if (this.redirect !== '') this.$router.push(this.redirect)
        })
    }
  }
}
</script>
