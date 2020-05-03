<template lang='pug'>
  section
    .learning-path(v-if='parts' v-cloak)
      .part(v-for='part, indexPart in parts')
        transition(:name='slide' appear mode='out-in' tag='div')
          .intro-part(
            v-html='part.intro'
            :key='part.intro'
            :class='{"text": (indexPart > 0) && !(indexPart % 1) || path === "related" }'
            @click='$emit("handleLinks", $event)'
          )

        transition-group(:name='slide' :style='{ "--total": part.courses.length }' appear mode='out-in')
          CourseCard(
            v-for='course, index in part.courses'
            :style='{"--i": index}'
            :key="path + '-course-' + course.id"
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
    },
    slide: {
      type: String,
      default: 'slide'
    },
    path: {
      type: String
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
  +desktop-up()
    max-width 900px

  > .intro-part
    margin-bottom 1rem

.intro-part
  padding 0 1rem 1rem 1rem
  text-align center

  +tablet-up()
    padding 0 2rem 2rem 2rem

  ::v-deep p
    margin 0 auto
    max-width 900px
    display initial

    +desktop-up()
      display block

.text
  color #3d2c61
  background linear-gradient(to top right, rgba(61, 44, 97, 0.1), rgba(131, 94, 194, 0.11))
  border-radius 1rem
  margin-top 4rem
  margin-bottom 2rem
  padding 1rem

  +tablet-up()
    padding 2rem

.slide-previous,
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
    
.slide-previous
  &-enter,
  &-leave-to
    transform translate3d(30px, 0, 0)

  &-leave-to
    transform translate3d(-50px, 0, 0)
</style>

