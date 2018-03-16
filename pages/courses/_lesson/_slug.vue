<template lang='pug'>
div
  div(v-if='course'  v-cloak)
    .lesson-wrapper
      lessonHeader(:course='course')

      lessonVideo(v-if="current && !locked" :videoId = 'current.videoEmbedId' @videoEnded='lessonFinished' @lessonCompleted='lessonCompleted')
      .lesson-video.-locked(v-else :style="lockedStyle")
        unlock(:account='account')

      lessonsList(:course='course' :current='lessonSlug'  @selectLesson='selectLesson', :account='account', :completedUnlogged='completedUnlogged')

      lessonBody(:course='current' :locked='locked')

      aside.lesson-aside(v-if="!locked" v-cloak)
        div.control-group
          download(:courseLink='current.downloadLink', :account='account')
          socialShare(:lesson='current' :courseSlug='courseSlug')
        //- courseSubscribe
        lessonresources(:resources='current.resources')
        lessonChallenges(:challenges='current.codingChallenge')
        div.text-center
          a.button.primary.border(href="https://www.facebook.com/groups/152305585468331/") Discuss in our Facebook Group
          router-link.button.inverted.-small(to="/contact") Send us Feedback

      lessonNav(:lessons='course.lessons' :selected='selected' @selectLesson='selectLesson' v-if="current")

      lessonPopup(@selectLesson='selectLesson')

  .lesson-wrapper(v-else)
    .lesson-header.fake
    .lesson-video.fake
      playerPlaceholder
    .lessons-list.fake
      ul.list-unstyled
        each val in [1, 2, 3]
          li
            .media-block.fake
              .media.-small.fake
              .body.fake
    .lesson-content.fake
    .lesson-aside.fake
</template>

<script>
import { mapState } from 'vuex'
import lessonHeader from '~/components/lessons/Header'
import lessonVideo from '~/components/lessons/Video'
import lessonsList from '~/components/lessons/List'
import lessonBody from '~/components/lessons/Body'
import lessonNav from '~/components/lessons/Navigation'
import lessonresources from '~/components/lessons/resources'
import lessonChallenges from '~/components/lessons/Challenges'
import lessonPopup from '~/components/lessons/Popup'
import download from '~/components/lessons/Download'
import unlock from '~/components/lessons/Unlock'
import courseSubscribe from '~/components/account/CourseSubscribe'
import socialShare from '~/components/lessons/SocialSharing'
import playerPlaceholder from '~/components/static/PlayerPlaceholder'

export default {
  middleware: 'anonymous',
  head () {
    return {
      title: `${this.course.title}: ${this.current.title}`,
      meta: [{
        hid: `og:description`,
        name: 'description',
        content: this.current.description
      }, {
        hid: 'og:url',
        property: 'og:url',
        content: `${process.env.url}/${this.$route.params.lesson}/${this.$route.params.slug}`
      }, {
        hid: `og:title`,
        property: 'og:title',
        content: `${this.course.title}: ${this.current.title}`
      }, {
        hid: `og:image`,
        property: 'og:image',
        content: 'https://www.vuemastery.com/' + this.current.image[0].url
      }, {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: this.current.title
      }, {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: this.current.description
      }, {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://www.vuemastery.com/' + this.current.image[0].url
      }]
    }
  },

  data () {
    return {
      courseSlug: this.$route.params.lesson,
      lessonSlug: this.$route.params.slug,
      selected: null
    }
  },

  async fetch ({ store }) {
    await store.dispatch('getCourse', this.courseSlug)
  },

  components: {
    lessonHeader,
    lessonVideo,
    lessonsList,
    lessonBody,
    lessonNav,
    lessonresources,
    lessonChallenges,
    lessonPopup,
    socialShare,
    download,
    unlock,
    courseSubscribe,
    playerPlaceholder
  },

  computed: {
    ...mapState({
      course: result => result.courses.course,
      account: result => result.account.account,
      completedUnlogged: result => result.account.completedUnlogged
    }),

    current () {
      let currentLesson = null
      // If no lesson selected, get the first one of the course
      if (this.lessonSlug === null) this.lessonSlug = this.course.lessons[0].slug
      this.course.lessons.map((lesson, index) => {
        // Find the selected lesson in the list
        if (this.lessonSlug === lesson.slug) {
          // Load the current lesson
          currentLesson = lesson
          // Keep track of lesson index for the carousel
          this.selected = index
        }
      })
      return currentLesson
    },

    locked () {
      return this.current.lock && !this.account
    },

    lockedStyle () {
      return {
        backgroundImage: `url(${this.current.image[0].url})`
      }
    }
  },

  methods: {
    selectLesson (slug) {
      this.$router.push(`/courses/${this.courseSlug}/${slug}`)
    },

    lessonCompleted () {
      this.$store.dispatch('userUpdateCompleted', {
        lessonSlug: this.lessonSlug,
        courseSlug: this.courseSlug,
        isCompleted: true
      })
    },

    lessonFinished () {
      if (this.selected < this.course.lessons.length - 1) {
        this.$modal.show('next-lesson', {
          lesson: this.course.lessons[this.selected + 1],
          account: this.account
        })
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~assets/css/_variables'
.lesson-wrapper
  display grid
  grid-template-columns 1fr 1fr
  grid-template-areas 'header header'\
                      'video video'\
                      'list list'\
                      'content content'\
                      'sidebar sidebar'\
                      'footer footer'

.lesson-header
  grid-area header

.lesson-video
  grid-area video
  &.-locked
    position relative
    background $black
    width 100%
    height 300px
    background-size cover
    +tablet-up()
      height 500px

.lesson-content
  grid-area content

.lesson-aside
  grid-area sidebar
  padding 0 4%
  > div
    margin-bottom 20px

  .control-group
    justify-content center
    +laptop-up()
      justify-content space-evenly
    .button
      margin-right 4%
      +laptop-up()
        margin-right 0

.lessons-nav
  grid-area footer

// +tablet-up()
//   .lesson-wrapper
//     grid-template-columns 1fr 1fr 30%
//     grid-template-areas 'header header header'\
//                         'video video video'\
//                         'content content list'\
//                         'sidebar sidebar sidebar'\
//                         'footer footer footer'

  .lesson-aside
    margin $vertical-space 0
+laptop-up()
  .lesson-wrapper
    grid-template-columns 1fr 1fr 30%
    grid-template-areas 'header  header  header'\
                         'video   video   list'\
                         'content content sidebar'\
                         'footer  footer  footer'

  .lesson-aside
    padding 0 8%

</style>
