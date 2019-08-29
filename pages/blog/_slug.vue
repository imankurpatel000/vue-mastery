<template lang="pug">
div
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
        p.post-date {{ post.date | dateFormat("D MMMM YYYY") }}

    .post-body(v-html='body')

    .post-related(v-if='related')
      h2 If you like this blog post, you may want to watch:
      LearningPath(:courses='related' :account='account')

  CheatSheetMain
</template>

<script>
import { mapState } from 'vuex'
import Header from '~/components/lessons/Header'
import Body from '~/components/lessons/Body'
import Profile from '~/components/lessons/Profile'
import LearningPath from '~/components/courses/LearningPath'
import CheatSheetMain from '~/components/static/CheatSheetMain'
import meta from '~/mixins/meta'

export default {
  name: 'post',
  middleware: 'anonymous',

  components: {
    Header,
    Body,
    Profile,
    LearningPath,
    CheatSheetMain
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
      account: result => result.account.account,
      post: result => result.courses.post,
      courses: result => result.courses.courses
    }),

    related () {
      const r = this.post.relatedCourses
      return Object.keys(this.courses)
        .filter(key => r.includes(parseInt(key)))
        .reduce((obj, key) => {
          obj[key] = this.courses[key]
          return obj
        }, {})
    },

    body () {
      if (this.post.hasOwnProperty('markdown')) {
        return this.$md.render(this.post.markdown)
      } else {
        return 'Loading'
      }
    }
  },

  async fetch ({ store, params }) {
    await store.dispatch('courses/getAllCourses')
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
  font-size 16px

  +tablet-up()
    font-size 22px

.post-related
  margin 120px 0 50px 0
</style>