<template lang='pug'>
div
  h2.title Latest Free Videos
  nuxt-link(v-for='lesson in latests'
            :key='lesson.id'
            :to='link(lesson)')
    .media-block
      .media.-video
        img(:src='lesson.image[0].url' :alt='lesson.title')
      .body
        h4.title-small {{ lesson.title }}
        .meta
          b {{ lessonsCourse(lesson) }}
        .meta
          label.-has-icon
            i.far.fa-clock
            | {{ lesson.duration | time }}
</template>

<script>

export default {
  name: 'courses-latest',

  props: {
    latests: {
      type: Array,
      required: true
    },
    courses: {
      type: Object,
      required: false
    }
  },

  methods: {
    link (lesson) {
      if (this.courses) {
        const course = this.courses[lesson.belongsToCourse]
        return `/courses/${course.slug}/${lesson.slug}`
      }
      return '#'
    },

    lessonsCourse (lesson) {
      if (this.courses) {
        const course = this.courses[lesson.belongsToCourse]
        return course.title
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~assets/css/_variables'

a:hover
  text-decoration none
  
.title
  color $primary-color
  font-weight 600
  margin-bottom: 22px
  padding-top 0

  +tablet-up()
    font-size 40.5px

.media-block
  grid-template-columns auto 1fr
  grid-template-areas 'media body'
  grid-row-gap ($vertical-space/2)
  margin-bottom ($vertical-space/4)
  border-bottom solid 1px #EEE
  padding-bottom ($vertical-space/4)

.body p
  margin 0

.media
  max-width 160px

.meta
  margin-bottom 10px

h4
  font-size 20px
  font-weight: 600
  color $secondary-color

</style>
