<template lang='pug'>
  .homepage
    .cheatsheet
      CheatSheetNuxtMain 

</template>

<script>
import CheatSheetNuxtMain from '~/components/static/CheatSheetNuxtMain'

export default {
  name: 'page-nuxt-cheat-sheet',

  middleware: 'anonymous',

  head () {
    return {
      title: 'Get the Ultimate Nuxt.js Cheat Sheet | Vue Mastery',
      meta: [{
        hid: `og:url`,
        property: 'og:url',
        content: process.env
      }]
    }
  },

  components: {
    CheatSheetNuxtMain
  }
}
</script>

<style lang='stylus' scoped>

</style>
