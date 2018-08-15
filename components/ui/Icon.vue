<template lang="pug">
  svg(class="icon" v-bind="$props")
    use(v-bind="{'xlink:href':'/images/spr-'+type+'.svg#'+name}")
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: String,
    type: {
      type: String,
      default: 'feather'
    },
    width: {
      type: [Number, String],
      default: 24
    },
    height: {
      type: [Number, String],
      default: 24
    }
  }
}
</script>

<style lang="stylus" scoped>
.icon
  &[type='feather']
    stroke currentColor
    stroke-width 2
    stroke-linecap round
    stroke-linejoin round
    fill none
  &[type='social']
    fill currentColor
</style>
