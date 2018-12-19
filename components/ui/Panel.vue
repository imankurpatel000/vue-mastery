<template lang="pug">
.panel
  slot
</template>

<script>
export default {
  name: 'panel',

  props: {
    title: {
      type: String,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      isActive: false
    }
  },

  mounted () {
    this.isActive = this.selected
  }
}
</script>

<style lang="stylus" scoped>
.panel
  display flex
  justify-content space-evenly
  flex-wrap wrap
  padding: $size.by-2 0
</style>
