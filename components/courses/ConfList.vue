<template lang="pug">
.section
  h2.title Playlist
  .media-wrapper(v-if="talks" v-cloak)
    .media-block(v-for="talk in talks")
      nuxt-link(:to="path(talk)")
        .media.-video(:class="{ 'comingsoon': !talk.isVideoLive }")
          img(v-bind:src="talk.image[0].url" class="-large" :alt="talk.title")
        .body
          b.releaseDate(v-if="talk.showRelease" v-cloak)
            | To be released on {{ talk.releaseDate | moment('MMMM Do YYYY @ hA z')}}
          h3.title {{ talk.title }}
          h4.author {{ talk.author }}
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
.media.-video.comingsoon
  &:before
  &:after
    content: none
</style>
