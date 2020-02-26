<template lang='pug'>
  section
    .learning-path(v-if='parts' v-cloak)
      .part(v-for='part, indexPart in parts')
        transition(name='slide' appear mode='out-in')
          .intro-part(
            v-html='part.intro'
            :key='part.intro'
            :class='{"text": (indexPart > 0) && !(indexPart % 1) }'
          )

        transition-group(name='slide' :style='{ "--total": part.courses.length }' appear mode='out-in')
          CourseCard(
            v-for='course, index in part.courses'
            :style='{"--i": index}'
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
    parts: {
      type: Array,
      required: false
    }
  },
  components: {
    CourseCard,
    FakeList
  }
}
</script>

<style lang="stylus" scoped>
$timing = 500ms
.learning-path
  display grid
  place-items center

.part
  max-width 1000px

  > .intro-part
    margin-bottom 1rem

    +tablet-up()
      margin-bottom 2rem

.intro-part
  border-radius 1rem
  background #faf7a1
  color #5c5605
  padding 1rem

  +tablet-up()
    padding 2rem

  ::v-deep p
    margin 0

.slide
  &-move
    transition opacity 1s ease-in-out

  &-leave-active
    transition opacity $timing cubic-bezier(.5,0,.7,.4), transform $timing cubic-bezier(.5,0,.7,.4)

  &-enter-active
    transition opacity $timing cubic-bezier(.5,0,.7,.4), transform $timing ease-in-out
    transition-delay calc(0.1s * var(--i) + 0.5s)

  &-enter,
  &-leave-to
    opacity 0
    // filter: blur(5px)
    transform translate3d(-30px, 0, 0)

  &-leave-to
    transform translate3d(50px, 0, 0)
    
</style>

