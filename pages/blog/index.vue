<template lang="pug">
  .container
    PageHeader(title='Our Articles'
              background_image='/images/post-background-transparent.png'
              background_color='linear-gradient(to right, #41B782 , #86D169)')

    .wrapper
      .post-body
        .list(v-if='posts' v-cloak)
          nuxt-link.list-card(v-for='post, key, index in posts'
                        :key='post.id'
                        :to='getPostUrl(post)')
                        
            //- Card(:title='post.title' v-if='post'
            //-   :image_url='post.image ? post.image[0].url : ""'
            //-   image_placement='top')
            //-   .actions
            //-     .button.secondary.border.-full
            //-       | Read post

        .sidebar
          h2.title Other categories
          //- .list-card(v-for='post, key, index in upcomings'
          //-           :key='post.id')
          //-   Card(:title='post.title'
          //-     :meta='post.upcomingDate | dateFormat("MMMM YYYY")')
          //-     postActions(slot='actions' :post='post')

</template>

<script>
import { mapState } from 'vuex'
import PageHeader from '~/components/ui/PageHeader.vue'
import Card from '~/components/ui/Card.vue'

export default {
  name: 'page-posts',

  middleware: 'anonymous',

  head () {
    return {
      title: 'Vue.js Blog Posts | Vue Mastery',
      meta: [{
        hid: 'og:url',
        property: 'og:url',
        content: `${process.env.url}/blog`
      },
      {
        hid: `description`,
        name: 'description',
        content: 'Look at the latest Vue Mastery blog posts, covering a variety of topics.'
      }]
    }
  },

  components: {
    PageHeader,
    Card
  },

  async fetch ({ store }) {
    await store.dispatch('courses/getAllPosts')
  },

  computed: {
    ...mapState({
      posts: result => result.courses.posts
    })
  },

  methods: {
    getPostUrl (post) {
      return '/blog/' + post.slug
    }
  }
}
</script>

<style lang="stylus" scoped>
.post-body
  display grid
  width 100%
  grid-column-gap 4%
  grid-row-gap 45px
  padding-top ($vertical-space/2)
  padding-bottom ($vertical-space/2)

  +laptop-up()
    grid-template-columns 63% 33%

.title
  color $primary-color
  font-weight 600
  margin-bottom: 22px
  padding-top 0

  +tablet-up()
    font-size 40.5px

.list-card
  display block
  color $black
  margin-bottom 35px

  &:hover
    text-decoration none

.not-available
  cursor default


.actions
  display flex
  align-items center
  justify-content center
  width 100%
  text-align: center
  margin-top 20px

  +tablet-up()
    width 200px
    margin-left 4%
    margin-top: 0

  span
    font-weight: 700
</style>
