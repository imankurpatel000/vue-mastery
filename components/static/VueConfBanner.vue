<template lang="pug">
.banner
  .wrapper
    .vue-conf-info
      h2.title Learn from the experts. <br/> Watch the Vue Conference talks.
      p.lead We host 55 Vue talks from 3 different conferences free.
      div
        nuxt-link.button.secondary(to='/conferences') View All Talks
    .vue-conf-feature.text-center
      img.img-circle.img-200(src='/images/img-evan-you.jpg' alt="Founder of Vue.js, Evan You")
      p Watch the founder of Vue.js<br/> Evan You’s Keynote
      div
        nuxt-link.button.secondary.border.-has-icon(to='/conferences/vueconf-toronto-2018/vue-3-0-updates')
          Icon(name='play-circle')
          span Watch now

    img.vue-conf-buildings(src='/images/img-vueconf-buildings.svg')
</template>

<script>
import Icon from '~/components/ui/Icon'
export default {
  name: 'vue-conf-banner',
  components: { Icon }
}
</script>

<style lang="stylus" scoped>
.wrapper
  position relative
  align-items center
  grid-template-columns 1fr
  grid-template-areas 'info'\
                      'feature'
  +laptop-up()
    grid-template-columns 1fr 1fr
    grid-template-areas 'info feature'

.banner
  display flex
  justify-content: center
  position relative
  border-bottom: solid 4px $primary-color
  background-image url(/images/bkg-outline-mountains.svg)
  background-position center bottom
  background-size contain

  +laptop-up()
    height 500px
    background-size cover
    background-position center top

.vue-conf-info
  grid-area info
  text-align center
  padding ($vertical-space/3) 0

  +laptop-up()
    text-align left
    padding ($vertical-space/2) 0

.vue-conf-feature
  grid-area feature
  display flex
  flex-direction column
  align-items center
  padding ($vertical-space/2) 0
  margin-bottom ($vertical-space/2)

  +laptop-up()
    margin-bottom 0

.title
  color $secondary-color
  margin-bottom 0
  padding 0

.lead
  font-size 1.2em
  font-weight 400
  max-width 500px
  margin-left auto
  margin-right auto

  +tablet-up()
    font-size 20px

  +laptop-up()
    margin-left 0
    margin-right 0

.vue-conf-buildings
  position absolute
  width 92%
  margin 0 4%
  bottom 10px

  +laptop-up()
    left 4%
    margin 0
    width 50%

</style>
