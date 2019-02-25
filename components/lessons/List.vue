<template lang='pug'>
.lessons-list(v-if='course.lessons' v-cloak)
  h3.title {{isLesson ? 'Lessons' : 'Talks'}}

  .lessons-list-scroll(ref="list")
    .list-item(v-for='(lesson, index) in course.lessons'
               v-if='lesson && isLesson || lesson && !lesson.lock'
               :class='[activeOrCompleted(lesson.slug), unloggedAndLock(lesson), notPublished(lesson)]'
               :ref='current === lesson.slug ? "active" : ""'
               @click='selectLesson(lesson.slug)')

      .list-item-content
        h4.list-item-title {{ index + 1 }}. {{ lesson.title }}
        .list-item-meta(v-if='lesson.status === "published" || lesson.isVideoLive === "true"')
          div(v-if='lesson.duration')
            i.far.fa-clock
            span {{ lesson.duration | time}}
          div(v-else)
            i.far.fa-user
            span {{ lesson.author}}
        .list-item-meta(v-else)
          | To be released on {{ (lesson.date || lesson.releaseDate)  | moment("MMMM D")}}

      .list-item-actions(@click.stop v-if='lesson.status === "published" || lesson.isVideoLive === "true"')
        i.fa.fa-lock
        label.checkmark
          input(type='checkbox'
                :checked='isCompleted(lesson.slug)'
                @change='toggleCompleted(lesson.slug)')
          span.check
      .list-item-actions(v-else)
        i.far.fa-calendar-alt

    .list-subscribe
      CourseSubscribe(v-if='!isCourseCompleted && !course.completable'
                      :account='account'
                      :slug='course.slug'
                      :message='message')

</template>

<script>
import CourseSubscribe from '~/components/account/CourseSubscribe'
export default {
  name: 'lessons-list',

  props: {
    account: {
      type: Object,
      required: false
    },
    course: {
      type: Object,
      required: true
    },
    current: {
      type: String,
      required: true
    },
    completedUnlogged: {
      type: Object,
      default: false
    },
    isLesson: {
      type: Boolean,
      default: true
    },
    isCourseCompleted: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      message: `Notify me when new ${this.isLesson ? 'lessons' : 'talks'} are available.`,
      initialScroll: true
    }
  },

  components: {
    CourseSubscribe
  },

  methods: {
    selectLesson (lessonSlug) {
      this.$emit('redirect', lessonSlug)
    },

    toggleCompleted (lessonSlug) {
      const isLessonCompleted = !this.isCompleted(lessonSlug)
      this.$store.dispatch('userUpdateCompleted', {
        lessonSlug: lessonSlug,
        courseSlug: this.course.slug,
        isCompleted: isLessonCompleted
      })
      if (!this.account) {
        this.$modal.show('login-form', {
          newAccount: true,
          location: 'Lesson page checkbox'
        })
        return true
      } else {
        // Check if all checkbox been completed
        if (isLessonCompleted) {
          this.$emit('completed', lessonSlug)
        }
      }
    },

    isCompleted (lessonSlug) {
      let completed = false
      let history = {}
      if (this.account) {
        if (this.account.hasOwnProperty('courses')) {
          history = this.account.courses
        }
      } else {
        history = this.completedUnlogged
      }

      const completedCourse = history[this.course.slug]

      if (completedCourse && completedCourse.hasOwnProperty('completedLessons')) {
        completed = history[this.course.slug].completedLessons[lessonSlug]
      }
      return completed
    },

    activeOrCompleted (lessonSlug) {
      return {
        active: this.current === lessonSlug,
        completed: this.isCompleted(lessonSlug)
      }
    },
    locked (lesson) { // Copied over logic from Wrapper
      if (lesson.free === false) {
        // FREEWEEKEND
        // return !this.account
        // NOT FREEWEEKEND
        return this.account ? !this.account.subscribed : true
      }
      if (lesson.lock) {
        return !this.account
      }
      return false
    },
    unloggedAndLock (lesson) {
      return this.locked(lesson) ? '-locked' : 'unlock'
    },

    // unloggedAndLock (lesson) {
    //   let isLocked = false
    //   if (lesson.free) {
    //     isLocked = lesson.lock && !this.account
    //   } else {
    //     isLocked = !this.account ? true : !this.account.subscribed
    //   }
    //   return isLocked ? '-locked' : 'unlock'
    // },

    notPublished (lesson) {
      return (lesson.status === 'published' || lesson.isVideoLive === 'true') ? '' : 'draft'
    },

    scrollToactive () {
      // Scroll to active element
      this.$refs.list.scrollTop = (this.$refs.active[0].offsetTop)
    }
  },

  mounted () {
    this.scrollToactive()
  },

  watch: {
    account () {
      if (this.initialScroll) {
        this.scrollToactive()
        this.initialScroll = false
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
headerHeight = 76px

.lessons-list
  grid-area list
  position relative
  min-height 260px
  overflow-y hidden
  background-color: #FFF
  border-bottom: solid 1px #CACACA
  border-left: solid 1px #CACACA

.lessons-list-scroll
  +laptop-up()
    min-height 200px
    overflow-y scroll
    position absolute
    top 60px
    bottom 0
    top headerHeight
    height 'calc(100% - %s)' % headerHeight
    width: 100%

.list-subscribe
  display flex
  align-items center
  cursor: pointer
  justify-content space-between
  padding 14px 24px
  background-color #fff

.list-item
  display flex
  align-items center
  cursor: pointer
  justify-content space-between
  padding 14px 24px
  background-color #fff

  .list-item-meta
    display flex
    align-items center
    color #A1B8BA

    i
      margin-right 8px

  &.active,
  &:hover
    background: linear-gradient(to right, #41B782 , #86D169)

    .list-item-title
      font-weight 600

    .list-item-meta
      color #C1FFC3

    .checkmark .check
      border-color $primary-color
      background-color #FFF

  &:hover:not(.active)
    .list-item-title
      color: #fff
      font-weight normal

  &.completed
    background-color #EBEBEB

    &:not([class*='active']) .list-item-title
      opacity 0.4

  &.-locked
    opacity 0.4

    &:hover
      background transparent

      .list-item-title
        font-weight normal
        color #A1B8BA

      .list-item-meta
        color #A1B8BA

    > .list-item-actions .checkmark
      display none

    > .list-item-actions .fa-lock
      display block

.list-item-title
  padding-top 0
  font-size 18px
  font-weight 400

  +laptop-up()
    font-size 24px

.list-item-actions
  margin-left 20px

  .fa-lock
    display none

.title
  display flex
  align-items center
  margin-bottom 0
  padding 0 24px
  height 60px
  color: $secondary-color

  +tablet-up()
    height headerHeight

.title,
.list-item:not([class*='active']),
.list-subscribe
  border-bottom: 1px solid #CACACA

.draft
  pointer-events: none

</style>
