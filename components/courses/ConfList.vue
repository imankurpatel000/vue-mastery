<template lang="pug">
.playlist
  h2.title Playlist
  .cards(v-if="talks" v-cloak)
    //- nuxt-link.card(:to="path(talk)" v-for="talk in talks")
    .card(v-for="talk in talks")
      .card-header
        img.card-img(v-bind:src="talk.image[0].url"
                     :alt="talk.title"
                     :class="{ 'comingsoon': !talk.isVideoLive }")
        .card-title
          //- b.releaseDate {{ talk.releaseDate }}
          h4.title {{ talk.title }}
          p.author {{ talk.author }}
      p.content {{ talk.description }}
</template>

<script>
import fakeList from '~/components/courses/FakeList'

export default {
  props: ['talks', 'account'],

  components: {
    fakeList
  },

  methods: {
    path (talk) {
      // return `/courses/${talks.belongsToCourse[0].slug}/${talk.slug}`
      return '#'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables'
$headerHeight = 150px
$cardPadding = $vertical-space / 3
.playlist > .title
  margin: 15px 0 25px 0
  
  +tablet-up()
    margin-bottom: 35px

.cards
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr))
  grid-gap: 1rem

.card
  flex-direction: column
  margin: 0 0 $vertical-space/3 0
  overflow: hidden

  +laptop-up()
    margin-bottom ($vertical-space/2)

.card-img
  height $headerHeight
  width $headerHeight
  min-width $headerHeight
  object-fit contain

.card-header
  height $headerHeight
  display flex
  flex-direction: row-reverse
  justify-content: space-between

  +laptop-up()
    flex-direction row
    justify-content: flex-start
  
  .title
    color $secondary-color
    padding-top 0

.card-title
  flex-direction column
  justify-content center
  display flex
  padding $cardPadding

.author
  margin 0
  color: $gray

.content
  padding 10px $cardPadding

</style>
