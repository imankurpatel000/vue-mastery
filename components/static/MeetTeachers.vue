<template lang="pug">
.banner
  h2.title Meet Your Teachers

  .wrapper
    .instructor
      .img.gregg
        img(src='/images/teachers/gregg-pollack.jpg')
      h3 Gregg Pollack
      p You may recognize Gregg from his early days teaching Rails for Zombies and the countless courses he produced as the Founder of Code School. A proud father of two, Gregg is grateful to continue teaching technology and supporting open source as the Founder of Vue Mastery.

    .instructor
      .img.adam
        img(src='/images/teachers/adam-jahr.jpg')
      h3 Adam Jahr
      p Co-founder of Vue Mastery, Adam has been working in the tech education space since 2015. Having previously ran an in-person code school, his goal is to help people elevate their lives by sharpening their skills. Also a Vue.js Community Partner, Adam enjoys leading in-person workshops and presenting at Vue conferences.

    .instructor
      .img.ben
        img(src='/images/teachers/ben-hong.jpg')
      h3 Ben Hong
      p Ben is a Vue.js Core Team Member, Developer Experience Engineer at Cypress.io, and Google Developer Expert in Web Technologies. He loves combining his developer experience with his training in psychology to create educational content that is easy to understand while empowering people with new skills and ideas.


    .instructor
      .img.gregg
        img(src='/images/teachers/marina-mosti.jpg')
      h3 Marina Mosti
      p Marina is an educator, technical writer, and full-stack developer with 14 years experience. Author of the book Building Forms with Vue, Vuelidate core-team member and co-creator of FormVueLatte, Marina strongly believes that there is no code concept that can't be explained using an 🥑.

    .instructor
      .img.ben
        img(src='/images/teachers/damian-dulish.jpg')
      h3 Damian Dulish
      p Damian is a Vue.js Core Team Member and tech lead at Coursedog. He runs the Official Vue.js Newsletter and has created several popular open source libraries: vue-multiselect, vuelidate and vue-global-events. In 2017, he co-organised the first international VueConf and has since been coordinating Vue meetups in Poland. When not coding, he‘s probably practicing his latte art skills.

  h2.title Guest Instructors
  .wrapper.guest
    .instructor
      .img.adam
        img(src='/images/teachers/evan-you.jpg')
      h3 Evan You
      p Creator of Vue.js

    .instructor
      .img.gregg
        img(src='/images/teachers/eduardo-san-martin-morote.jpg')
      h3 Eduardo San Martin Morote
      p Vue.js Core Team Member

    .instructor
      .img.ben
        img(src='/images/teachers/sebastian-chopin.jpg')
      h3 Sebastian Chopin
      p Creator of Nuxt.js

    .instructor
      .img.gregg
        img(src='/images/teachers/chris-fritz.jpg')
      h3 Chris Fritz
      p Former Vue.js Core Team Member

    .instructor
      .img.ben
        img(src='/images/teachers/jessica-sachs.jpg')
      h3 Jessica Sachs
      p Vue Test Utils Core Team Member & DX at Cypress.io

    .instructor
      .img.adam
        img(src='/images/teachers/thorsten-lunborg.jpg')
      h3 Thorsten Lünborg
      p Vue.js Core Team Member
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
  width: 450px
  max-width 100%
  padding ($vertical-space/3)
  justify-self center

  +tablet-up()
    padding ($vertical-space/2)
  h3
    padding-top 0
    font-size 1.15rem

  p
    +tablet-up()
      font-size 1rem

  img
    border-radius 50%
    overflow hidden
    border: 2px solid #fff

  .img
    max-width 125px
    position relative
    margin: 0 auto ($vertical-space/3) auto

    +tablet-up()
      max-width 145px

    &:before
      content ''
      position absolute
      width 64%
      height 64%
      background-repeat no-repeat
      background-size 100%
    
.guest
  .img
    max-width 125px

  .instructor
    width: 350px

  .adam:before
    bottom: -15%


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
