<template lang='pug'>
  .homepage
    .hero
      Hero
    .free-videos
      Free(:free='free')
    .course-list
      .section
        h2.title Courses
        Featured(:featured='featured')
        nuxt-link.button.primary.border(to='/courses')
          | More
          span.visually-hidden Courses
    .vue-conf
      VueConfBanner
    .meet-teachers
      MeetTeachers
    .cheatsheet
      CheatSheetMain
    .community
      CommunitySupport
</template>

<script>
import { mapState } from 'vuex'
import Featured from '~/components/courses/Featured'
import Free from '~/components/courses/Free'
import Hero from '~/components/static/HeroBanner'
import MeetTeachers from '~/components/static/MeetTeachers'
import CommunitySupport from '~/components/static/CommunitySupport'
import CheatSheetMain from '~/components/static/CheatSheetMain'
import VueConfBanner from '~/components/static/VueConfBanner'

export default {
  name: 'page-home',

  middleware: 'anonymous',

  head () {
    return {
      title: 'Vue Mastery | The Ultimate Learning Resource for Vue.js Developers',
      meta: [{
        hid: `og:url`,
        property: 'og:url',
        content: process.env
      }]
    }
  },

  components: {
    Hero,
    Featured,
    Free,
    MeetTeachers,
    CommunitySupport,
    CheatSheetMain,
    VueConfBanner
  },

  computed: {
    ...mapState({ free: result => result.courses.free }),
    ...mapState({ courses: result => result.courses.courses }),
    ...mapState({ featured: result => result.courses.featured })
  },

  async fetch ({ store }) {
    await store.dispatch('featured')
    await store.dispatch('featured')
    await store.dispatch('getAllCourses')
  }
}
</script>

<style lang='stylus' scoped>
@import '~assets/css/_variables'

build-grid-area(hero free-videos course-list vue-conf meet-teachers cheatsheet community)

.homepage
  display grid
  grid-template-columns 1fr 1fr
  grid-template-areas 'hero hero'\
    'free-videos free-videos'\
    'course-list course-list'\
    'vue-conf vue-conf'\
    'meet-teachers meet-teachers'\
    'cheatsheet cheatsheet'\
    'community community'

.section
  .title
    margin-bottom ($vertical-space/3)
    font-weight 600
    padding-top 0
    color $secondary-color
    text-align center
    +tablet-up()
      font-size 40.5px
      text-align left

.free-videos
  background-color $secondary-color

.course-list
  background-color: #f3f3f3

.button
  width 100%

+tablet-up()
  .button
    width max-content

+desktop-up()
  .homepage
    grid-template-areas 'hero hero'\
      'free-videos course-list'\
      'vue-conf vue-conf'\
      'meet-teachers meet-teachers'\
      'cheatsheet cheatsheet'\
      'community community'\
      'podcast podcast'
</style>
