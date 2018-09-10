<template lang='pug'>
.card-body(v-if='resources.length' v-cloak)
  img.resource-icon(src='/images/folder-link-blue.svg')
  h3 Lesson Resource{{ resources.length > 1 ? 's' : '' }}

  ul.styled-list
    li(v-for='resource in resources' v-html='$md.render(resource[Object.keys(resource)[0]])')
</template>

<script>
export default {
  name: 'lesson-resources',

  props: {
    resources: {
      type: Array,
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

.resource-icon
  width 64px
  height 64px

h3
  color $secondary-color
  padding-top 0

  i
    font-size 0.8em
    margin-right 5px

.styled-list
  padding-top 0

.card >>>> a:hover
  color: $primary-color
</style>
