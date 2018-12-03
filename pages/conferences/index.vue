<template lang="pug">
  .container
    PageHeader(title='Vue Conference Videos'
              background_image='/images/conference-background-transparent.png'
              background_color='linear-gradient(to right, #41B782 , #86D169)')

    .wrapper
      .conference-body
        .list(v-if='conferences' v-cloak)
          nuxt-link.list-card(v-for='conference, key, index in orderedConferences'
                        v-if='!conference.upcoming'
                        :key='conference.id'
                        :class='conference.available ? "" : "not-available"'
                        :to='getConferenceUrl(conference)')
                        
            Card(:title='conference.title' v-if='conference'
              :image_url='conference.banner[0].url'
              image_placement='top'
              :meta='conference.location'
              :content='getNumbersOfTalks(conference)')
              ConferenceActions(slot='actions' :conference='conference')

        .sidebar
          h2.title Upcoming Conferences
          .list-card(v-for='conference, key, index in conferences'
                        v-if='conference.upcoming'
                        :key='conference.id')
            Card(:title='conference.title'
              :meta='conference.upcomingDate | moment("MMMM YYYY")')
              ConferenceActions(slot='actions' :conference='conference')

</template>

<script>
import { mapState } from 'vuex'
import PageHeader from '~/components/ui/PageHeader.vue'
import ConferenceActions from '~/components/courses/ActionsConference.vue'
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
    ConferenceActions
  },

  async fetch ({ store }) {
    await store.dispatch('getAllConferences')
  },

  data () {
    return {
      upcomings: null
    }
  },

  computed: {
    ...mapState({
      conferences: result => {
        const conferences = result.courses.conferences
        this.upcomings = Object.values(conferences).filter(conference => conference.upcoming)
        return conferences
      },
      account: result => result.account.account
    }),
    orderedConferences () {
      return Object.values(this.conferences)
        .sort((a, b) => new Date(b.upcomingDate) - new Date(a.upcomingDate))
    }
  },

  methods: {
    showBadge (course, account) {
      if ((course.free && !account) || (course.free && account && !account.subscribed)) return true
    },
    getConferenceUrl (conference) {
      let url = conference.available ? '/conferences/' + conference.slug : ''
      if (conference.slug === 'vueconf-us-2018') {
        url = '/vueconf'
      }
      return url
    },
    getNumbersOfTalks (conference) {
      let text = conference.talksCount + ' session talks'
      if (conference.lightningTalksCount > 0) {
        text += ' and ' + conference.lightningTalksCount + ' lightning talks'
      }
      return text
    }
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

.not-available
  cursor default
</style>
