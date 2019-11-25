<template lang='pug'>
  transition(name="push" mode='out-in' appear)
    nuxt-link(to='/pricing' class="announcement-bar" v-if="ready && !account || (account && !account.subscribed)" v-cloak)
      .squares
        .square
        .square
        .square

      .squares.right
        .square
        .square
        .square

      p.para
        | Get 40% off an annual subscription! Limited #[span Black Friday] deal.
        button.button.high-contrast.-small Save now
      //- .anounce-icon
      //-   img(src='https://storage.googleapis.com/vue-mastery.appspot.com/flamelink%2Fmedia%2F1569440526519_11.png?GoogleAccessId=firebase-adminsdk-otdiq%40vue-mastery.iam.gserviceaccount.com&Expires=16725243600&Signature=18e4j%2Bal59Ew8Tz0qv526uCtDk08Us0RUk9sKvPKS9Xa7fvvKHB%2BW%2BraFTYtDUeUP%2FIvaeOhfP%2F6%2BOkouSW1G%2BLL4fI7QxeDy6FFoW%2B7w3cNE8dIm7tQwKxk2h6j%2BwdGN16xoFAjHKs0DLAfVfqtsEil3LixxREXGnKgH7kpLwJIWwFFEFPrxvxgl69wCsuzcOmojEv7gsptGdoCQFbwH8rc19z5mXakq9TkyxjKJQv5yOeAC5%2Bp3JdloK5pUz1pcQEZAgIMvH4BFjBYIwg1EFbnCSbUmWWVCBQyySzxhf6E5u0qODLoe1KczHiU9cozYUWl0kHtY9ov69hkhL0PSA%3D%3D')
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'announcement-bar',

  data () {
    return {
      ready: false
    }
  },

  mounted () {
    setTimeout(() => {
      this.ready = true
    }, 2000)
  },

  computed: {
    ...mapState({
      account: result => result.account.account
    })
  }
}
</script>


<style lang="stylus">
.open-nav
  .announcement-bar
    +laptop-down()
      position absolute
      opacity 0
</style>

<style lang="stylus" scoped>
.announcement-bar
  display flex
  align-items center
  flex-direction row
  padding 0 10px
  position relative
  justify-content center
  overflow hidden
  text-align left
  font-size 18px
  color #fff
  min-height $vertical-space
  background $secondary-color
  // background-image radial-gradient(800px 100% at center -35px, #02101f, #0a2b4e)
  text-align center

  &:hover
    text-decoration none

  &:after
    content: ''
    position: absolute
    z-index 20
    top: -100%
    width: 100%
    height: 200%

    background: radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, rgba(196, 196, 196, 0) 100%);
    mix-blend-mode: overlay;

  +desktop-up()
    font-size 22px

.anounce-icon
  display flex
  align-items center
  width 80px
  margin 0 10px

  +tablet-up()
    width 70px
    margin 0 18px


.push-enter-active
  transition margin-top ease-in .5s

.push-leave-active
  transition margin-top ease-out .5s

.push-enter, .push-leave-to
  margin-top: -90px

.button
  font-size: 18px

  margin: 20px auto 0
  display: block
  min-width: 150px

  +desktop-up()
    display inline
    margin 0 0 0 2rem
    min-width auto

.para
  z-index 2
  max-width: 33rem
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

