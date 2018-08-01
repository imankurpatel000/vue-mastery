<template lang='pug'>
.lesson-challenge.card-body
  img.challenge-icon(src='/images/keyboard-blue.svg')
  h3 Coding Challenge
  div(v-html='$md.render(challenges)')
</template>

<script>
export default {
  name: 'lesson-challenges',
  props: {
    challenges: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang='stylus' scoped>
.card-body
  display flex
  flex-flow column
  align-items center

  +laptop-up()
    align-items flex-start

.challenge-icon
  width 64px
  height 64px

h3
  color $secondary-color
  padding-top 0
  i
    font-size 0.8em
    margin-right 5px

.card >>>> a:hover
  color: $primary-color

</style>
