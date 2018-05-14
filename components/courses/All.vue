<template lang='pug'>
div
  .list(v-if='courses' v-cloak)
    nuxt-link.list-card.card(v-for='course, key, index in courses'
                             :key='course.id'
                             :to='link(course)')
      .card-body
        CourseList(:course='course' :account='account')
        CourseAction(:course='course')
  FakeList(v-else)
</template>

<script>
import CourseList from '~/components/courses/List'
import CourseAction from '~/components/courses/Actions'
import FakeList from '~/components/courses/FakeList'

export default {
  name: 'courses-list',

  components: {
    CourseList,
    CourseAction,
    FakeList
  },

  props: {
    account: {
      type: Object,
      required: false
    },
    courses: {
      type: Object,
      required: false
    }
  },

  methods: {
    link (course) {
      // Check if there is lesson in the course
      if (course.lessonsCount) {
        let lessonSlug = course.lessons[0].slug
        try {
          // Get the lessons started
          let lessons = this.account.courses[course.slug].completedLessons
          let lastLessonFound = false
          // Get the last completed lesson
          for (let el of course.lessons) {
            let key = el.slug
            if (lessons.hasOwnProperty(key) && lessons[key]) {
              lastLessonFound = true
              lessonSlug = key
            } else {
              // If there is lesson after the one completed, then redirect to the next one
              if (lastLessonFound === true && lessons[key].status === 'published') {
                lessonSlug = key
                lastLessonFound = false
              }
            }
          }
        } catch (error) {}
        // Transform to friendly url
        return `/courses/${course.slug}/${lessonSlug}`
      }
      return ''
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~assets/css/_variables'

.content
  color: $gray

.list,
.list-unstyled
  > a
    margin-bottom: 35px

.list-card
  color $black

  &:hover
    text-decoration none

.card-body
  display flex
  flex-direction column
  justify-content space-between
  cursor: pointer

  +tablet-up()
    flex-direction row

</style>
