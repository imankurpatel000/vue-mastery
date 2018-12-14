<template lang="pug">
  section
    .panel-switch(ref="panelSwitch")
      .indicator(:style="indicatorPosition")
      button(v-for="panel in panels"
        :class="{ 'is-active': panel.isActive }"
        :key="panel.title"
        @click.prevent='selectPanel(panel)') {{ panel.title }}
    
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
      panels: [],
      indicatorPosition: {
        top: '0',
        left: '0',
        width: '33.333333333%'
      }
    }
  },

  created () {
    this.panels = this.$children
  },

  methods: {
    selectPanel (selectedPanel) {
      this.$emit('update:current', selectedPanel.title)

      this.indicatorPosition = {
        top: `${event.target.offsetTop - 18}px`,
        left: `${event.target.offsetLeft}px`,
        width: `${event.target.offsetWidth}px`
      }
      this.panels.forEach(panel => {
        panel.isActive = (panel.title === selectedPanel.title)
      })
    }
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

  button
    position relative
    padding 0
    margin-top: $size.by-1
    margin-bottom: $size.by-1
    text-align center
    border none
    background transparent
    width 33.333333333%
    z-index 1
    color $gray
    text-transform uppercase
    transition-duration 0.6s

    &.is-active
      color $white
      font-weight 600

.indicator
  position absolute
  left 0
  top 0
  height 100%
  background $primary-gradient
  z-index 1
  border-radius: 60px 
  transition-duration: 0.6s
  transition-timing-function cubic-bezier(0.68, -0.55, 0.265, 1.55)
</style>
