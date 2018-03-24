<template lang="pug">
.playlist
  h2.title Playlist
  .cards(v-if="talks" v-cloak)
    //- nuxt-link.card(:to="path(talk)" v-for="talk in talks")
    .card(v-for="talk in talks")
      .card-img-fade(:class="{ 'comingsoon': !talk.isVideoLive }")
        img.card-img-top(v-bind:src="talk.image[0].url" :alt="talk.title")
      .card-body
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
.playlist > .title
  margin: 15px 0 25px 0
  
  +tablet-up()
    margin-bottom: 35px

.cards
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))
  grid-gap: 1rem

.card
  flex-direction: column
  margin: 0 0 $vertical-space/3 0

  +laptop-up()
    margin-bottom ($vertical-space/2)

// TODO: @Dustin Maybe we should fix a max height for mobile
// .card-img-top
//   max-height: 310px
//   object-fit: cover

.card-body .title
  color $secondary-color
  padding-top 0

.author
  margin-top 0
  color: $gray

</style>
