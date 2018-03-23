<template lang="pug">
.lessons-list(v-if="course.lessons" v-cloak)
  h3.title Lessons
  .lessons-list-scroll
    .list-item(v-for="(lesson, index) in course.lessons"
               v-bind:class="[activeOrCompleted(lesson.slug), unloggedAndLock(lesson.lock)]"
               @click="selectLesson(lesson.slug)")
      .list-item-content
        h4.list-item-title {{ index + 1 }}. {{ lesson.title }}
        .list-item-meta
          div
            i.far.fa-clock
            span {{ lesson.duration | time}}
      .list-item-actions(@click.stop)
        i.fa.fa-lock
        label.checkmark
          input(type="checkbox" :checked="isCompleted(lesson.slug)" @change="toggleCompleted(lesson.slug)")
          span.check
    .list-subscribe(v-cloak v-if="account")
      courseSubscribe(:account="account" :slug="course.slug" message="Notify me when new lessons are available." v-cloak v-if="account")
</template>

<script>
import courseSubscribe from '~/components/account/CourseSubscribe'
export default {
  name: 'list',
  props: ['course', 'current', 'account', 'completedUnlogged'],
  components: {
    courseSubscribe
  },
  methods: {
    selectLesson (lessonSlug) {
      this.$emit('selectLesson', lessonSlug)
    },
    toggleCompleted (lessonSlug) {
      this.$store.dispatch('userUpdateCompleted', {
        lessonSlug: lessonSlug,
        courseSlug: this.course.slug,
        isCompleted: !this.isCompleted(lessonSlug)
      })
      if (!this.account) {
        this.$modal.show('login-form', {
          newAccount: true,
          location: 'Lesson page checkbox'
        })
        return true
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
    unloggedAndLock (lock) {
      return !this.account && lock ? '-locked' : 'unlock'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables'

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
  +tablet-up()
    min-height 200px
    overflow-y scroll
    position absolute
    top 60px
    bottom 0
    top headerHeight
    height "calc(100% - %s)" % headerHeight

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
    &:not([class*="active"]) .list-item-title
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
.list-item:not([class*="active"]),
.list-subscribe
  border-bottom: 1px solid #CACACA

</style>
