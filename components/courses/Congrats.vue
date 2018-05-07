<template lang="pug">
  .course-popper
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
}
</script>

<style lang="stylus" scoped>
.course-popper
  display flex
  justify-content center
  align-items flex-end
img
  width 25%
  height 25%
  margin 0 auto
</style>
