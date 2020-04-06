<template lang='pug'>
  .homepage
    .cheatsheet
      FreeWeekendMain 

</template>

<script>
import FreeWeekendMain from '~/components/static/FreeWeekendMain'

export default {
  name: 'page-free-week',

  middleware: 'anonymous',

  head () {
    return {
      title: 'Enroll in our Free Week | Vue Mastery',
      meta: [{
        hid: 'description',
        property: 'description',
        content: "Vue Mastery will be unlocking all its courses free over one week in April.  Don't miss out!"
      },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content: "Vue Mastery will be unlocking all its courses free over one week in April.  Don't miss out!"
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: "Vue Mastery will be unlocking all its courses free over one week in April.  Don't miss out!"
      },
      {
        hid: `og:title`,
        property: 'og:title',
        content: `Vue Mastery Free Weekend`
      },
      {
        hid: `og:image`,
        property: 'og:image',
        content: 'https://www.vuemastery.com/images/free-weekend/share-facebook.png'
      },
      {
        hid: `twitter:image`,
        property: 'twitter:image',
        content: 'https://www.vuemastery.com/images/free-weekend/share-twitter.png'
      },
      {
        hid: `twitter:title`,
        property: 'twitter:title',
        content: `Vue Mastery Free Week`
      }
      ]
    }
  },

  components: {
    FreeWeekendMain
  }
}
</script>
