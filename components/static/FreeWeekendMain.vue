<template lang='pug'>
  .banner
    .wrapper
      .media
        img(src='/images/unlocked-courses.png' style='max-height: 500px; width: auto;')

      .body
        h2.title Enroll in Free Weekend
        p.lead Reserve your spot to get access to allour Vue.js courses free.
        p Friday through Sunday <br /> Feb 22 at 12 PM ET until Sunday Feb 24, 11:59 PM ET

        FreeEnrollButton(button-class='inverted' location='Free Weekend')
</template>

<script>
import FreeEnrollButton from '~/components/static/FreeEnrollButton'

export default {
  name: 'cheat-sheet-main',

  components: {
    FreeEnrollButton
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
