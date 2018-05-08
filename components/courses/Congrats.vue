<template lang="pug">
no-ssr
  modal(name='finish-course' height='auto' @before-open='beforeOpen' @before-close="beforeClose")
    h3.form-title Congratulations
    .body
      p You have successfully completed the course.
      img(:src='course.image[0].url')
</template>

<script>
export default {
  name: 'course-congratulations',
  props: {
    course: {
      type: Object,
      required: true
    }
  },

  methods: {
    beforeOpen (event) {
      console.log(event)
      this.$confetti.start({shape: 'rect'})
    },
    beforeClose (event) {
      console.log(event)
      this.$confetti.stop()
    }
  }
}
</script>

<style lang="stylus" scoped>
.body
  display flex
  justify-content center
  align-items flex-end
img
  width 25%
  height 25%
  margin 0 auto
</style>
