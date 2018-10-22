<template lang='pug'>
div
  .list(v-if='courses' v-cloak)
    nuxt-link.list-card(v-for='course, index in ordered'
                        :key='index'
                        :to='link(course)') 
      Card(:title='course.title'
          :badge='showBadge(course, account)'
          :content='course.description'
          :image_url='course.image[0].url')
        Upcoming(slot='upcoming'
                :course='course')
        CourseAction(slot='actions'
                    :course='course')
  FakeList(v-else)
</template>

<script>
import CourseList from '~/components/courses/List'
import CourseAction from '~/components/courses/Actions'
import FakeList from '~/components/courses/FakeList'
import Card from '~/components/ui/Card'
import Upcoming from '~/components/courses/Upcoming'

export default {
  name: 'courses-list',

  components: {
    CourseList,
    CourseAction,
    Card,
    Upcoming,
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

  data () {
    let ordered = []
    Object.values(this.courses)
      .sort((a, b) => {
        return a.order - b.order
      }).forEach((key) => {
        ordered.push(key)
      })
    return { ordered }
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
    },
    showBadge (course, account) {
      if ((course.free && !account) || (course.free && account && !account.subscribed)) return true
    }
  }
}
</script>

<style lang='stylus' scoped>
.content
  color: $gray

.list,
.list-unstyled
  > a
    margin-bottom 35px

.list-card
  display block
  margin-bottom 35px
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
