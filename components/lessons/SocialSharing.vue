<template lang="pug">
  div
    button.button.primary.border(type="button" v-on:click="openShare") Share
    no-ssr
      modal(name="share" v-cloak height="auto")
        h3.form-title Share this lesson
        social-sharing(inline-template :url="'https://vue-mastery.firebaseapp.com/courses/'+courseSlug+'/'+lesson.slug"
                      :title="lesson.socialSharingDescription || lesson.title"
                      :description="lesson.description"
                      twitter-user="vuemastery")
          .social-wrapper
            network.button.primary.border.-has-icon(network="facebook")
              i.fab.fa-facebook
              span Facebook
            network.button.primary.border.-has-icon(network="googleplus")
              i.fab.fa-google-plus
              span Google +
            network.button.primary.border.-has-icon(network="linkedin")
              i.fab.fa-linkedin
              span LinkedIn
            network.button.primary.border.-has-icon(network="reddit")
              i.fab.fa-reddit
              span Reddit
            network.button.primary.border.-has-icon(network="twitter")
              i.fab.fa-twitter
              span Twitter
</template>

<script>
export default {
  name: 'top',
  props: ['lesson', 'courseSlug'],
  methods: {
    openShare () {
      this.$modal.show('share')
    }
  }
}
</script>
<style lang="stylus" scoped>
.social-wrapper
  display: flex
  flex-flow: wrap
  justify-content: space-evenly
  padding: 0 4% 20px 4%

</style>
