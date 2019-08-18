<template lang="pug">
.lesson-wrapper
  Header(:course='post')

  Body(
    :restricted='false'
    :course='post' 
    :locked='false' 
    :free='true'
  )
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
      pageSlug: this.current.slug,
      pageTitle: this.current.title,
      category: 'blog',
      description: this.current.description,
      image: this.current.image[0].url,
      facebookImage: this.current.facebookImage[0].url || this.current.image[0].url,
      twitterImage: this.current.twitterImage[0].url || this.current.image[0].url,
      author: this.current.author || 'Adam Jahr'
    })
  },

  data () {
    return {
      postSlug: this.$route.params.post
    }
  },

  computed: {
    ...mapState({
      post: result => result.courses.post,
      account: result => result.account.account
    })
  },

  async fetch ({ store, params }) {
    await store.dispatch('getPost', params.post)
  }
}
</script>
