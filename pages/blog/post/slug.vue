<template lang="pug">
.lesson-wrapper
  Header(:course='course')

  Body(
    :course='current' 
    :locked='locked' 
    :free='current.free'
  )
    Profile(
      v-if='!isLesson'
      :current='current'
      v-cloak
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
      categoryTitle: this.conference.title,
      categorySlug: this.conferenceSlug,
      pageSlug: this.current.slug,
      pageTitle: this.current.title,
      category: 'conferences',
      description: this.current.description,
      image: this.current.image[0].url,
      facebookImage: this.current.facebookImage[0].url || this.current.image[0].url,
      twitterImage: this.current.twitterImage[0].url || this.current.image[0].url,
      author: this.current.author || 'Adam Jahr'
    })
  },

  data () {
    let postSlug = this.$route.params.post
    return {
      postSlug: postSlug,
      page: this.$route.params.talk
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

  async fetch ({ store, params }) {
    await store.dispatch('getConference', params.conference)
  }
  // async fetch ({ store }) {
  //   await store.dispatch('getConference', this.conferenceSlug)
  // }
}
</script>
