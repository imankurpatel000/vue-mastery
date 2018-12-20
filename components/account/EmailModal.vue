<template lang="pug">
  no-ssr
    modal(name="email-form" v-cloak height="auto" @before-open="beforeOpen" @before-close="beforeClose" :scrollable="true" :adaptive="true")
      EmailForm(:header-title="headerTitle" :header="header")
</template>

<script>
import EmailForm from './EmailForm.vue'

export default {
  name: 'account-modal',

  components: {
    EmailForm
  },

  data () {
    return {
      headerTitle: false,
      header: false,
      redirect: false,
      isOpen: false
    }
  },

  methods: {
    beforeOpen (event) {
      this.isOpen = true
      this.headerTitle = event.params.headerTitle
      this.header = event.params.header
      this.redirect = event.params.redirect || false
    },

    beforeClose (event) {
      this.isOpen = false
      console.log(this.redirect)
      this.redirect.function(this.redirect.params)
    }
  }
}
</script>
