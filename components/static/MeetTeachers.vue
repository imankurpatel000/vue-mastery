<template lang="pug">
.banner
  h2.title Meet Your Teachers

  .wrapper
    .instructor
      .img.gregg
        img(src='/images/gregg-avatar.jpg')
      h3 Gregg Pollack
      p Gregg is passionate about teaching open source technology online. Previously he created Code School, an online software programming school which was acquired by Pluralsight.  He lives in Orlando, Florida with his two kids Ender and Alanna.

    .instructor
      .img.adam
        img(src='/images/adam-avatar.jpg')
      h3 Adam Jahr
      p Adam Jahr is a developer and programming instructor passionate about making it easier to learn complex skills. He previously instructed at The Iron Yard’s coding bootcamp before joining Vue Mastery in order to help developers progress along their professional paths.

    .instructor
      .img.ben
        img(src='/images/ben-avatar.jpg')
      h3 Ben Hong
      p Ben Hong is a psychologist / developer / educator hybrid, whose origin story harkens back to the days when he would build cheesy websites like his “Fortune Cookie Universe” using one too many marque, blink elements, and dancing baby GIFs
</template>

<script>
export default {
  name: 'meet-teachers'
}
</script>

<style lang="stylus" scoped>
.banner
  position relative
  z-index 2
  color #fff

.wrapper
  padding-bottom ($vertical-space/2)
  display flex
  flex-wrap wrap
  justify-content center

.title
  margin-bottom ($vertical-space/2)
  color #fff
  text-align center

  +tablet-up()
    margin-bottom $vertical-space

.instructor
  text-align center
  width: 500px
  max-width 100%
  padding ($vertical-space/2)
  justify-self center

  h3
    padding-top 0

  img
    border-radius 50%
    overflow hidden
    border: 2px solid #fff

  .img
    max-width 245px
    position relative
    margin: 0 auto ($vertical-space/2) auto

    &:before
      content ''
      position absolute
      width 64%
      height 64%
      background-repeat no-repeat
      background-size 100%
    

.gregg:before
  background-image url(/images/teachers/first.svg)
  bottom: -12%
  left: -29%

.adam:before
  background-image: url(/images/teachers/center.svg)
  bottom: -16%
  background-position: right bottom
  right: -19%

.ben:before
  background-image url(/images/teachers/last.svg)
  right: -15%
  top: -23%
</style>
