<template lang="pug">
no-ssr
  modal(name='finish-course' height='auto' @before-open='beforeOpen' @before-close="beforeClose")
    .body
      p.lead.text-center You've completed our #[b {{ course.title }} Course], and earned this completion badge.
      div.media
        transition(name="badge" appear)
          img(:src='course.image[0].url')
      h5 Tell others about your accomplishment.
      .social-wrapper
        a.underline.-has-icon(href='facebook')
          i.fab.fa-facebook
          span Facebook
        a.underline.-has-icon(href='googleplus')
          i.fab.fa-google-plus
          span Google +
        a.underline.-has-icon(href='linkedin')
          i.fab.fa-linkedin
          span LinkedIn
        a.underline.-has-icon(href='reddit')
          i.fab.fa-reddit
          span Reddit
        a.underline.-has-icon(href='twitter')
          i.fab.fa-twitter
          span Twitter
    .form-footer.text-center
      nuxt-link.button.link(to="/courses") Back to Courses
</template>

<script>
export default {
  name: 'course-congratulations',
  props: {
    course: {
      type: Object,
      required: true
    }
  },

  methods: {
    beforeOpen (event) {
      this.$confetti.start({shape: 'rect'})
    },
    beforeClose (event) {
      this.$confetti.stop()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables'
.lead
  font-size 1.4em

.body
  display flex
  flex-flow column
  justify-content center
  align-items center
  padding: 0 4%

.media
  position relative
  overflow hidden
  width 110px
  height 125px
  margin 0 auto

  +tablet-up()
    width 150px
    height 165px

.social-wrapper
  display flex
  flex-flow wrap
  justify-content space-evenly

  > a
    margin-right 2%
    margin-top 1em

    &:last-of-type
      margin-right 0
img
  position absolute
  top 0

.badge-enter-active
  transition transform 0.5s ease-in-out

.badge-enter
.badge-leave-to
  transform translateY(-100%)

</style>
