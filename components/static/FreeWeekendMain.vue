<template lang='pug'>
  .banner
    .wrapper
      .media
        img.image1(src='/images/free-weekend/vuevue.png')
        img.image2(src='/images/free-weekend/hand.png')
        img.image3(src='/images/free-weekend/lock.png')
        img.image4(src='/images/free-weekend/orb.png')
        img.image5(src='/images/free-weekend/vue.png')
        img.image6(src='/images/free-weekend/vue3.png')
      .body
        h2.title Enroll in Free Weekend
        p.lead
          | Reserve your spot to get access to all Vue.js courses free.
          br
          span.normal We will email you when the courses are unlocked.

        p
          nuxt-link.button.primary(to='/courses') View Courses
        
        p.lead.date
          | Friday through Sunday
          br
          | Mar 6 at 12 PM ET until Mar 8, 11:59 PM ET

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
  padding-top 320px
  position relative

  +desktop-up()
    padding-top $vertical-space

.banner
  background-image url(/images/free-weekend/background.svg)
  overflow hidden

.media
  position: absolute;
  height: 200px;
  top: 57px;
  left: 50%;
  width: 300px;
  margin-left: -93px;

  +desktop-up()
    height: 78%;
    top: 20%;
    left: 3%;
    width 100%
    margin-left 0

  +desktop-up()
    width 50%

  img
    position absolute

  .image1
    top: -5%;
    left: 44%;
    width: 27%;

  .image2
    bottom: -13%;
    left: -13%;
    width: 36%;

    +desktop-up()
      bottom: -34%;
      left: -31%;
      width: 58%;

  .image3
    z-index: 5;
    top: 10%;
    left: 5%;
    width: 52%;

  .image4
    top: -11%;
    left: -7%;
    width: 23%;

  .image5
    bottom: 45%;
    left: -16%;
    width: 13%;

  .image6
    bottom: 13%;
    left: 42%;
    width: 33%;

.body
  padding-bottom 1em
  padding-bottom $vertical-space
  text-align center
  position: relative;

  +laptop-up()
    width 50%
    margin-left auto

.title
  margin 0
  padding-top 0
  color #fff

  +tablet-up()
    font-size 56px

.lead
  font-size 16px
  color #fff
  font-weight: bold

  +laptop-up()
    max-width 690px
    font-size 24px

.normal
  font-size 16px
  color #fff
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
