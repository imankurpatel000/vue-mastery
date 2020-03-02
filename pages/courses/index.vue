<template lang='pug'>
  .container
    PageHeader(title='Our Courses'
              background_image='/images/courses.svg')

    .courses-body.wrapper
      LearningPath(:courses='courses'
        :account='account')

    CheatSheetAlt(location='Course page cheat sheet download')
</template>

<script>
import { mapState } from 'vuex'

import LearningPath from '~/components/courses/LearningPath'
import CheatSheetAlt from '~/components/static/CheatSheetAlt'
import VueConfBanner from '~/components/static/VueConfBanner'
import PageHeader from '~/components/ui/PageHeader'

export default {
  name: 'page-courses',

  middleware: 'anonymous',

  head () {
    return {
      title: 'Learn Vue.js with our Courses | Vue Mastery',
      meta: [{
        hid: 'og:url',
        property: 'og:url',
        content: `${process.env.baseUrl}/courses`
      },
      {
        hid: `description`,
        name: 'description',
        content: 'The best tutorials to learn Vue.js programming. Try a free video lesson in one of our courses.'
      }]
    }
  },

  components: {
    LearningPath,
    CheatSheetAlt,
    VueConfBanner,
    PageHeader
  },

  async fetch ({ store }) {
    await store.dispatch('courses/getAllCourses')
  },

  computed: {
    ...mapState({
      account: result => result.account.account,
      courses: result => result.courses.courses
    })
  }
}
</script>

<style lang='stylus' scoped>
.page-header
    background-size auto 200%
    height 466px
    background-position center
    align-items: flex-end
    background-size auto 200%
    padding-bottom 50px

    ::v-deep .title
      +mobile-only()
        text-align center

    @media screen and (min-width: 1800px)
      background-size cover


.courses-body
  display grid
  width 100%
  grid-column-gap 4%
  grid-row-gap 45px
  padding-top ($vertical-space/2)
  padding-bottom ($vertical-space/2)

  // +laptop-up()
  //   grid-template-columns 63% 33%
</style>
