<template lang='pug'>
nuxt-link.course-card(:to='linkTo()')
  CourseBadge(:imageUrl='course.image[0].url'
    :account='account'
    :unavailable='isComingSoon'
    :percentProgress='percentProgress')

  div.course-heading
    label.free-label(v-if='isFreeCourse' cloak) Free Course
    label.free-label(v-else-if='isComingSoon' cloak) Lessons coming soon
    label.free-label(v-else-if='hasUpcomingLessons' cloak) Releasing New Lessons Soon
    label.free-label(v-else-if='hasFreeLesson' cloak) Free Lesson Inside
    h2.title {{ course.title }}

  ul.course-info
    li.info-item(v-if='hasLessons()' cloak) #[Icon(name='book')]
      span {{ inProgress || course.lessonsCount + ` lesson${course.lessonsCount > 1 ? 's' : ''}` | capitalize }}
    li.info-item(v-if="hasDuration()") #[Icon(name='clock')] {{ course.duration | timeToText}}
    li.info-item(v-if="course.difficulty") #[Difficulty(:level='course.difficulty')] {{ course.difficulty | capitalize }}

  p.course-content {{ course.description }}

  CoursePathActions(:course='course'
    v-if='isComingSoon' cloak)
</template>

<script>
import CourseBadge from '~/components/courses/Badge'
import CoursePathActions from '~/components/courses/ActionsLearningPath'
import Icon from '~/components/ui/Icon'
import Difficulty from '~/components/ui/Difficulty'
export default {
  name: 'course-card',
  props: {
    course: {
      type: Object,
      required: true
    },
    account: {
      type: Object,
      required: false
    }
  },
  components: {
    CourseBadge,
    CoursePathActions,
    Icon,
    Difficulty
  },
  computed: {
    isComingSoon () {
      return this.course.lessonsCount === 0
    },
    percentProgress () {
      if (this.userStartedCourse()) {
        return parseFloat((this.completedLessonslength() / this.course.lessonsCount).toFixed(2))
      }
    },
    inProgress () {
      let progression = 0
      // Check if user started the course
      if (this.userStartedCourse()) {
        progression = `${this.completedLessonslength()} / ${this.course.lessonsCount} completed`
      }
      return progression
    },

    isFreeCourse () {
      return this.showFreeLabel(this.course.free)
    },

    hasFreeLesson () {
      if (!this.hasLessons()) return

      let freeLessons = this.course.lessons.filter(lesson => lesson.free)
      if (freeLessons.length === 0) { // For some reason 0 evaluates to true.
        freeLessons = false
      }

      return (!this.showFreeLabel(this.course.free) && this.showFreeLabel(freeLessons))
    },
    hasUpcomingLessons () {
      if (!this.hasLessons()) return

      let draftLessons = this.course.lessons.filter(lesson => lesson.status === 'draft')

      if (draftLessons.length === 0) {
        draftLessons = false
      }
      return draftLessons
    }
  },
  methods: {
    userStartedCourse () {
      return this.account &&
        this.account.hasOwnProperty('courses') &&
        this.account.courses.hasOwnProperty(this.course.slug)
    },

    currentCourse () {
      return this.account.courses[this.course.slug]
    },

    completedLessonslength () {
      let lessonLength = 0
      if (this.currentCourse().hasOwnProperty('completedLessons')) {
        lessonLength = Object.values(this.currentCourse().completedLessons)
          .filter(completed => completed).length
      }
      if (lessonLength > this.course.lessonsCount) lessonLength = this.course.lessonsCount
      return lessonLength
    },

    hasLessons () {
      return (this.course.lessonsCount || this.course.lessons !== undefined)
    },

    hasDuration () {
      return this.course.duration
        .split(':')
        .reduce((prev, curr) => prev + parseInt(curr), 0)
    },

    showFreeLabel (type) {
      return (type && !this.account) ||
        (type && this.account && !this.account.subscribed)
    },

    linkTo () {
      // Check if there is lesson in the course
      if (this.hasLessons()) {
        let lessonSlug = this.course.lessons[0].slug
        try {
          // Get the lessons started
          let lessons = this.account.courses[this.course.slug].completedLessons
          let lastLessonFound = false
          // Get the last completed lesson
          for (let el of this.course.lessons) {
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
        return `/courses/${this.course.slug}/${lessonSlug}`
      }
      return ''
    }
  }
}
</script>

<style lang='stylus' scoped>
.course-card
  display grid
  box-sizing border-box
  position relative
  overflow hidden
  padding: $size.by-1
  margin-bottom: $size.by-1
  width 100%
  max-width 1000px
  box-shadow none
  border-radius: $size.by-1
  transform scale(1)
  transition all 0.2s
  grid-template-columns auto auto 1fr
  // grid-template-rows 1fr auto
  grid-column-gap: $size.by-0
  grid-template-areas 'course-heading course-heading'\
                      'course-info course-badge'\
                      'course-content course-content'

  +tablet-up()
    padding: $size.by-2
    grid-column-gap: $size.by-2
    grid-template-areas 'course-badge course-heading'\
                        'course-badge course-info'\
                        'course-badge course-content'
  +laptop-up()
    // grid-template-rows auto auto auto
    grid-template-areas 'course-badge course-heading course-heading'\
                        'course-badge course-info course-content'

  &:hover
    text-decoration none
    transform: scale(1.01)
    box-shadow: $shadow.depth-4

.course-heading
  grid-area course-heading
  align-self end

.free-label
  font-weight 700

.title
  padding-top: $size.by-0
  color $black

  +laptop-up()
    font-size: $size.by-3

.course-info
  grid-area course-info
  display flex
  flex-direction column
  padding: $size.by-0
  margin: $size.by-0
  color $black
  list-style-type none

  +tablet-up()
    flex-direction row

  +laptop-up()
    flex-direction column
    font-size 22px

  .info-item
    display flex
    margin-right: $size.by-1
    align-items center
    font-size 16px
    font-weight 600


    +laptop-up()
      font-size: $size.by-1
      margin-right: $size.by-0

    .icon
      margin-right: 9px

.course-content
  grid-area course-content
  color $black
  font-size 16px

  +tablet-up()
    margin: $size.by-0

</style>
