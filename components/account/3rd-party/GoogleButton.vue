<template lang="pug">
  button(type="button" @click.prevent="GoogleButton" :disabled="disabled")
    i.fab.fa-google
    | {{ label }}
  //- <button type="button" class="btn" v-on:click.prevent="GoogleButton" :disabled="disabled">
  //-   <i class="fab fa-google"></i>
  //-   {{ label }}
  //- </button>
</template>

<script>
export default {
  name: 'GoogleButton',
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
      this.$store.dispatch('userGoogleLogin')
        .then(() => {
          if (this.redirect !== '') this.$router.push(this.redirect)
        })
    }
  }
}
</script>
