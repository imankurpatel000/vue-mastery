<template lang='pug'>
.media-block
  .media
    img(:src='course.image[0].url' :alt='course.title')

  .body
    h3.title
      | {{ course.title }}
      span.badge.primary(v-if='course.free && !account || course.free && account && !account.subscribed') FREE
    p.content {{ course.description }}

    .meta(v-if='showDetail' v-cloak)
      div
        b {{ course.lessons.length | pluralizeLesson }}

      div
        span ・
        | {{ course.difficulty }}

      div.-has-icon(:aria-label='course.duration | time')
        span ・
        i.far.fa-clock
        | {{ course.duration | time }}

    .upcoming(v-if="$route.name === 'courses' && gotDraft")
      h5
        i.far.fa-calendar-alt &nbsp;
        | Upcoming lessons
      ul
        li(v-for='lesson in course.lessons' v-if='lesson.status === "draft"')
          | {{lesson.title}} - {{lesson.date | moment("MMMM D")}}
</template>

<script>
export default {
  name: 'course-list',

  props: {
    showDetail: {
      type: Boolean,
      default: false
    },
    course: {
      type: Object,
      required: true
    },
    account: {
      type: Object,
      required: false
    }
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
.media
  align-self start

  img
    +tablet-up()
      width: 120px
      height: 120px

.title
  position relative
  padding-top 0

.badge
  position relative
  top -2px
  margin-left 10px

.upcoming
  margin-top 10px

  i
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
