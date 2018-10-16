<template lang='pug'>
.page-header(:style='style')
  .wrapper
    h1.title {{ title }}
</template>

<script>
export default {
  name: 'page-header',
  props: ['title', 'background_image'],
  computed: {
    style () {
      return `background-image: ${this.background_image}`
    }
  }
}
</script>

<style lang='stylus' scoped>
.page-header
  height 220px
  display flex
  align-items center
  background-repeat no-repeat
  background-size cover

.title
  margin 0
  padding-top 0
  font-size 60px
  font-weight 600
  color #FFFFFF
  line-height 60px
</style>
