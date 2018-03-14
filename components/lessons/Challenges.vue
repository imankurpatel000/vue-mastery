<template lang="pug">
  .lesson-challenge.card(v-if="challenges" v-cloak)
      h3
        i.fab.fa-codepen
        | Coding Challenge
      div(v-html="$md.render(challenges)")
</template>

<script>
export default {
  name: 'challenges',
  props: ['challenges']
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables'
.card
  padding 40px
h3
  padding-top 0
  i
    font-size 0.8em
    margin-right 5px

.card >>> a:hover
  color: $primary-color

</style>
