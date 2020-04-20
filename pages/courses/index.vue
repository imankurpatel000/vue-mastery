<template lang='pug'>
  .container
    PageHeader.static(
      title='Our Courses'
      background='/images/courses/hero_compressed.jpg'
      align='center'
    )
      .paths
        .group
          button.button.modern.-small(:class='this.path === "courses" ? "active" : "border"' @click='redirect("/courses")') Latest
          button.button.modern.-small(:class='this.path === "beginner" ? "active" : "border"' @click='redirect("/courses-path/beginner")') Beginner path
        .group
          button.button.modern.-small(:class='this.path === "intermediate" ? "active" : "border"' @click='redirect("/courses-path/intermediate")') Intermediate path
          button.button.modern.-small(:class='this.path === "advanced" ? "active" : "border"' @click='redirect("/courses-path/advanced")') Advanced path

    .courses-body.wrapper(ref='body')
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
          courses: Object.values(this.courses).reverse().filter((course) => { return course.lessonsCount > 0 }) // .sort((a, b) => a.order - b.order)
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
    scrollTop (height, behavior = 'smooth') {
      setTimeout(() => {
        document.getElementsByClassName('main')[0].scroll({
          top: height,
          behavior: behavior
        })
      }, 0)
    },
    redirect (path) {
      const index = this.pathsNames.indexOf(path)
      if (index === 0) path = '/courses'
      if (index > 0) path = '/courses-path/' + path
      history.pushState({}, null, path)
      const newPath = path.split('/').pop()
      this.slide = this.pathsNames.indexOf(newPath) > this.pathsNames.indexOf(this.path) ? 'slide-previous' : 'slide'
      this.path = newPath
      this.scrollTop(this.$refs.body.offsetTop)
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
.page-header
  max-height 92vh
  min-height 600px
  padding-bottom 50px
  margin-bottom 0
  align-items flex-end
  align-items center
  padding-top 120px
  background-color #000008
  background-position center top

  +desktop-up()
    padding-top 130px
    background-position top 30% center

  ::v-deep
    .wrapper
      align-content space-between
      height 100%

      &:before
        transform: translate3d(0, 6%, 0.4px) scale(0.8)
        +tablet-up()
          transform translate3d(0, 8%, 0.4px) scale(0.8)
        +desktop-up()
          transform translate3d(0, 15%, 0.4px) scale(0.8)

    +mobile-only()
      .title
        font-size 40px

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

.courses-body
  display grid
  width 100%
  grid-column-gap 4%
  grid-row-gap 45px
  padding-top ($vertical-space/2)
  padding-bottom ($vertical-space/2)
</style>