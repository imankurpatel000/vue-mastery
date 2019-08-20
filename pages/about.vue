<template lang='pug'>
.container
  .wrapper
    .mission-media
      .video-wrapper
        iframe(src='https://player.vimeo.com/video/257980016' width='640' height='360' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen)
      //- vimeo-player(ref='player' video-id='257980016' player-width='860')

    .mission
      h1.title Our Mission
      p To be the ultimate learning resource for Vue Developers. We do this by:
      ul
        li Creating weekly tutorials in video and article format.
        li Co-producing the Official Vue.js News.
        li Producing the Official Vue.js Podcast.
        li Paid subscriptions coming soon for exclusive content.
        li $5 of your monthly payment goes to the Vue Project.

      nuxt-link.button.secondary.border(to='/courses') View Our Courses

    .team-media
      img(src='/images/vue-mastery-team2.jpg' alt='Vue Mastery Team')

    .team
      h1.title About The Team
      p The Vue Mastery team is Gregg Pollack (Teacher), Adam Jahr (Teacher), Ben Hong (Teacher), Lauren Ramirez (Marketing), Pierre Schweiger (Development), and Melissa Koch (Legal &amp; Business).
      p  Gregg, Adam, Lauren, and Melissa are in Orlando, Ben is in Washington DC, and Pierre is in France.

      nuxt-link.button.secondary.border(to='/contact') Contact Us

    .why-media
      .video-wrapper
        iframe(src='https://player.vimeo.com/video/258154307' width='640' height='360' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen)
    .why
      h1.title Why Learn Vue?
      p We worked closely with the Vue Core team to produce this video which walks you through the core principles of this JS Framework.

      nuxt-link.button.secondary.border(to='/courses') Start Learning Now
  CheatSheetAlt(location='About-page cheat sheet download')
</template>

<script>
import CheatSheetAlt from '~/components/static/CheatSheetAlt'

export default {
  middleware: 'anonymous',
  head () {
    return {
      title: 'About Us | Vue Mastery',
      meta: [{
        hid: 'og:url',
        property: 'og:url',
        content: `${process.env.url}/about`
      }]
    }
  },
  components: {
    CheatSheetAlt
  }
}
</script>

<style lang='stylus' scoped>
build-grid-area(mission mission-media team-media team why why-media)

.wrapper
  margin-top: ($vertical-space / 4)
  margin-bottom: ($vertical-space / 4)
  grid-template-columns: 1fr
  grid-row-gap: ($vertical-space / 4)
  align-items: center
  grid-template-areas: 'mission-media' 'mission' 'team-media' 'team' 'why-media' 'why'

.title
  color: $primary-color
  font-weight: 600

  +tablet-up()
    font-size: 56px

ul
  list-style-type: disc
  padding-left: 25px
  padding-bottom: 30px
  line-height: 25px

+laptop-up()
  .wrapper
    margin-top: $vertical-space
    margin-bottom: $vertical-space
    grid-template-columns: 1fr 1fr
    grid-row-gap: $vertical-space * 1.5
    grid-column-gap: ($vertical-space / 2)
    align-items: center
    grid-template-areas: 'mission mission-media' 'team-media team' 'why why-media'
</style>
