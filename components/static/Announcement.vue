<template lang='pug'>
  transition(name="push" mode='out-in' appear tag='div')
    section.announcement-bar
      nuxt-link(:to='`/pricing${"?coupon=SPRING2020"}`' class="announcement-bar")
        .squares
          .square
          .square
          .square

        .squares.right
          .square
          .square
          .square

        p.para
          | Get 20% off an annual subscription today
        button.button.primary.-small Claim Offer
        //- .anounce-icon
        //-   img(src='/images/ico-vue-spring.png')

</template>

<script>
export default {
  name: 'announcement-bar'
}
</script>

<style lang="stylus" scoped>
.announcement-bar
  position sticky
  left 0
  top 0
  width 100%
  display flex
  align-items center
  flex-direction row
  justify-content center
  overflow hidden
  text-align left
  font-size 18px
  color #fff
  min-height $vertical-space
  background $secondary-color
  text-align center
  z-index 0
  transition background .25s ease-out

  +mobile-only()
    flex-direction: column

  &:hover
    text-decoration none
    background-color: #08182f

  a:after
    content: ''
    position: absolute
    z-index 20
    top: -100%
    width: 100%
    height: 200%

    background: radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, rgba(196, 196, 196, 0) 100%)
    mix-blend-mode: overlay
    pointer-events: none;

  +desktop-up()
    font-size 22px

.anounce-icon
  display none
  align-items center

  +tablet-up()
    display flex
    width 70px
    margin 0 18px

.button
  display inline-block
  font-size: 18px
  // text-transform uppercase
  min-width: 150px
  margin 0 0 0 2rem
  position: relative;
  z-index: 21;

  +mobile-only()
    margin-left: 0
    margin-bottom: 1rem


.para
  z-index 2
  max-width: 270px

  +desktop-up()
    max-width 100%

  span
    text-transform: uppercase
    color: #000
    font-weight: 800

.squares
  position absolute
  z-index 0
  left 0
  display flex
  width calc((100% - 600px) / 2)
  min-width 104px
  height 100%

  +desktop-up()
    width calc((100% - 1000px) / 2)
    height 100%
    bottom auto
    top 0
    min-width auto

.square
  width 40%
  height 100%
  background-color #091221
  position absolute
  left 0
  color: #091221

  animation-name: blinker
  animation-iteration-count: infinite
  animation-duration: 10s

  &:nth-child(1)
    animation-name: blinker2
    opacity .5
    width 70%

  &:nth-child(2)
    animation-name: blinker3
    opacity .25
    width 100%

.square::after
  content ''
  border-top: 156px solid transparent;
  border-bottom: 0px solid transparent;
  border-left: 56px solid;
  position absolute
  left 100%

  +desktop-up()
    border-top 45px solid transparent
    border-bottom 45px solid transparent
    border-left 45px solid

@-webkit-keyframes blinker
  36%
    opacity: 1
    width 40%
  46%
    color #091221
    background-color #091221
  50%
    opacity:0
    width 1000%
  55%
    opacity 0
    width 0
  65%
    opacity: 1


@-webkit-keyframes blinker2
  35%
    opacity: 0.5
    width 70%
  45%
    color #091221
    background-color #091221
  50%
    opacity: 0
    width 1000%
  55%
    opacity 0
    width 0
  70%
    opacity: 0.5


@-webkit-keyframes blinker3
  34%
    opacity: 0.25
    width 100%
  44%
    color #091221
    background-color #091221
  50%
    opacity: 0
    width 1000%
  55%
    opacity 0
    width 0
  70%
    opacity: 0.25

.right
  transform scale(-1, 1)
  left: auto
  right 0
</style>

