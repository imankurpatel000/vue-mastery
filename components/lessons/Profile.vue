<template lang='pug'>
  .card-header
    img.card-img(:src='current.image[0].url'
                  :alt='current.title')
    .card-title
      h2.author {{ current.author }}
      time.date(v-if="current.presentedDate") Presented {{ current.presentedDate | dateFormat }}
</template>

<script>
export default {
  name: 'lesson-profile',

  props: {
    current: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang='stylus' scoped>
.card-header
  display: flex
  align-items: center

.card-img
  width: 90px
  height: 90px
  border-radius: 100%
  margin-right: 25px
  margin-top: 10px

.date
  color: $gray

.author
  font-size: 1.25em
</style>
