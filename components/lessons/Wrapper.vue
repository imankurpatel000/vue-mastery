<template lang='pug'>
div
  .lesson-wrapper(
    v-if='course && ready'
    v-cloak
  )
    Header(:course='course')

    Video(
      :restricted='restricted'
      :current='current'
      :video ='lesson'
      :account='account'
      :url = 'baseUrl + current.slug'
      @videoEnded='finished'
      @completed='completed')

    List(
      :course='course'
      :current='page'
      :account='account'
      :completed-unlogged='completedUnlogged'
      :isLesson='isLesson'
      :is-course-completed='isCompleted'
      @redirect='redirect'
      @completed='showCongrat')

    Body(
      :restricted='restricted'
      :course='current'
      :lesson='lesson'
      :isLesson='isLesson')
      Profile(
        v-if='!isLesson'
        :current='current'
        v-cloak
      )

    SideBar(
      :account='account'
      :lesson='lesson'
      :course='course'
      :current='current'
      :isLesson='isLesson'
      :free='current.free'
      affixToElement='#lessonContent')

    Nav(v-if='current'
      :lessons='course.lessons'
      :selected='selected'
      :account='account'
      :type="isLesson ? 'lesson': 'talk'"
      @redirect='redirect'
    )

    Popup(@redirect='redirect')
    Congrats(:course='course')

  .container(v-else)
    .header.fake

    .video.fake
      PlayerPlaceholder

    .list.fake
      ul.list-unstyled
        each val in [1, 2, 3]
          li
            .media-block.fake
              .media.-small.fake
              .body.fake

    .content.fake
    .lesson-aside.fake
</template>

<script>
import Body from '~/components/lessons/Body'
import Challenges from '~/components/lessons/Challenges'
import Download from '~/components/lessons/Download'
import Header from '~/components/lessons/Header'
import List from '~/components/lessons/List'
import SideBar from '~/components/lessons/SideBar'
import Nav from '~/components/lessons/Navigation'
import Popup from '~/components/lessons/Popup'
import Resources from '~/components/lessons/Resources'
import SocialShare from '~/components/lessons/SocialSharing'
import Video from '~/components/lessons/Video'
import PlayerPlaceholder from '~/components/static/PlayerPlaceholder'
import DownloadButton from '~/components/static/DownloadButton'
import Congrats from '~/components/courses/Congrats'

export default {
  name: 'wrapper-lesson',

  props: {
    category: {
      type: String,
      required: true
    },
    page: {
      type: String,
      required: true
    },
    course: {
      type: Object,
      required: true
    },
    account: {
      type: Object
    },
    current: {
      type: Object,
      required: true
    },
    completedUnlogged: {
      type: Object,
      required: true
    },
    selected: {
      type: Number
    },
    isLesson: {
      type: Boolean,
      default: true
    },
    lesson: {
      type: Object
    },
    restricted: {
      type: Boolean,
      default: true
    }
  },

  components: {
    Header,
    Video,
    List,
    Body,
    Nav,
    SideBar,
    Resources,
    Challenges,
    Popup,
    SocialShare,
    Download,
    PlayerPlaceholder,
    DownloadButton,
    Congrats
  },

  data () {
    return {
      isCompleted: false,
      ready: false
    }
  },

  mounted () {
    if (this.account) {
      this.ready = true
    } else {
      setTimeout(() => {
        this.ready = true
      }, 2000)
    }
  },

  created () {
    this.$store.dispatch('courses/contentReady', { isReady: false })
  },

  computed: {
    baseUrl () {
      return `/${this.isLesson ? 'courses' : 'conferences'}/${this.category}/`
    }
  },

  methods: {
    redirect (slug) {
      this.$router.push(this.baseUrl + slug)
    },

    isCourseCompleted (slug) {
      if (this.course.completable && this.account && this.account.courses && this.account.courses[this.course.slug] && this.account.courses[this.course.slug].completedLessons) {
        let total = 0
        Object.entries(this.account.courses[this.course.slug].completedLessons).forEach(
          ([key, value]) => {
            if (slug && slug === key) total++
            else if (value) total++
          }
        )
        if (total >= this.course.lessonsCount) {
          return true
        }
      }
      return false
    },

    showCongrat (slug) {
      const showCongrats = this.isCourseCompleted(slug)
      if (showCongrats) {
        this.$modal.show('finish-course')
      }
      return !showCongrats
    },

    completed () {
      this.$store.dispatch('account/userUpdateCompleted', {
        courseSlug: this.category,
        lessonSlug: this.current.slug,
        isCompleted: true
      })
    },

    finished () {
      const next = this.course.lessons[this.selected + 1]
      const showNext = this.showCongrat()
      if (this.selected < this.course.lessons.length - 1 && showNext && next.status === 'published') {
        this.$modal.show('next-lesson', {
          lesson: next,
          account: this.account,
          isLesson: this.isLesson
        })
      }
    }
  },

  watch: {
    account () {
      if (this.account) {
        this.isCompleted = this.isCourseCompleted()
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
.lesson-wrapper
  display grid
  grid-template-columns 1fr
  grid-template-areas 'header'\
                      'video'\
                      'list'\
                      'content'\
                      'sidebar'\
                      'footer'
  +laptop-up()
    grid-template-columns 1fr 1fr 30%
    grid-template-areas 'header  header  header'\
                        'video   video   list'\
                        'content content sidebar'\
                        'footer  footer  footer'
.lesson-header
  grid-area header

.lesson-content
  grid-area content

.lesson-aside
  grid-area sidebar
  padding 0 4%

  +laptop-up()
    padding 0 8%
    margin $vertical-space 0

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


.download
  color white
  text-align center
  align-items center
  background-image url(/images/bkg-cheatsheet-main.jpg)
  margin-bottom ($vertical-space/2)

  .button
    margin 0 auto
</style>