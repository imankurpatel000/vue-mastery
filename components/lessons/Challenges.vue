<template lang='pug'>
.lesson-challenge.card-body
  h3
    i.fa.fa-code
    | Coding Challenge
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
.card
  padding 20px
h3
  padding-top 0
  i
    font-size 0.8em
    margin-right 5px

.card >>>> a:hover
  color: $primary-color

</style>
