<template lang="pug">
no-ssr
  modal(name='finish-course' height='auto' @before-open='beforeOpen' @before-close='beforeClose')
    .body
      button(class="modal-close" @click="$modal.hide('finish-course')" @before-close="beforeClose") &times;
      p.lead.text-center You've completed our #[b {{ course.title }} Course], and earned this completion badge.
      div.media
        transition(name="badge" appear)
          img(:src='course.image[0].url')
      h5 Tell others about your accomplishment.
      social-sharing(inline-template :url="base+'/courses/'+course.slug"
                    :title="congratsTitle")
        .social-wrapper
          network.underline.-has-icon(network='twitter')
            i.fab.fa-twitter
            span Twitter
    .form-footer.text-center
      a.button.link(@click.prevent='redirectToCourse') Back to Courses
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

  data () {
    return {
      base: process.env.baseUrl
    }
  },

  computed: {
    congratsTitle () {
      return `I've completed the ${this.course.title} course on @VueMastery, the ultimate resource for #VueJS developers. #JavaScript`
    }
  },

  methods: {
    beforeOpen (event) {
      this.$confetti.start({shape: 'rect'})
    },
    beforeClose (event) {
      this.$confetti.stop()
    },
    redirectToCourse: function () {
      this.$confetti.stop()
      this.$router.push('/courses')
    }
  }
}
</script>

<style lang="stylus" scoped>
.lead
  font-size 1.4em

.body
  display flex
  flex-flow column
  justify-content center
  align-items center
  position relative
  padding: 16px 4% 0

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
  margin 0.5em 0

  > span
    margin-right 2%

    &:last-of-type
      margin-right 0

img
  position absolute
  top 0

.modal-close
  position absolute
  top 0
  right 10px
  background none
  border 0
  color $secondary-color
  font-size 2em

.badge-enter-active
  transition transform 0.7s ease-in-out

.badge-enter
.badge-leave-to
  transform translateY(-100%)

</style>
