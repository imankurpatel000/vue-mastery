<template lang="pug">
  section(ref="panel" v-show="isActive" v-cloak)
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

