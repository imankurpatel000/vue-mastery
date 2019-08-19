<template lang="pug">
.lesson-wrapper
  h1 test
  //- Header(:course='post')

  //- Body(
  //-   :restricted='false'
  //-   :course='post' 
  //-   :locked='false' 
  //-   :free='true'
  //- )
</template>

<script>
import { mapState } from 'vuex'
import Header from '~/components/lessons/Header'
import Body from '~/components/lessons/Body'
import Profile from '~/components/lessons/Profile'
import meta from '~/mixins/meta'

export default {
  name: 'post',
  middleware: 'anonymous',

  components: {
    Header,
    Body,
    Profile
  },

  head () {
    return meta.get({
      pageSlug: this.post.slug,
      pageTitle: this.post.title,
      category: 'blog',
      description: this.post.description,
      image: this.post.image[0].url,
      facebookImage: this.post.facebookImage[0].url || this.post.image[0].url,
      twitterImage: this.post.twitterImage[0].url || this.post.image[0].url,
      author: this.post.author || 'Adam Jahr'
    })
  },

  computed: {
    ...mapState({
      post: result => result.courses.post
    })
  },

  async fetch ({ store, params }) {
    await store.dispatch('courses/getPost', params.slug)
  }
}
</script>
