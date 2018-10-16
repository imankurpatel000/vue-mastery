<template lang='pug'>
.playlist
  h2.title Playlist
  .cards(v-if='conference.talks' v-cloak)
    nuxt-link.card(v-for='talk in conference.talks'
                   v-if='talk && !talk.lightningTalks'
                   :key='talk.slug'
                   :to='path(talk)'
                   :class="{ 'coming-soon': talk.lock }")
      .card-header
        img.card-img(:src='talk.image[0].url'
                     :alt='talk.title')
        .card-title
          h4.title {{ talk.title }}
          label.underline.author {{ talk.author }}
      .content
        p.releaseDate(v-if="talk.showRelease")
          b To be released on:&nbsp;
          span {{ talk.releaseDate | moment("MMMM D, YYYY") }}
        p {{ talk.description }}

  div(v-if="gotLightningTalks()")
    h2 Lightning Talks
      ul.talks-list
        li.talk-item(v-for='talk in conference.talks'
                    v-if='talk && talk.lightningTalks'
                    :key='talk.slug')
          nuxt-link(:to='path(talk)')
            h4.talk-item-title {{ talk.title }}
            label.underline.lightning-author {{ talk.author }}
</template>

<script>
export default {
  name: 'conference-list',

  props: {
    account: {
      type: Object,
      required: false
    },
    conference: {
      type: Object,
      required: true
    }
  },

  methods: {
    path (talk) {
      return talk.lock ? '#' : `/conferences/${this.conference.slug}/${talk.slug}`
    },

    gotLightningTalks () {
      let gotLightning = false
      this.conference.talks.map((talk) => {
        if (talk.lightningTalks) {
          gotLightning = true
        }
      })
      return gotLightning
    }
  }
}
</script>

<style lang='stylus' scoped>
$headerHeight = 150px
$cardPadding = $vertical-space / 3

.playlist
  margin-bottom: ($vertical-space/2);

.playlist > .title
  margin: 15px 0 25px 0

  +tablet-up()
    margin-bottom: 35px

.cards
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))
  grid-gap: 1rem
  @media (min-width: 576px)
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr))

.card
  flex-direction: column
  margin: 0 0 $vertical-space/3 0
  overflow: hidden
  color $black

  &:hover
    text-decoration none

  +laptop-up()
    margin-bottom ($vertical-space/2)

  .author
    transition transform ease-out 200ms

  &:hover
    .author
      transform translateX(5px)

.card-img
  height $headerHeight
  width $headerHeight
  min-width $headerHeight
  object-fit contain

.card-header
  // height $headerHeight
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
  padding 0 $cardPadding

.author
  margin 0
  color $gray
  align-self left

  &:before
    z-index 0

.content
  padding 10px $cardPadding

.releaseDate
  font-style italic

.coming-soon
  pointer-events: none
  cursor: not-allowed
  position relative
  overflow hidden

  &:after
    content: 'Coming soon'
    position: absolute
    bottom: 0
    padding: 0px 23px
    border-radius: 9px 0 0 0
    right: 0
    height: 29px
    background: linear-gradient(to top right, #41b782, #86d169)
    font-weight: 600
    color: #fff
    font-size: 14px
    display: flex
    align-items: center

  .media-block
    opacity 0.4

.talks-list
  display flex
  flex-wrap wrap
  justify-content space-between
  font-size: 18px

.talk-item-title
  color $secondary-color

.talk-item
  width 100%

  +tablet-up()
    width 48%

  > a
    display block

  a:hover
    text-decoration none

    .talk-item-title
      color $primary-color

.lightning-author
  display inline-block
  overflow hidden
  color $gray

  &:before
    z-index 0
</style>
