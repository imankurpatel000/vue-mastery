<template lang="pug">
div.card.badge-card
  .card-body
    nuxt-link(v-for="course, key, index in courses"
              :key="course.id"
              :to="link(course)")
      .course-badge
        img(v-if="course" v-cloak
            :src="course.image[0].url")
</template>

<script>
export default {
  props: {
    account: {
      type: Object,
      required: false
    },
    courses: {
      type: Object,
      required: true
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
          // Get the last completed lesson
          for (let key in lessons) {
            if (lessons.hasOwnProperty(key) && lessons[key]) {
              if (course.lessons[key]) {
                lessonSlug = key
              } else {
                console.log('The last completed lesson doesn\'t belong to this course anymore')
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

<style lang="stylus" scoped>
  .course-badge
    width 30%
</style>
