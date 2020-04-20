<template lang='pug'>
  .homepage
    .cheatsheet
      free-period-wrapper
        h2.title Free Week is Now Over
        p.lead
          | However, our #[nuxt-link(to='/courses/intro-to-vue-js/vue-instance') Intro to Vue course] is free, and many of our courses start with free lessons.

        p
          nuxt-link.button.primary(to='/courses') View Courses

</template>

<script>
import FreePeriodWrapper from '~/components/promotions/FreePeriodWrapper'
import FreeEnrollButton from '~/components/promotions/FreeEnrollButton'

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
        content: `Vue Mastery Free Week`
      },
      {
        hid: `og:image`,
        property: 'og:image',
        content: 'https://www.vuemastery.com/images/free-period/share-facebook.png'
      },
      {
        hid: `og:url`,
        property: 'og:url',
        content: 'https://www.vuemastery.com/free-week'
      },
      {
        hid: `twitter:image`,
        property: 'twitter:image',
        content: 'https://www.vuemastery.com/images/free-period/share-twitter.png'
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
    FreePeriodWrapper,
    FreeEnrollButton
  }
}
</script>

