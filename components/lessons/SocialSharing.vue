<template lang='pug'>
div
  button.button.inverted.-small.-full(type='button' @click='openShare')
    Icon(name='share-2')
    | Share Lesson

  client-only
    modal(name='share' v-cloak height='270')
      h3.form-title Share this lesson
      social-sharing(inline-template :url="base+baseUrl+lesson.slug"
                    :title='lesson.socialSharingDescription || lesson.title'
                    :description='lesson.description')

        .social-wrapper
          network.button.primary.border.-has-icon(network='facebook')
            i.fab.fa-facebook
            span Facebook
          network.button.primary.border.-has-icon(network='googleplus')
            i.fab.fa-google-plus
            span Google +
          network.button.primary.border.-has-icon(network='linkedin')
            i.fab.fa-linkedin
            span LinkedIn
          network.button.primary.border.-has-icon(network='reddit')
            i.fab.fa-reddit
            span Reddit
          network.button.primary.border.-has-icon(network='twitter')
            i.fab.fa-twitter
            span Twitter
</template>

<script>
import Icon from '~/components/ui/Icon'
export default {
  name: 'lesson-social-sharing',
  components: {
    Icon
  },
  props: {
    lesson: {
      type: Object,
      required: true
    },
    baseUrl: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      base: process.env.baseUrl
    }
  },

  methods: {
    openShare () {
      this.$modal.show('share')
    }
  }
}
</script>

<style lang='stylus' scoped>
div
  display inline-flex
  width 100%

.social-wrapper
  display: flex
  flex-flow: wrap
  justify-content: space-evenly
  padding: 0 4% 20px 4%

</style>
