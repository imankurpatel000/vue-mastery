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
        hid: 'description',
        property: 'description',
        content: "Vue Mastery will be unlocking all its courses free over one weekend in February.  Don't miss out!"
      },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content: "Vue Mastery will be unlocking all its courses free over one weekend in February.  Don't miss out!"
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: "Vue Mastery will be unlocking all its courses free over one weekend in February.  Don't miss out!"
      },
      {
        hid: `og:title`,
        property: 'og:title',
        content: `Vue Mastery Free Weekend`
      },
      {
        hid: `og:image`,
        property: 'og:image',
        content: 'https://www.vuemastery.com/images/free-weekend-banner.jpg'
      },
      {
        hid: `twitter:image`,
        property: 'twitter:image',
        content: 'https://www.vuemastery.com/images/free-weekend-banner.jpg'
      },
      {
        hid: `twitter:title`,
        property: 'twitter:title',
        content: `Vue Mastery Free Weekend`
      }
      ]
    }
  },

  components: {
    FreeWeekendMain
  }
}
</script>

<style lang='stylus' scoped>

</style>
