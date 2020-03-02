<template lang='pug'>
div
  .list(v-if='featured' v-cloak)
    nuxt-link.list-card(v-for='course, key in hardcodedCourses()'
                        v-if='course.lessons'
                        :key='key'
                        :to='link(course)')
      Card(:title='course.title'
          :badge='showBadge(course, account)'
          :content='course.description'
          :image_url='course.image[0].url')
      //- .card-body
        CourseList(:course='course' :account='account')
    .list-card.card.coming-soon(v-else)
      .card-body
        CourseList(:course='course' :account='account')

  FakeList(v-else)
</template>

<script>
import Card from '~/components/ui/Card'
import CourseList from '~/components/courses/List'
import FakeList from '~/components/courses/FakeList'

export default {
  name: 'courses-featured',

  props: {
    featured: {
      type: Object,
      required: false
    },
    account: {
      type: Object,
      required: false
    }
  },

  components: {
    Card,
    CourseList,
    FakeList
  },

  methods: {
    link (course) {
      return `/courses/${course.slug}/${course.lessons[0].slug}`
    },
    showBadge (course, account) {
      if ((course.free && !account) || (course.free && account && !account.subscribed)) return true
    },
    hardcodedCourses () {
      const courseIds = [1516789793545, 1569440715969, 1539806977174]
      return Object.values(this.featured).filter(
        function (course) {
          return courseIds.includes(course.id)
        }
      )
    }
  }
}
</script>

<style lang='stylus' scoped>
.list,
.list-unstyled
  > .list-card
    display block
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
