<template lang='pug'>
  #lessonContent.lesson-content(:class="restricted ? '-locked' : 'unlock'")
    div
      h1.title {{ course.title }}

      Profile(:current='current' v-if='!isLesson' v-cloak)

      .lesson-body(v-html = 'body')

    .lesson-locked(v-if = 'restricted' v-cloak)
      Unlock(:free='course.free')
</template>

<script>
import Unlock from '~/components/lessons/Unlock'
import Profile from '~/components/lessons/Profile'

export default {
  name: 'lesson-content',

  props: {
    course: {
      type: Object,
      required: true
    },
    lesson: {
      type: Object,
      required: false
    },
    isLesson: {
      type: Boolean,
      default: true
    },
    restricted: {
      type: Boolean,
      default: true
    }
  },

  components: {
    Profile,
    Unlock
  },

  computed: {
    body () {
      if (this.course.hasOwnProperty('description')) {
        return this.$md.render(
          this.lesson ? this.lesson.markdown : this.course.description
        )
      } else {
        return 'Loading'
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
.lesson-content
  position relative
  display flex
  flex-direction column
  align-items left
  padding 0 4%
  min-height 500px
  margin ($vertical-space/3) 0

  +tablet-up()
    margin $vertical-space 0

  .title
    padding-top 0

  &.-locked
    .lesson-locked
      display flex

    h2
      opacity 0.5

    .lesson-body
      opacity 0.5
      position relative
      height 300px
      overflow hidden

      &:after
        content ''
        position absolute
        left 0
        right 0
        bottom 0
        height 220px
        background linear-gradient(to top,
                    rgba(255,255,255,1),
                    rgba(255,255,255,0.6),
                    rgba(255,255,255,0))

.lesson-body
  max-width 900px
  font-size 16px

  +tablet-up()
    font-size 22px
</style>
