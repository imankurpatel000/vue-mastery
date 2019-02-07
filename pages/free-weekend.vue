<template lang='pug'>
  .homepage
    .cheatsheet
      FreeWeekendMain 

</template>

<script>
import FreeWeekendMain from '~/components/static/FreeWeekendMain'

export default {
  name: 'page-free-weekend',

  middleware: 'anonymous',

  head () {
    return {
      title: 'Enroll in our Free Weekend | Vue Mastery',
      meta: [{
        hid: `og:url`,
        property: 'og:url',
        content: process.env
      }]
    }
  },

  components: {
    FreeWeekendMain
  }
}
</script>

<style lang='stylus' scoped>

</style>
