<template lang="pug">
  wrapper(
    :category = 'category'
    :page = 'page'
    :course = 'course'
    :account = 'account'
    :completedUnlogged = 'completedUnlogged'
    :current = 'current'
    :selected = 'selected'
    :lesson = 'lesson',
    :restricted = 'restricted',
    :isLesson = 'true')
</template>

<script>
import { mapState } from 'vuex'
import wrapper from '~/components/lessons/Wrapper'
import meta from '~/mixins/meta'

export default {
  name: 'page-lesson',

  middleware: 'anonymous',

  components: {
    wrapper
  },

  transition (from, to) {
    if (from && to) {
      const fromArray = from.path.split('/')
      const toArray = to.path.split('/')
      if (fromArray.length > 3 && toArray.length > 3) {
        return fromArray[2] === toArray[2] ? 'settings' : 'page'
      }
    }
    return 'page'
  },

  head () {
    const imageUrl = this.current.image ? this.current.image[0].url : ''
    return meta.get({
      categoryTitle: this.course.title,
      categorySlug: this.category,
      pageSlug: this.current.slug,
      pageTitle: this.current.title,
      description: this.current.description,
      category: 'courses',
      image: imageUrl,
      facebookImage: (this.current.facebookImage && this.current.facebookImage[0].url) || imageUrl,
      twitterImage: (this.current.twitterImage && this.current.twitterImage[0].url) || imageUrl,
      author: 'Adam Jahr'
    })
  },

  data () {
    return {
      category: this.$route.params.course,
      page: this.$route.params.lesson,
      selected: -1,
      restricted: true,
      current: {}
    }
  },

  watch: {
    account () {
      this.getContent()
    }
  },

  created () {
    if (this.course) this.getContent()
  },

  computed: {
    ...mapState({
      course: state => state.courses.course,
      lesson: state => state.courses.lesson,
      account: state => state.account.account,
      completedUnlogged: state => state.account.completedUnlogged
    })
  },

  methods: {
    getContent () {
      // If no lesson selected, get the first one of the course
      if (this.page === null) this.page = this.course.lessons[0].slug
      this.course.lessons.map((lesson, index) => {
        // Find the selected lesson in the list
        if (this.page === lesson.slug) {
          // Load the current lesson
          this.current = lesson
          // Keep track of lesson index for the carousel
          this.selected = index
        }
      })

      // Talk don't have the free option
      let restriction = this.current.free !== undefined ? !this.current.free : false
      // Check lessons restrictions
      if (restriction) restriction = this.account ? !this.account.subscribed : true
      else if (this.current.lock) restriction = !this.account
      this.restricted = restriction

      this.$store.dispatch('courses/getContent', {
        category: 'lessons',
        slug: this.page,
        restricted: this.restricted
      })
    }
  },

  async fetch ({ store, params }) {
    await store.dispatch('courses/getCourse', params.course)
  }
}
</script>
