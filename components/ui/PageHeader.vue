<template lang='pug'>
.page-header(:style='style'
  :class='{darken: hasBackgroundFade}')
  .wrapper
    h2.title {{ title }}
    h3.title2 {{ title2 }}
</template>

<script>
export default {
  name: 'page-header',
  props: {
    title: {
      type: String,
      required: true
    },
    title2: {
      type: String
    },
    background_image: {
      type: String,
      required: true
    },
    background_color: {
      type: String
    },
    align: {
      type: String,
      default: 'left'
    }
  },
  computed: {
    style () {
      let backgroundColor = (this.background_color) ? `, ${this.background_color}` : ''
      return {
        backgroundImage: `url(${this.background_image}) ${backgroundColor}`,
        textAlign: this.align
      }
    },
    hasBackgroundFade () {
      if (this.background_color === undefined || this.background_color === '') return true
    }
  }
}
</script>

<style lang='stylus' scoped>
.page-header
  position relative
  height 220px
  margin-bottom 20px
  display flex
  align-items center
  background-repeat no-repeat
  background-size cover

.darken::after
  content ''
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  background rgba(0,0,0,0.4)

.wrapper
  z-index 1
.title
  margin 0
  padding-top 0
  font-size 60px
  font-weight 600
  color #FFFFFF
  line-height 60px

.title2
  margin 0
  padding-top 0
  font-weight 600
  color #FFFFFF
</style>
