<template lang="pug">
  TalkWrapper(:category = 'conferenceSlug'
              :page = 'page'
              :course = 'conference'
              :account = 'account'
              :completedUnlogged = 'completedUnlogged'
              :current = 'current'
              :selected = 'selected'
              :isLesson = 'false')
</template>


<script>
import { mapState } from 'vuex'
import TalkWrapper from '~/components/lessons/Wrapper'
import meta from '~/mixins/meta'

export default {
  name: 'page-talk',
  middleware: 'anonymous',

  components: {
    TalkWrapper
  },

  head () {
    return meta.get({
      categoryTitle: this.conference.title,
      categorySlug: this.conferenceSlug,
      pageSlug: this.current.slug,
      pageTitle: this.current.title,
      description: this.current.description,
      image: this.current.image[0].url
      // facebookImage: this.current.facebookImage[0].url,
      // twitterImage: this.current.twitterImage[0].url
    })
  },

  data () {
    return {
      conferenceSlug: this.$route.params.talk,
      page: this.$route.params.slug,
      selected: -1
    }
  },

  computed: {
    ...mapState({
      conference: result => {
        // TODO fix hack
        result.courses.conference.lessons = result.courses.conference.talks
        return result.courses.conference
      },
      account: result => result.account.account,
      completedUnlogged: result => result.account.completedUnlogged
    }),

    current () {
      let currentPage = null
      // If no talk selected, get the first one of the course
      if (this.page === null) this.page = this.conference.talk[0].slug
      this.conference.talks.map((talk, index) => {
        // Find the selected talk in the list
        if (talk && this.page === talk.slug) {
          // Load the current talk
          currentPage = talk
          // Keep track of talk index for the carousel
          this.selected = index
        }
      })
      return currentPage
    }
  },

  async fetch ({ store }) {
    await store.dispatch('getConference', this.conferenceSlug)
  }
}
</script>
