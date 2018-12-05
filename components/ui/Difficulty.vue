<template>
  <svg class='icon' viewBox="0 0 24 24" width="24" height="24">
    <line x1="6" y1="15" x2="6" y2="19"></line>
    <line :stroke='stroke2' x1="12" y1="10" x2="12" y2="19"></line>
    <line :stroke='stroke3' x1="18" y1="5" x2="18" y2="19"></line>
  </svg>
</template>

<script>
export default {
  name: 'difficulty-level',
  props: {
    level: {
      type: String
    }
  },
  data () {
    return {
      beginner: this.level === 'beginner',
      intermediate: this.level === 'intermediate'
    }
  },
  computed: {
    stroke2 () {
      return this.beginner ? 'rgba(0, 0, 0, 0.2)' : ''
    },
    stroke3 () {
      return this.intermediate || this.beginner ? 'rgba(0, 0, 0, 0.2)' : ''
    }
  }
}
</script>


<style lang="stylus" scoped>
  .icon
    stroke $primary-color
    stroke-width 3
    stroke-linecap round
    stroke-linejoin round
    fill none
</style>

