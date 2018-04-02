<template lang="pug">
  LessonWrapper(:category = 'category'
                :page = 'page'
                :course = 'course'
                :account = 'account'
                :completedUnlogged = 'completedUnlogged'
                :current = 'current'
                :selected = 'selected')
</template>


<script>
import { mapState } from 'vuex'
import LessonWrapper from '~/components/lessons/Wrapper'
import meta from '~/mixins/meta'

export default {
  name: 'page-lesson',
  middleware: 'anonymous',

  components: {
    LessonWrapper
  },

  head () {
    return meta.get({
      categoryTitle: this.course.title,
      categorySlug: this.category,
      pageSlug: this.current.slug,
      pageTitle: this.current.title,
      description: this.current.description,
      image: this.current.image[0].url
      // facebookImage: this.current.facebookImage[0].url,
      // twitterImage: this.current.twitterImage[0].url
    })
  },

  data () {
    return {
      category: this.$route.params.lesson,
      page: this.$route.params.slug,
      selected: -1
    }
  },

  computed: {
    ...mapState({
      course: result => result.courses.course,
      account: result => result.account.account,
      completedUnlogged: result => result.account.completedUnlogged
    }),

    current () {
      let currentPage = null
      // If no lesson selected, get the first one of the course
      if (this.page === null) this.page = this.course.lessons[0].slug
      this.course.lessons.map((lesson, index) => {
        // Find the selected lesson in the list
        if (this.page === lesson.slug) {
          // Load the current lesson
          currentPage = lesson
          // Keep track of lesson index for the carousel
          this.selected = index
        }
      })
      return currentPage
    }
  },

  async fetch ({ store }) {
    await store.dispatch('getCourse', this.category)
  }
}
</script>
