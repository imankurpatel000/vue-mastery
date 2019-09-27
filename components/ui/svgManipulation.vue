<template lang='pug'>
  g(:style='style')
    slot
</template>

<script>
export default {
  name: 'difficulty-level',
  props: {
    speed: {
      type: Number
    },
    scrollY: {
      type: Number
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      x: 0,
      y: 0
    }
  },
  computed: {
    style () {
      const y = this.scrollY * this.speed / 100
      return `transform: translate3d(${this.isMobile ? '10%' : '0'},${y}px,0)`
    }
  }
}
</script>

<style lang="stylus" scoped>
  g
    transition-timing-function: ease
    // will-change: transform
</style>