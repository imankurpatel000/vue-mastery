<template lang='pug'>
.banner
  .wrapper
    .media
      img(src='/images/lgo-vue-news.svg')

    .body
      h2.title The Official Vue.js News
      p.lead We also help produce the Official Vue.js News. It's a free community resource where we curate the most impactful Vue.js news and tutorials. Offered up in both text and audio versions. Consider subscribing today.

      .actions.control-group
        a.button.primary(href='https://news.vuejs.org/' target='_blank') Read Official Vue.js News
        a.button.secondary.-has-icon(href='https://news.vuejs.org/' target='_blank')
          i.fa.fa-volume-up
          span Listen to the Podcast
</template>

<script>
export default {
  name: 'vue-podcast'
}
</script>

<style lang='stylus' scoped>
@import '~assets/css/_variables'

.banner
  padding-top $vertical-space
  padding-bottom $vertical-space
  background-image url(/images/bkg-podcast.jpg)
  
  +laptop-up()
    padding-top ($vertical-space * 2)
    padding-bottom ($vertical-space * 2)

.wrapper
  grid-tempalate-columns 1fr 1fr
  grid-template-areas 'media media'\
                      'body body'

  +laptop-up()
    grid-template-areas 'body media'\
                        'body media'

.control-group
  flex-wrap: wrap
  justify-content: space-evenly

  +laptop-up()
    justify-content: start

.media
  display grid
  grid-area media
  align-items center
  justify-content center
  margin-bottom 1em

  +laptop-up()
    margin-bottom 0

  img
    justify-self center
    width 70%

    +laptop-up()
      justify-self center
      width 100%

.body
  display grid
  grid-area body
  align-items center
  justify-content center
  text-align center

  +laptop-up()
    text-align left

  .title
    padding-top 0
    color $secondary-color
    margin 0

    +tablet-up()
      font-size 56px

  .lead
    max-width 690px
    font-size 16px
    color $secondary-color

    +laptop-up()
      max-width 690px
      font-size 20px

.actions .button + .button
  +laptop-up()
    margin-left 25px

</style>
