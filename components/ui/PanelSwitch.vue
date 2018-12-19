<template lang="pug">
  section
    .panel-switch(ref="panelSwitch")
      router-link.button(v-for="panel in panels"
        :class="[$route.params.id === undefined && panel.title === 'Personal' ? 'nuxt-link-active' : '']"
        :key='panel.title'
        v-if="panel.title"
        :to="'/pricing/'+panel.title.toLowerCase()") {{ panel.title }}
      .indicator
    
    .panels
      slot
</template>

<script>
import Icon from '~/components/ui/Icon.vue'
export default {
  name: 'panel-switch',

  components: {
    Icon
  },

  data () {
    return {
      panels: []
    }
  },

  created () {
    this.panels = this.$children
  }
}
</script>

<style lang="stylus" scoped>
.panel-switch
  display flex
  position relative
  max-width 495px
  padding 0
  margin: $size.by-1 auto
  border-radius: 60px
  background lighten($gray, 90%)

  &:hover .button.nuxt-link-active:not(:hover)
    color $gray

  .button
    position relative
    padding 0
    margin 0
    text-align center
    border none
    background transparent
    width 33.333333333%
    z-index 1
    color $gray
    text-transform uppercase
    transition-duration 0.6s

    &:hover,
    &.nuxt-link-active
      color $white
      font-weight 600

w = 165px
.indicator
  position absolute
  left 0
  top 0
  height 100%
  background $primary-gradient
  z-index 0
  border-radius: 60px 
  transition-duration: 0.6s
  transition-timing-function cubic-bezier(0.68, -0.55, 0.265, 1.55)
  width: w

for i in (1..3)
  .button:nth-child({i}).nuxt-link-active ~ .indicator
    left: w*(i - 1)

  .button:nth-child({i}):hover ~ .indicator
    left: w*(i - 1) !important
</style>
