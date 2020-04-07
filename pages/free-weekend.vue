<template lang='pug'>
  .homepage
    .cheatsheet
      free-period-wrapper
        .body
        h2.title Free Weekend is Now Over
        p.lead
          | However, our #[nuxt-link(to='/courses/intro-to-vue-js/vue-instance') Intro to Vue course] is free, and many of our courses start with free lessons.

        p
          nuxt-link.button.primary(to='/courses') View Courses

</template>

<script>
import FreePeriodWrapper from '~/components/promotions/FreePeriodWrapper'

export default {
  name: 'page-free-weekend',

  middleware: 'anonymous',

  head () {
    return {
      title: 'Enroll in our Free Weekend | Vue Mastery',
      meta: [{
        hid: 'description',
        property: 'description',
        content: "Vue Mastery will be unlocking all its courses free over one weekend in March.  Don't miss out!"
      },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content: "Vue Mastery will be unlocking all its courses free over one weekend in March.  Don't miss out!"
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: "Vue Mastery will be unlocking all its courses free over one weekend in March.  Don't miss out!"
      },
      {
        hid: `og:title`,
        property: 'og:title',
        content: `Vue Mastery Free Weekend`
      },
      {
        hid: `og:image`,
        property: 'og:image',
        content: 'https://www.vuemastery.com/images/free-period/share-facebook.png'
      },
      {
        hid: `twitter:image`,
        property: 'twitter:image',
        content: 'https://www.vuemastery.com/images/free-period/share-twitter.png'
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
    FreePeriodWrapper
  }
}
</script>
