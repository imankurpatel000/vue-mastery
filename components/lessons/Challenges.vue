<template lang="pug">
  .lesson-challenge.card(v-if="challenges" v-cloak)
      h3 Coding Challenge
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

.card >>> a:hover
  color: $primary-color

</style>
