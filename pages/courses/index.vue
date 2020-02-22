<template lang='pug'>
.container
  PageHeader(title='Our Courses'
            background_image='/images/courses/background.svg')
    .v
  .courses-body.wrapper
    LearningPath(:courses='courses'
      :account='account')

  CheatSheetMain

</template>

<script>
import { mapState } from 'vuex'

import LearningPath from '~/components/courses/LearningPath'
import CheatSheetMain from '~/components/static/CheatSheetMain'
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
    VueConfBanner,
    PageHeader,
    CheatSheetMain
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
.container
  background-color #fff

.page-header
  background-size cover
  background-attachment fixed
  height 466px
  align-items flex-end
  padding-bottom 50px
  overflow hidden

  &::before,
  &::after
    content ''
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    background-size auto 100%
    background-position top 200px center
    background-repeat no-repeat
    z-index 1
    transform translateZ(-1px) scale(1.5)
    bottom -1px // Remove bottom artfacts
    left -4px 

  &:before
    background-image url(/images/courses/foreground.svg)

  &:after
    background-image url(/images/courses/light.svg)
    background-size auto 118%
    background-position top center
    left -13px
    opacity .5

  ::v-deep .title
    +mobile-only()
      text-align center

.v
  position: absolute;
  width: 60px;
  height: 33px;
  z-index: 1;
  top: 50%;
  left: 50%;
  margin-left: -23px;
  margin-top: -13px;
  transform: translateZ(-1px) scale(1.5);
  background-image: url(/images/courses/v.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  
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
