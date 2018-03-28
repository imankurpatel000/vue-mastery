<template lang='pug'>
.lesson-header
  .wrapper
    .media
      img(:src='course.image[0].url')

    .body
      h2.title {{ course.title }}
      
</template>

<script>
export default {
  name: 'lesson-header',

  props: {
    course: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~assets/css/_variables'

.wrapper
  color: #fff
  display flex
  align-items center
  height 90px

  +tablet-up()
    height 116px

.lesson-header
  background-color: #0A2B4E

.title
  margin 0
  padding 0
  font-weight 600
  font-size 34px

  +tablet-up()
    font-size 48px

.media
  margin-right 1.5em
  width 60px

  +tablet-up()
    width 90px

  img
    height: 90px
    overflow hidden
    object-fit contain

</style>
