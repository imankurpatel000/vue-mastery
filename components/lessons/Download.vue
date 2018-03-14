<template lang="pug">
  no-ssr
    a.button.secondary.-has-icon(v-cloak
             v-if="account"
             :href="courseLink"
             download)
      i.fa.fa-download
      | Download Video

    button.button.secondary.-has-icon(v-else v-cloak @click="openLogin")
      i.fa.fa-download
      | Download Video
</template>

<script>
export default {
  name: 'downloadButton',
  props: ['courseLink', 'account'],
  methods: {
    openLogin () {
      this.$modal.show('login-form', {
        newAccount: true,
        headerTitle: 'Sign up to download the video',
        location: 'Lesson page download button'
      })
    }
  }
}
</script>
