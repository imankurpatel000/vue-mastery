<template lang='pug'>
  .banner
    .wrapper
      .body
        h1.title The ultimate learning resource for Vue developers
        p.lead Weekly Vue.js tutorials to guide your journey to Mastery.

      .video
        .video-wrapper
          iframe(src='https://player.vimeo.com/video/266753814' width='640' height='360' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen)
        //- vimeo-player(ref='player' video-id='266753814' player-width='800')

      .actions
        nuxt-link.button.inverted(to='/courses') VIEW COURSES
        nuxt-link.button.secondary(to='/prices') SUBSCRIBE
</template>

<script>
import PlayerPlaceholder from '~/components/static/PlayerPlaceholder'

export default {
  name: 'hero-banner',

  components: {
    PlayerPlaceholder
  }
}
</script>

<style lang='stylus' scoped>
.wrapper
  grid-row-gap 20px
  margin-top -($header-height)
  padding-top ($header-height + $vertical-space/2.5)
  padding-bottom ($vertical-space/2.5)

  +desktop-up()
    padding-top ($header-height + $vertical-space/1.5)
    padding-bottom ($vertical-space/1.5)

.banner
  background-image url(/images/hero-1.svg)
  background-position center top
  background-size cover

  +laptop-up()
    background-position 75% top
    background-size 225%

  +desktop-up()
    background-size cover

.body
  display grid
  justify-content center
  align-items center
  text-align center

.title
  padding-top 0
  max-width 800px
  margin 0
  color $secondary-color

  +tablet-up()
    font-size 56px

.lead
  font-size 18px
  color $gray

  +laptop-up()
    font-size: 24px

.actions
  display flex
  justify-content center
  .button
    margin-right 10px

.video
  +tablet-up()
    width 600px
    margin 0 auto

  +laptop-up()
    width 800px

</style>
