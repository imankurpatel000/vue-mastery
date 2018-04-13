<template lang='pug'>
div
  .list(v-if='featured' v-cloak)
    nuxt-link.list-card.card(v-for='course, key in featured'
                             v-if='course.lessons'
                             :key='key'
                             :to='link(course)')
      .card-body
        CourseList(:course='course')
    .list-card.card.coming-soon(v-else)
      .card-body
        CourseList(:course='course')

  FakeList(v-else)
</template>

<script>
import CourseList from '~/components/courses/List'
import FakeList from '~/components/courses/FakeList'

export default {
  name: 'courses-featured',

  props: {
    featured: {
      type: Array,
      required: false
    }
  },

  components: {
    CourseList,
    FakeList
  },

  methods: {
    link (course) {
      return `/courses/${course.slug}/${course.lessons[0].slug}`
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~assets/css/_variables'

.list,
.list-unstyled
  > .list-card
    color: $black
    margin-bottom: 35px
    text-decoration none

.card-body
  display flex
  flex-direction column
  justify-content space-between
  cursor: pointer

  +tablet-up()
    flex-direction row

.coming-soon
  position relative
  overflow hidden

  &:after
    content 'Coming soon'
    position absolute
    top 25px
    right -40px
    width 300px
    height 50px
    transform rotate(33deg)
    background linear-gradient(to top right, #41B782 , #86D169)
    line-height 50px
    text-indent 120px
    font-weight 600
    color #fff

  .media-block
    opacity 0.4
</style>
