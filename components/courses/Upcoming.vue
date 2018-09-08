<template lang='pug'>
  .upcoming(v-if="$route.name === 'courses' && gotDraft")
    h5
      Icon(name="calendar")
      | Upcoming lessons
    ul
      li(v-for='lesson in course.lessons' v-if='lesson.status === "draft"')
        | {{lesson.title}} - {{lesson.date | moment("MMMM D")}}
</template>

<script>
import Icon from '~/components/ui/Icon.vue'
export default {
  name: 'upcoming-tree',
  props: ['course'],
  components: {
    Icon
  },
  computed: {
    gotDraft () {
      let draft = false
      if (this.course.lessons) {
        this.course.lessons.map((lesson) => {
          if (lesson.status === 'draft') draft = true
        })
      }
      return draft
    }
  }
}
</script>

<style lang='stylus' scoped>
.upcoming
  margin-top 10px

  h5
    display flex
    align-items center

  .icon
    margin-left -3px
    margin-right 6px
    color $primary-color

  ul
    position relative

    +tablet-up()
      &::before
        content ''
        position absolute
        left -12px
        top 0
        bottom 30px
        width 1px
        background #CCC

    li
      position relative
      list-style-type none

      +tablet-up()
        &::before
          content ''
          position absolute
          top 10px
          width 20px
          height 1px
          background #CCC
          left -31px
</style>
