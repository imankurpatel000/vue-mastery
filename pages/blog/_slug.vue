<template lang="pug">
.post-wrapper(
  v-if='post'
  v-cloak
)
  img.post-image(:src='post.image[0].url')

  h1.post-title {{ post.title }}

  .post-info
    img.author-image(
      v-if='post.authorImage'
      :src='post.authorImage[0].url'
      :alt='post.author'
    )
    .post-info-text
      h4.post-author {{ post.author }}
      p.post-date {{ post.date | dateFormat }}

  .post-body(v-html='body')
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
    const imageUrl = this.post.image ? this.post.image[0].url : ''
    return meta.get({
      pageSlug: this.post.slug,
      pageTitle: this.post.title,
      category: 'blog',
      description: this.post.description,
      image: imageUrl,
      facebookImage: this.post.facebookImage[0].url || this.post.image[0].url,
      twitterImage: this.post.twitterImage[0].url || this.post.image[0].url,
      author: this.post.author || 'Adam Jahr'
    })
  },

  computed: {
    ...mapState({
      post: result => result.courses.post
    }),
    body () {
      if (this.post.hasOwnProperty('markdown')) {
        return this.$md.render(this.post.markdown)
      } else {
        return 'Loading'
      }
    }
  },

  async fetch ({ store, params }) {
    await store.dispatch('courses/getPost', params.slug)
  }
}
</script>

<style lang="stylus" scoped>
.post-wrapper
  max-width: 1000px
  padding: 0 4%
  margin: 50px auto

.post-title
  margin-top: 30px
  margin-bottom: 50px

.post-info
  display: flex
  align-items: center

.post-author
  margin: 0
  padding: 0

.post-date
  margin: 0
  font-size: 16px
  color: #999

.author-image
  width: 70px
  height: 70px
  margin-right: 20px
  border-radius: 50%
  object-fit: contain

.post-body
  margin-top: 50px
</style>