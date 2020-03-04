<template lang='pug'>
.container
  PageHeader(title='Our Courses'
            background_image='/images/courses/background.svg')
    .v
    .paths
      .group
        button.button.tertiary.-small(:class='this.path === "courses" ? "active" : "border inverted"' @click='redirect("/courses")') Latest
        button.button.tertiary.-small(:class='this.path === "beginner" ? "active" : "border inverted"' @click='redirect("/courses-path/beginner")') Beginner path
      .group
        button.button.tertiary.-small(:class='this.path === "intermediate" ? "active" : "border inverted"' @click='redirect("/courses-path/intermediate")') Intermediate path
        button.button.tertiary.-small(:class='this.path === "advanced" ? "active" : "border inverted"' @click='redirect("/courses-path/advanced")') Advanced path

  .courses-body.wrapper
    LearningPath(
      :path='path'
      :parts='ordered'
      :account='account'
      :slide='slide'
      @handleLinks='handleLinks'
    )

  Nav(v-if='this.path'
      :lessons='pathsNames'
      :selected='pathsNames.indexOf(this.path)'
      :account='account'
      type="path"
      @redirect='redirect'
    )

  CheatSheetMain

</template>

<script>
import { mapState } from 'vuex'

import LearningPath from '~/components/courses/LearningPath'
import CheatSheetMain from '~/components/static/CheatSheetMain'
import VueConfBanner from '~/components/static/VueConfBanner'
import PageHeader from '~/components/ui/PageHeader'
import Nav from '~/components/lessons/Navigation'

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
    PageHeader,
    LearningPath,
    VueConfBanner,
    CheatSheetMain,
    Nav
  },

  data () {
    return {
      path: this.$route.name,
      pathsNames: ['courses', 'beginner', 'intermediate', 'advanced'],
      slide: 'slide'
    }
  },

  computed: {
    ...mapState({
      account: result => result.account.account,
      paths: result => result.courses.paths.paths,
      courses: result => result.courses.courses
    }),

    ordered () {
      let sections = []
      if (this.path === 'courses') {
        sections.push({
          intro: this.paths.intro,
          courses: Object.values(this.courses).reverse() // .sort((a, b) => a.order - b.order)
        })
      } else {
        const parts = ['Intro', '', 'BonusText', 'Bonus', 'OptionText', 'Options'] // Ordered
        parts.map((part, i) => {
          if (!(i % 2)) { // The first in the array, the second the courses
            const el = this.paths[this.path + part] // Ex: beginnerIntro
            if (el) { // Some path have less sections
              sections.push({
                intro: this.paths[this.path + part],
                courses: this.paths[this.path + parts[i + 1]].map(key => this.courses[key]) // Map with actual course
              })
            }
          }
        })
      }
      return sections
    }
  },

  methods: {
    redirect (path) {
      history.pushState({}, null, path)
      const newPath = path.split('/').pop()
      this.slide = this.pathsNames.indexOf(newPath) > this.pathsNames.indexOf(this.path) ? 'slide-previous' : 'slide'
      this.path = newPath
    },
    handleLinks (event) {
      event.stopPropagation()
      event.preventDefault()
      this.redirect(event.target.parentNode.pathname)
    }
  },

  async fetch ({ store }) {
    await store.dispatch('courses/paths')
    await store.dispatch('courses/getAllCourses')
  }
}
</script>

<style lang='stylus' scoped>
.container
  background-color #fff

.page-header
  max-height 92vh
  min-height 600px
  padding-bottom 50px
  margin-bottom 0
  align-items flex-end
  background-position center top
  align-items center
  padding-top 120px
  background-color #000008

  +desktop-up()
    padding-top 130px
    background-position top 30% center

  ::v-deep
    .wrapper
      align-content space-between
      height 100%

    +mobile-only()
      .title
        font-size: 40px

  @media screen and (min-width: 1800px)
    background-size auto 130%

.paths
  display flex
  justify-content center
  flex-wrap wrap
  margin-bottom  -1rem

  .button
    margin 0.5rem

    +tablet-up()
      margin 0.5rem

.group
  display flex
  justify-content center
  align-items center

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


.paths
  .button
    border-color: #028ebb;
    border-top-color: rgb(2, 142, 187);
    border-bottom-color: rgb(2, 142, 187);
    border-top: solid 1px rgba(3, 143, 188, 0.16);
    border-bottom: solid 1px rgba(46, 162, 200, 0.29);
    padding: 0 20px;

    &:hover
      background transparent
      color: #fff


    &.active
      background: #028ebb2e;
      box-shadow: inset 0px 9px 21px rgba(19, 183, 166, 0.1), 0px 0px 2px rgba(60,196,180,0.6);
      border-color: #028ebb;
      border-top-color: rgb(2, 142, 187);
      border-bottom-color: rgb(2, 142, 187);
      border-top: solid 1px #038fbcb8;
      text-shadow: 0px 0 3px #0a1121;
      border-bottom: solid 1px #038fbcb8;
</style>
