<template lang="pug">
div
  h2.title Playlist
  div.row(v-if="talks" v-cloak)
    .card(v-for="talk in talks")
      nuxt-link(:to="path(talk)")
        div(:class="{ 'comingsoon': !talk.isVideoLive }")
          img.card-img-top(v-bind:src="talk.image[0].url" :alt="talk.title")
        .card-body
          //- b.releaseDate {{ talk.releaseDate }}
          h3.title {{ talk.title }}
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

.row
  display flex
  flex-wrap wrap

.card
  width 22%
  margin-right 4%
  margin-bottom ($vertical-space/2)
  &:nth-of-type(4n+0)
    margin-right 0

.card-body .title
  padding-top 0

.author
  color: $gray

.media.-video.comingsoon
  &:before
  &:after
    content: none
</style>
