<template lang="pug">
  li
    h4 {{ question }}
    p {{ answer }}
</template>

<script>
export default {
  name: 'faq-block',
  props: {
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang='stylus' scoped>
li > p
  font-size 1.1em
  font-style italic
  padding-left: $size.by-1
  border-left solid 2px $primary-color
</style>
