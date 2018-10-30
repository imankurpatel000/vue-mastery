<template lang='pug'>
  .container
    PageHeader(title='Our Courses'
              background_image='url(/images/bkg-courses.svg)')

    .courses-body.wrapper
      CourseList(:courses='courses' :account='account')
      Latest(:courses='courses' :latests='latests' :account='account')

    .vue-conf
      VueConfBanner
    CheatSheetAlt(location='Course page cheat sheet download')
</template>

<script>
import { mapState } from 'vuex'

import CourseList from '~/components/courses/All'
import Latest from '~/components/courses/Latest'
import CheatSheetAlt from '~/components/static/CheatSheetAlt'
import VueConfBanner from '~/components/static/VueConfBanner'
import PageHeader from '~/components/ui/PageHeader'

export default {
  name: 'page-courses',

  middleware: 'anonymous',

  head () {
    return {
      title: 'Course Listing | Vue Mastery',
      meta: [{
        hid: 'og:url',
        property: 'og:url',
        content: `${process.env.url}/courses`
      }]
    }
  },

  components: {
    CourseList,
    Latest,
    CheatSheetAlt,
    VueConfBanner,
    PageHeader
  },

  async fetch ({ store }) {
    await store.dispatch('latests')
    await store.dispatch('getAllCourses')
  },

  computed: {
    ...mapState({
      account: result => result.account.account,
      courses: result => result.courses.courses,
      latests: result => result.courses.latests
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

  +laptop-up()
    grid-template-columns 63% 33%
</style>
