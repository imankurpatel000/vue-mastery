<template lang='pug'>
.page-header(:style='style')
  .wrapper(:style='scrollingBackground')
    h2.title {{ title }}
    h3.title2 {{ title2 }}
    slot
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
    scroll: {
      type: Boolean,
      default: true
    },
    align: {
      type: String,
      default: 'left'
    }
  },
  computed: {
    style () {
      const style = {
        textAlign: this.align
      }
      if (!this.scroll && this.background_image) {
        style.backgroundImage = `url(${this.background_image})`
      }
      return style
    },
    scrollingBackground () {
      if (this.scroll && this.background_image) {
        return {
          '--backgroundImage': `url(${this.background_image})`
        }
      }
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
  background-attachment fixed
  background-position center
  overflow hidden

  &.static
    background-attachment initial

.wrapper
  z-index 1

  &::before
    content ''
    position absolute
    background-image var(--backgroundImage)
    background-size cover
    background-position center bottom
    background-repeat no-repeat
    z-index -1
    transform translate3d(0,0,-1px) scale(2.2)
    top 0
    right 0
    bottom -1px // Remove bottom artfacts
    left -4px // Remove bottom artfacts

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
