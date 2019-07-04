<template lang='pug'>
  .container
    PageHeader(title='Our Courses'
              background_image='/images/bkg-courses.svg'
              background_color='linear-gradient(to right, #41B782 , #86D169)')

    .courses-body.wrapper
      LearningPath(:courses='courses'
        :account='account')
      //- All(:courses='courses' :account='account')
      //- Latest(:courses='courses' :latests='latests' :account='account')

    //- .vue-conf
    //-   VueConfBanner
    CheatSheetAlt(location='Course page cheat sheet download')
</template>

<script>
import { mapState } from 'vuex'

import LearningPath from '~/components/courses/LearningPath'
import All from '~/components/courses/All'
// import Latest from '~/components/courses/Latest'
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
        content: `${process.env.url}/courses`
      },
      {
        hid: `description`,
        name: 'description',
        content: 'The best tutorials to learn Vue.js programming. Try a free video lesson in one of our courses.'
      }]
    }
  },

  components: {
    All,
    LearningPath,
    // Latest,
    CheatSheetAlt,
    VueConfBanner,
    PageHeader
  },

  async fetch ({ store }) {
    await store.dispatch('courses/latests')
    await store.dispatch('courses/getAllCourses')
  },

  computed: {
    ...mapState({
      account: result => result.account.account,
      courses: result => result.courses.courses
      // latests: result => result.courses.latests
    })
  }
}
</script>

<style lang='stylus' scoped>
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
