<template lang='pug'>
  .container
    PageHeader(title='' background_image='/images/courses/courses.png')

    .courses-body.wrapper
      .courses-header
        h1.title Our Courses
        .paths
          button.button.secondary.border.-small(:class='{active: this.path === "courses"}' @click='redirect("/courses")') Latest
          button.button.secondary.border.-small(:class='{active: this.path === "beginner"}' @click='redirect("/courses-path/beginner")') Beginner
          button.button.secondary.border.-small(:class='{active: this.path === "intermediate"}' @click='redirect("/courses-path/intermediate")') Intermediate
          button.button.secondary.border.-small(:class='{active: this.path === "advanced"}' @click='redirect("/courses-path/advanced")') Advanced

      LearningPath(
        :parts='ordered'
        :account='account'
      )

    Nav(v-if='this.path'
      :lessons='pathsNames'
      :selected='pathsNames.indexOf(this.path)'
      :account='account'
      type="path"
      @redirect='redirect'
    )

    CheatSheetAlt(location='Course page cheat sheet download')
</template>

<script>
import { mapState } from 'vuex'

import LearningPath from '~/components/courses/LearningPath'
import CheatSheetAlt from '~/components/static/CheatSheetAlt'
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
    CheatSheetAlt,
    VueConfBanner,
    Nav
  },

  data () {
    return {
      path: this.$route.name,
      pathsNames: ['courses', 'beginner', 'intermediate', 'advanced']
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
          courses: Object.values(this.courses).sort((a, b) => a.order - b.order)
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
      this.path = path.split('/').pop()
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
  // height 466px
  // padding-bottom 50px
  // align-items: flex-end
  // background-size auto 200%

  // ::v-deep .title
  //   +mobile-only()
  //     text-align center

  background-position center
  background-size auto 100%
  background-color #14030b;

  // @media screen and (min-width: 1800px)
  //  background-size cover

.courses-header
  width 100%
  max-width 1000px
  margin 0 auto

  .title
    padding 0

    +laptop-up()
      margin 0

  +laptop-up()
    display flex
    justify-content space-between
    align-items center

.paths
  .button:not(:last-child)
    margin-right 0.5rem

    +tablet-up()
      margin-right 1rem

.courses-body
  display grid
  width 100%
  grid-column-gap 4%
  grid-row-gap 45px
  padding-top ($vertical-space/2)
  padding-bottom ($vertical-space/2)
</style>
