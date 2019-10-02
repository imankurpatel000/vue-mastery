<template lang='pug'>
  g(ref='g')
    slot
</template>

<script>
import { TimelineMax } from 'gsap'

export default {
  name: 'difficulty-level',
  props: {
    speed: {
      type: Number
    },
    isMobile: {
      type: Boolean,
      default: false
    },
    progress: {
      type: Number
    }
  },
  data () {
    return {
      timeline: null
    }
  },
  mounted () {
    const { g } = this.$refs
    this.timeline = new TimelineMax({ paused: true })
      .to(g, 1, { y: window.innerHeight * this.speed / 100 })
  },
  watch: {
    progress (newVal) {
      if (this.timeline) {
        let progress = this.timeline.progress()
        // ease can be anything from 0.5 to 0.01
        progress += (newVal - progress) * 0.5
        this.timeline.progress(progress)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  g
    transition-timing-function: ease
    // will-change: transform
</style>