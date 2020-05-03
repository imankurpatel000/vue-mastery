<template lang='pug'>
section
  | Redirecting...
</template>

<script>
import { mapState } from 'vuex'
import meta from '~/mixins/meta'

export default {
  name: 'courses',

  head () {
    const imageUrl = this.course.image ? this.course.image[0].url : ''
    return meta.get({
      categoryTitle: this.course.title,
      categorySlug: this.category,
      pageSlug: this.course.slug,
      pageTitle: this.course.title,
      description: this.course.description,
      category: 'courses',
      image: imageUrl,
      facebookImage: (this.course.facebookImage && this.course.facebookImage[0].url) || imageUrl,
      twitterImage: (this.course.twitterImage && this.course.twitterImage[0].url) || imageUrl,
      author: this.course.author || 'Adam Jahr',
      robots: 'noindex'
    })
  },

  computed: {
    ...mapState({
      course: result => result.courses.course,
      account: result => result.account.account,
      completedUnlogged: result => result.account.completedUnlogged
    })
  },

  async fetch ({ store, params }) {
    await store.dispatch('courses/getCourse', params.course)
  },

  mounted () {
    if (this.course.lessonsCount) {
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
      this.$router.push(`/courses/${this.course.slug}/${lessonSlug}`)
    }
  }
}
</script>

<style lang='stylus' scoped>
  section
    display flex
    text-align center
    min-height 500px
    justify-content center
    padding 5rem
</style>
