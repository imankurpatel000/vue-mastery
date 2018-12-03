<template lang='pug'>
  section
    .learning-path(v-if='courses' v-cloak)
      CourseCard(v-for='course, index in ordered'
          :key="'course-' + course.id"
          :course='course'
          :account='account')

    FakeList(v-else)
</template>

<script>
import CourseCard from '~/components/courses/Card'
import FakeList from '~/components/courses/FakeList'

export default {
  name: 'learning-path',
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
  components: {
    CourseCard,
    FakeList
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
  }
}
</script>

<style lang="stylus" scoped>
.learning-path
  display grid
  place-items center
</style>

