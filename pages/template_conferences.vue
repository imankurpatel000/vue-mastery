<template lang="pug">
  .container
    PageHeader(title='Vue Conferences'
              background_image='images/bkg-cheatsheet-main.jpg')

    .wrapper
      .conference-body
        .list
          nuxt-link.list-card(to='/')
            Card(title='Vue.JS London 2018'
              image_url='images/img-london.jpg'
              image_placement='top'
              meta='London, LA - USA'
              content='14 session talks and 17 lightning talks')
              CourseActions(slot='actions'
                            :course='conference')
          nuxt-link.list-card(to='/')
            Card(title='VueConf US 2018'
              image_url='images/img-new-orleans.jpg'
              image_placement='top'
              meta='New Orleans, LA - USA'
              content='14 session talks and 17 lightning talks')
              CourseActions(slot='actions'
                            :course='conference')
        .sidebar
          h2.title Upcoming Conferences
          nuxt-link.list-card(to='/')
            Card(title='Connect Tech'
              meta='October 2018')
              CourseActions(slot='actions'
                            :course='conference')
          nuxt-link.list-card(to='/')
            Card(title='VueConf Toronto'
              meta='November 2018')
              CourseActions(slot='actions'
                            :course='conference')
</template>

<script>
import { mapState } from 'vuex'
import PageHeader from '~/components/ui/PageHeader.vue'
import CourseActions from '~/components/courses/Actions.vue'
import Card from '~/components/ui/Card.vue'

export default {
  name: 'page-conferences',

  middleware: 'anonymous',

  head () {
    return {
      title: 'Conferences | Vue Mastery',
      meta: [{
        hid: 'og:url',
        property: 'og:url',
        content: `${process.env.url}/vue-conf`
      }]
    }
  },

  components: {
    PageHeader,
    Card,
    CourseActions
  },

  computed: {
    ...mapState({
      conference: result => {
        // TODO fix hack
        result.courses.conference.lessons = result.courses.conference.talks
        return result.courses.conference
      },
      account: result => result.account.account
    })
  }
}
</script>

<style lang="stylus" scoped>
.conference-body
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
</style>
