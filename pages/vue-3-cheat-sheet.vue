<template lang='pug'>
  .homepage
    .cheatsheet
      CheatSheetVue3Main 

</template>

<script>
import CheatSheetVue3Main from '~/components/static/CheatSheetVue3Main'

export default {
  name: 'page-vue-3-cheat-sheet',

  middleware: 'anonymous',

  head () {
    return {
      title: 'Download Free Vue 3 Cheat Sheet | Vue Mastery',
      meta: [{
        hid: `og:url`,
        property: 'og:url',
        content: process.env
      }]
    }
  },

  components: {
    CheatSheetVue3Main
  }
}
</script>

<style lang='stylus' scoped>

</style>
