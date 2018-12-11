<template lang="pug">
  section
    ul.panel-switch
      li(v-for="panel in panels" 
        :class="{ 'is-active': panel.isActive }"
        :key="panel.title")
        a(href="#" @click.prevent='selectPanel(panel)') {{ panel.title }}
    
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
    console.log(this.$slots.default.map(vNode => vNode.componentInstance.$el))
    this.panels = this.$children
  },

  methods: {
    selectPanel (selectedPanel) {
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
  list-style-type none
  width 500px
  padding 0
  margin 0 auto

  li
    position relative
    padding 0
    margin 0
    text-align center
    background tomato
    flex-grow 1
</style>
