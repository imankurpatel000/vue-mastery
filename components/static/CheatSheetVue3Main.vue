<template lang='pug'>
  .banner
    .wrapper
      .media
        img(src='/images/cheatsheets/img-vue-3-cheatsheet-example@2x.png')

      .body
        h2.title Get the Vue 3 Cheat Sheet
        p.lead Get a head start on the Composition API.

        DownloadButtonVue3(button-class='inverted' location='Front-page cheat sheet download')
</template>

<script>
import DownloadButtonVue3 from '~/components/static/DownloadButtonVue3'

export default {
  name: 'vue-3-cheat-sheet-main',

  components: {
    DownloadButtonVue3
  }
}
</script>


<style lang='stylus' scoped>
.wrapper
  grid-template-columns 1fr 1fr
  padding-top $vertical-space
  grid-template-areas 'body body'\
                      'media media'

  +laptop-up()
    grid-template-areas 'media body'\
                        'media body'
.banner
  background-image url(/images/bkg-cheatsheet-main.jpg)

.media
  display grid
  grid-area media
  justify-content center

  img
    align-self end
    justify-self center
    width 70%

    +laptop-up()
      justify-self center
      width 100%

.body
  display grid
  grid-area body
  padding-bottom 1em
  text-align center

  +laptop-up()
    padding-bottom $vertical-space

.title
  color $secondary-color
  margin 0
  padding-top 0
  +tablet-up()
    font-size 56px

.lead
  max-width 690px
  font-size 16px
  color $secondary-color

  +laptop-up()
    font-size 24px

.button
  justify-self center
  text-transform uppercase

</style>
