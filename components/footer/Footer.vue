<template lang="pug">
footer.footer
  .wrapper
    .brand(role="banner")
      nuxt-link.logo(to="/")
        span.visually-hidden Vue mastery
        img(src="/images/lgo-vue-mastery-green.png" alt="Vue Mastery logo")
      p As the ultimate resource for Vue.js developers, Vue Mastery produces weekly lessons so you can learn what you need to succeed as a Vue.js Developer.
      SocialMediaLinks

    .nav-1
      h4 Vue Mastery
      ul.list-unstyled
        li
          nuxt-link(to='/courses' class="-inverted") Courses
        li
          nuxt-link(to='/conferences' class="-inverted") Conference Videos
        li
          nuxt-link(to='/blog' class="-inverted") Blog
        li
          nuxt-link(to='/live-training' class="-inverted") Live Training
        li
          nuxt-link(to='/pricing' class="-inverted") Pricing
        li
          nuxt-link(to='/vue-cheat-sheet' class="-inverted") Vue Cheat Sheet
        li
          nuxt-link(to='/nuxt-cheat-sheet' class="-inverted") Nuxt Cheat Sheet
        li
          nuxt-link(to='/vue-3-cheat-sheet' class="-inverted") Vue 3 Cheat Sheet
    .nav-2
      h4 About Us
      ul.list-unstyled
        li
          nuxt-link(to='/about' class="-inverted") About
        li
          nuxt-link(to='/contact' class="-inverted") Contact
        li
          nuxt-link(to='/privacy' class="-inverted") Privacy Policy
        li
          nuxt-link(to='/terms' class="-inverted") Terms of Service
</template>

<script>
import SocialMediaLinks from '~/components/static/SocialMediaLinks'

export default {
  name: 'page-footer',
  components: {
    SocialMediaLinks
  }
}
</script>

<style lang="stylus" scoped>
build-grid-area(brand nav-1 nav-2)

.footer
  background linear-gradient(#041830, #080117)
  border-bottom 40px solid #080117
  color #fff
  padding ($vertical-space/2) 0
  position relative
  padding-top 100px


  &.index,
  &.courses,
  &.course-path
    +tablet-up()
      padding-top 200px

  &.index
    padding-top 100px
    margin-top -3vw
    background url(/images/footer.svg)
    background-position center top
    background-size cover
    z-index 5

    +tablet-up()
      padding-top 220px

  &:not(.index)
    @media screen and (min-height: 44em)
      position sticky
      bottom 0
      z-index 0


.wrapper
  display grid
  text-align center
  grid-template-columns 1fr 1fr
  grid-template-areas "nav-1 nav-2"\
                      "brand brand"

  >>> .social
    justify-content: center
    margin: 50px 0 -50px 0

  +tablet-up()
    text-align left
    grid-template-columns 1fr 22% 22%
    grid-column-gap 4%
    grid-template-areas "brand nav-1 nav-2"
    >>> .social
      justify-content: left
      margin: 0

.brand
  margin-bottom ($vertical-space/2)

  .logo
    display block
    max-width 284px
    min-width 200px

    +mobile-only()
      margin: 45px auto

    img
      display block
      width 100%

  >>> .button.link
    color: #fff
    margin-left: 10px

    +tablet-up()
      margin-left: 0
      margin-right: 10px

.social
  display flex
  font-size 1.5em

.nav-1
.nav-2
  justify-self center

  h4
    text-transform uppercase

  li
    margin 15px 0

</style>
