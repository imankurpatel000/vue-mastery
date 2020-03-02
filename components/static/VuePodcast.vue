<template lang='pug'>
.banner
  .wrapper
    .media
      img(src='/images/lgo-vue-news.svg')

    .body
      h2.title Bonus Vue.js Content
      p.lead Aside from our courses, we also publish the biggest collection of Vue.js conference videos you'll find on the Internet.  Also, we recently started publishing blog content here on Vue Mastery.

      .actions.control-group
        a.button.primary(href='/conferences') Watch Conference Videos
        a.button.secondary(href='/blog') Read our Blog
</template>

<script>
import Icon from '~/components/ui/Icon'
export default {
  name: 'vue-podcast',
  components: { Icon }
}
</script>

<style lang='stylus' scoped>
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
    justify-content: flex-start

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
