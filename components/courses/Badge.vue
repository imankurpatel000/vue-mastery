<template lang='pug'>
.course-badge(:class="{'coming-soon': unavailable }")
  .label(v-if='isNewCourse || hasNewLessons') New
  canvas(ref='canvas')
  img(:src="imageUrl")
</template>

<script>
export default {
  name: 'course-badge',
  props: {
    account: {
      type: Object
    },
    imageUrl: {
      type: String,
      required: true
    },
    unavailable: {
      type: Boolean
    },
    percentProgress: {
      type: Number
    }
  },
  data () {
    return {
      isInProgress: false,
      isNewCourse: false,
      hasNewLessons: false
    }
  },
  mounted () {
    this.evaluateProgress()
  },
  watch: {
    account: {
      handler: function (newVal) {
        if (newVal !== null) {
          this.evaluateProgress()
        }
      },
      deep: true
    }
  },
  methods: {
    evaluateProgress () {
      if (this.account && this.percentProgress !== 0) {
        this.isInProgress = true
        this.draw(180, 180)
      } else {
        this.isInProgress = false
      }
    },
    draw (width, height) {
      let cnvs = this.$refs.canvas
      let ctx = cnvs.getContext('2d')
      const centerX = width / 2
      const centerY = height / 2

      cnvs.width = width
      cnvs.height = height

      // Starts at x:x y:0
      let angleStart = Math.PI * 1.5

      const percentComplete = (num) => ((2 * num) - 0.5)
      let angle = Math.PI * percentComplete(this.percentProgress)
      // Start a new path
      ctx.beginPath()

      // Go to center of the Chart
      ctx.moveTo(centerX, centerY)

      // arc(centerX, centerY, radius, angleStart, angleEnd)
      ctx.arc(centerX, centerY, width / 2, angleStart, angle, true)

      // Draw a line to close the pie slice
      ctx.lineTo(centerX, centerY)

      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
      // Print the path
      ctx.fill()
    }
  }
}
</script>

<style lang='stylus' scoped>
.course-badge
  display flex
  align-self center
  justify-self center
  align-items center
  justify-content center
  grid-area course-badge
  position relative
  width: $size.by-5
  height: $size.by-5

  +tablet-up()
    width: $size.by-8
    height: $size.by-8

  +laptop-up()
    width: $size.by-10
    height: $size.by-10

  &.coming-soon::after
  &.coming-soon::before
    position absolute
    top 50%
    left 50%
    width: 110%
    height: $size.by-2

  &.coming-soon::before
    content ''
    height: 20px
    background: darken($states.warning, 30)
    transform translate(-50%, -32%)
    border-radius 6px
    z-index -1

    +tablet-up()
      height: $size.by-2
      border-radius 9px
    
  &.coming-soon::after
    content 'Coming soon'
    height: 22px
    text-align center
    font-weight 600
    text-transform uppercase
    color: darken($states.warning, 40)
    line-height: 22px
    background: $states.warning
    transform translate(-50%, -50%)
    border-top-left-radius 6px
    border-top-right-radius 6px

    +tablet-up()
      height: $size.by-2
      line-height: $size.by-2
      font-weight 700
      border-top-left-radius 9px
      border-top-right-radius 9px

  img
    width 99%

  canvas
    position absolute
    width 100%
    top 0
    left 0

// [Future feature]
.label
  position absolute
  top 0
  right -5%
  padding: 6px $size.by-1
  background: $states.error
  color $white
  text-transform uppercase
  font-weight 700
  box-shadow: $shadow.depth-1
  border-radius 20px
</style>
