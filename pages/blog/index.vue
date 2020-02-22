<template lang="pug">
  .container
    PageHeader(title='Our Articles'
              background_image='/images/banner-blog.png')

    .wrapper
      .post-list(v-if='posts' v-cloak)
        nuxt-link.list-card(v-for='post, key, index in posts'
                      :key='post.id'
                      :to='getPostUrl(post)')
          .post
            img.post-image(:src='post.image[0].url'
                :alt='post.title')

            .post-body
              .post-main
                h4 {{ post.title }}

              .post-meta
                .post-info
                  img.author-image(
                    v-if='post.authorImage'
                    :src='post.authorImage[0].url'
                    :alt='post.author'
                  )
                  .post-info-text
                    h4.post-author {{ post.author }}
                    p.post-date {{ post.date | dateFormat("D MMMM YYYY") }}
                .button.secondary.border.-full Read Article

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
        content: `${process.env.baseUrl}/blog`
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
.container
  background #fff

.post-list
  display grid
  margin-top 40px
  margin-bottom 40px

  @media screen and (min-width: 70em)
    grid-column-gap 4%
    grid-template-columns 1fr 1fr

.title
  color $primary-color
  font-weight 600
  margin-bottom 22px
  padding-top 0

  +tablet-up()
    font-size 40.5px

.list-card
  display block
  color $black
  margin-bottom 35px

  &:hover
    text-decoration none

.post
  position relative
  height 100%
  display grid
  background #fff
  box-shadow 0 1px 4px 0 rgba(0,0,0,0.30)
  overflow hidden
  border-radius 12px
  transition box-shadow .5s cubic-bezier(0.19, 1, 0.22, 1), transform .5s cubic-bezier(0.19, 1, 0.22, 1)

  +tablet-up()
    grid-template-rows 300px 1fr

  &:hover
    box-shadow 0 2px 7px 0 rgba(0, 0, 0, .3)
    transform scale(1.03)

    .title
      color $primary-color

.post-image
  object-fit cover
  min-height 150px
  +tablet-up()
    height 100%

.post-body
  display flex
  flex-flow row
  justify-content space-between
  align-items center
  width 100%
  padding 20px
  background #fff
  z-index 2

  @media screen and (max-width: 30em)
    padding-top 35px
    flex-flow column
    text-align center

    .post-meta
      margin-left: 0

.post-meta
  font-size 16px
  display flex
  flex-direction column
  justify-content space-between
  margin-top 10px
  margin-left 20px

.post-info
  display flex
  align-items center
  margin-top 10px
  position relative
  padding 0 0 20px 0
  z-index 1
  right 0px
  background #fff
  text-align: left

  +tablet-up()
    position absolute
    padding 4px 20px 5px 0px
    top 244px
    text-align center

    &:before
      position absolute
      top 0px
      left -100px
      content ""
      display block
      width 200px
      height 84px
      background-position right top
      background-repeat no-repeat
      background-size 200px auto
      background-image url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3NiAzMSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNmZmY7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5iZ19zb3VyY2VfYmFkZ2VfMTwvdGl0bGU+PGcgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+PGcgaWQ9IkxheWVyXzEtMiIgZGF0YS1uYW1lPSJMYXllciAxIj48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik01Ny42NywxMS45NEM1Mi4zNiw2LjcxLDQ4LjQyLDAsMzguMywwSDM3LjdDMjcuNTgsMCwyMy42NCw2LjcxLDE4LjMzLDExLjk0LDE0LjQ3LDE2Ljc2LDYuNjEsMTcuODEsMCwxOFYzMUg3NlYxOEM2OS4zOSwxNy44MSw2MS41MywxNi43Niw1Ny42NywxMS45NFoiLz48L2c+PC9nPjwvc3ZnPg==")
      clip rect(0px, 200px, 46px, 10px)
      z-index -1

.post-author
  color $primary-color
  font-size 16px
  padding-top 0
  margin-bottom 0

.author-image
  width 40px
  height 40px
  margin-right 12px
  border-radius 50%
  object-fit contain

  width 64px
  height 64px
  padding 4px
  background-color #fff

  +tablet-up()
    margin-left -36px
.post-date
  margin 0

.media-body
  grid-area body
  text-align center

  +tablet-up()
    max-width 400px
    min-width calc(100% - 200px)
    margin 0
    text-align left

.media-title
  font-size 27px
  position relative
  padding-top 0
</style>
