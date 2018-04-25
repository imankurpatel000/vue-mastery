<template lang='pug'>
  .lesson-content(:class="locked ? '-locked': 'unlock'")
    div
      h1.title {{ course.title}}
      slot
      .lesson-body(v-html='body')

    .lesson-locked(v-if='locked' v-cloak)
      Unlock(:free='free')
</template>

<script>
import Unlock from '~/components/lessons/Unlock'

export default {
  name: 'lesson-content',

  props: {
    course: {
      type: Object,
      required: true
    },
    locked: {
      type: Boolean,
      default: false
    },
    free: {
      type: Boolean,
      default: false
    }
  },

  components: {
    Unlock
  },

  computed: {
    body () {
      let text = this.course.markdown
      if (this.locked) {
        text = text.slice(0, 400) + '...'
      }
      return this.$md.render(text)
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~assets/css/_variables'

.lesson-content
  display flex
  flex-direction column
  align-items center
  padding 0 4%
  margin ($vertical-space/3) 0

  +tablet-up()
    margin $vertical-space 0

  .title
    padding-top 0

  &.-locked
    position relative

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
