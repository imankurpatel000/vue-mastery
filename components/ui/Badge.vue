<template lang='pug'>
  span.badge(:class='variant') {{ text }}
</template>

<script>
export default {
  name: 'badge',
  props: ['text', 'variant']
}
</script>

<style lang='stylus'>
.badge
  position relative
  top -2px
  margin-left 10px
</style>
