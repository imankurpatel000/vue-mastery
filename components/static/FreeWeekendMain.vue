<template lang='pug'>
  .banner
    .wrapper
      .media
        img(src='/images/unlocked-courses.png')

      .body
        h2.title Enroll in Free Weekend
        p.lead
          | Get access to all Vue.js courses free right now.
        p.lead.date
          | Friday through Sunday
          br
          | Feb 22 at 12 PM ET until Feb 24, 11:59 PM ET

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
    max-height 500px
    width auto

    +laptop-up()
      justify-self center

.body
  display grid
  grid-area body
  padding-bottom 1em
  text-align center

  +laptop-up()
    padding-bottom $vertical-space

.title
  margin 0
  padding-top 0
  color #fff

  +tablet-up()
    font-size 56px

.lead
  font-size 16px
  color $secondary-color
  font-weight: bold

  +laptop-up()
    max-width 690px
    font-size 24px

.normal
  font-size 16px
  color $secondary-color
  font-weight normal

  +laptop-up()
    max-width 690px
    font-size 24px

.button
  justify-self center
  text-transform uppercase

.date
  color #fff

</style>
