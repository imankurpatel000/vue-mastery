<template lang='pug'>
.playlist
  h2.title Playlist
  .cards(v-if='talks' v-cloak)
    nuxt-link.card(v-for='talk in talks'
                   :key='talk.slug'
                   :to='path(talk)'
                   :class="{ 'comingsoon': !talk.isVideoLive }")
      .card-header
        img.card-img(:src='talk.image[0].url'
                     :alt='talk.title')
        .card-title
          //- b.releaseDate {{ talk.releaseDate }}
          h4.title {{ talk.title }}
          p.author {{ talk.author }}
      p.content {{ talk.description }}
</template>

<script>
export default {
  name: 'conference-list',

  props: {
    account: {
      type: Object,
      required: false
    },
    talks: {
      type: Array,
      required: true
    },
    conference: {
      type: String,
      required: true
    }
  },

  methods: {
    path (talk) {
      return talk.isVideoLive ? `/conferences/${this.conference}/${talk.slug}` : '#'
    }
  }
}
</script>

<style lang='stylus' scoped>
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

.comingsoon
  pointer-events: none
  cursor: not-allowed
</style>
