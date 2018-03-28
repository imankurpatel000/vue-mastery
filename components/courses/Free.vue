<template lang='pug'>
.section
  h2.title Free Lessons
  .media-wrapper(v-if='free' v-cloak)
    .media-block(v-for='lesson in free')
      nuxt-link(:to='path(lesson)')
        .media.-video
          img(:src='lesson.image[0].url' class='-large' :alt='lesson.title')

      .body
        nuxt-link(:to='path(lesson)' class='list-free -inverted')
          h3.title {{ lesson.title }}
          p.content {{ lesson.description }}

        nuxt-link(:to='path(lesson)' class='-inverted')
          div.meta
            b {{ lesson.belongsToCourse[0].title }}
            label.-has-icon
              span ・
              i.far.fa-clock
              | {{ lesson.duration | time }}

  .media-wrapper(v-else)
    FakeList

  nuxt-link.button.primary.border(to='/courses')
    | More
    span.visually-hidden Lessons

</template>

<script>
import FakeList from '~/components/courses/FakeList'

export default {
  name: 'courses-free',

  props: {
    free: {
      type: Array,
      required: false
    }
  },

  components: {
    FakeList
  },

  methods: {
    path (lesson) {
      return `/courses/${lesson.belongsToCourse[0].slug}/${lesson.slug}`
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~assets/css/_variables'

.section
  color #fff
  height: 100%

  > .title
    margin-bottom ($vertical-space/3)
    font-weight 600
    text-align center

    +tablet-up()
      text-align left
      font-size 40.5px

.title
  padding-top 0

.media-wrapper
  padding-top: 0

  .media-block
    padding: ($vertical-space/4) 0
    margin-bottom: ($vertical-space/4)

.media-block
  grid-template-columns auto 1fr
  grid-template-areas 'media body'

  .body
    text-align left

  .meta
    justify-content flex-start

</style>
