<template lang="pug">
div
  h2.title Playlist
  div.row(v-if="talks" v-cloak)
    .col(v-for="talk in talks")
      nuxt-link.card(:to="path(talk)")
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

.row
  display flex
  flex-wrap wrap

.col
  width 100%
  margin-bottom ($vertical-space/3)
  +tablet-up()
    width 48%
    margin-right 4%
    &:nth-of-type(2n+0)
      margin-right 0
  +laptop-up()
    width 23.333%
    margin-right 2%
    margin-bottom ($vertical-space/2)
    &:nth-of-type(2n+0)
      margin-right 2%
    &:nth-of-type(4n+0)
      margin-right 0

.card
  flex-flow column

.card-body .title
  color $secondary-color
  padding-top 0

.author
  margin-top 0
  color: $gray

</style>
