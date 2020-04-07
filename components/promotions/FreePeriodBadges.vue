<template lang='pug'>
  .media(:class='{ animate: animate}')
    transition-group(name="images" appear)
      img.images.image1(key='1' src='/images/free-period/vuevue.png')
      img.images.image2(key='2' src='/images/free-period/hand.png')
      img.images.image3(key='3' src='/images/free-period/lock.png')
      img.images.image4(key='4' src='/images/free-period/orb.png')
      img.images.image5(key='5' src='/images/free-period/vue.png')
      img.images.image6(key='6' src='/images/free-period/vue3.png')
</template>

<script>
export default {
  name: 'free-weekend-badges',
  props: {
    animate: {
      type: Boolean,
      default: false
    }
  }
}
</script>


<style lang='stylus' scoped>
.media
  position: absolute;
  height: 200px;
  top: 57px;
  left: 50%;
  width: 300px;
  margin-left: -93px;

  +desktop-up()
    height: 415px;
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

    +desktop-up()
      top: -27px;
      left: 265px;
      width: 130px;

  .image2
    bottom: -13%;
    left: -13%;
    width: 36%;

    +desktop-up()
      bottom: -201px;
      left: -171px;
      width: 351px;

  .image3
    z-index: 5;
    top: 10%;
    left: 5%;
    width: 52%;

    +desktop-up()
      top: 34px;
      left: 76px;
      width: 264px;

  .image4
    top: -11%;
    left: -7%;
    width: 23%;

    +desktop-up()
      top: -45px;
      left: 19px;
      width: 108px;

  .image5
    bottom: 45%;
    left: -16%;
    width: 13%;

    +desktop-up()
      top: 163px;
      left: -14px;
      width: 68px;

  .image6
    bottom: 13%;
    left: 42%;
    width: 33%;

    +desktop-up()
      top: 205px;
      left: 267px;
      width: 172px;


.animate
  // Specific to thank you page
  left: 80%

  +desktop-up()
    top: 30%
    left: 10%

  .images-enter-active
    transition opacity 1s ease-out, transform 1s ease-out

  .images-enter
    opacity 0
    transform scale(0)

    for i in (1..6)
      &.image{i}
        transition-delay: (i*100)ms
        transform translateX((i*100)%)
</style>
