<template lang="pug">
.container
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
      LearningPath(
        path='related'
        :parts='related'
        :account='account'
      )

  CheatSheetMain
</template>

<script>
import { mapState } from 'vuex'
import Body from '~/components/lessons/Body'
import LearningPath from '~/components/courses/LearningPath'
import CheatSheetMain from '~/components/static/CheatSheetMain'
import meta from '~/mixins/meta'

export default {
  name: 'post',
  middleware: 'anonymous',

  components: {
    Body,
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

    // This can not be fetch on the component level because
    // the LearningPath component is shared between few pages
    related () {
      const r = this.post.relatedCourses
      if (r) {
        return [ {
          intro: 'If you like this blog post, you may want to watch:',
          courses: Object.keys(this.courses)
            .filter(key => r.includes(parseInt(key)))
            .reduce((obj, key) => {
              obj[key] = this.courses[key]
              return obj
            }, {})
        }]
      }
    },

    // Same for body as blog post content is always shown
    // where lesson only the desciption is shown if there it's a paid content
    body () {
      return this.post.hasOwnProperty('markdown') ? this.$md.render(this.post.markdown) : 'Loading'
    }
  },

  // TODO: Fix hydratation with login here
  async asyncData ({store, params, error}) {
    try {
      const getCourses = store.dispatch('courses/getAllCourses')
      const getPost = store.dispatch('courses/getPost', params.slug)
      const data = await Promise.all([getCourses, getPost])
      return data
    } catch (err) {
      console.log('Error in getting blog content', err)
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  background #fff

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
  margin-bottom: 20px

  +tablet-up()
    font-size 22px

.post-related
  margin 0px 0 50px 0
</style>