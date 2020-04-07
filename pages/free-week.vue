<template lang='pug'>
  .homepage
    .cheatsheet
      free-period-wrapper
        h2.title Enroll in Free Week
        p.lead
          | Reserve your spot to get access to all Vue.js courses free.
          br
          span.normal We will email you when the courses are unlocked.
        p.lead
          | Why are we doing this?
          br
          span.normal We want you to learn Vue while you might be stuck at home and we know some people around the world can't afford our courses.
        p.lead.date
          | Monday through Sunday
          br
          | April 13, 12:00 AM ET until April 19, 11:59 PM ET

        free-enroll-button(button-class='tertiary' location='Free Week' redirect='/thank-you-free-week')

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
    FreePeriodWrapper,
    FreeEnrollButton
  }
}
</script>

