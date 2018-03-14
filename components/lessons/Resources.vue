<template lang="pug">
  .card(v-if="resources && resources.length" v-cloak)
    h3
      i.fa.fa-folder-open
      | Lesson Resource{{ resources.length > 1 ? 's' : '' }}
    ul.styled-list
      li(v-for="resource in resources" v-html="$md.render(resource[Object.keys(resource)[0]])")
</template>

<script>
export default {
  name: 'resources',
  props: ['resources']
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
