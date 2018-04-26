<template lang='pug'>
  .homepage
    .cheatsheet
      CheatSheetMain

</template>

<script>
import CheatSheetMain from '~/components/static/CheatSheetMain'

export default {
  name: 'page-vue-cheat-cheet',

  middleware: 'anonymous',

  head () {
    return {
      title: 'Vue Mastery | Get the Ultimate Vue Cheat Sheet.',
      meta: [{
        hid: `og:url`,
        property: 'og:url',
        content: process.env
      }]
    }
  },

  components: {
    CheatSheetMain
  }
}
</script>

<style lang='stylus' scoped>

</style>
