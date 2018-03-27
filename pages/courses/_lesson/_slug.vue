<template lang='pug'>
div
  .lesson-container(v-if='course'  v-cloak)
    Header(:course='course')

    Video(v-if="current && !locked" :videoId = 'current.videoEmbedId' @videoEnded='finished' @completed='completed')
    .video.-locked(v-else :style="lockedStyle")
      Unlock(:account='account')

    List(:course='course' :current='page'  @redirect='redirect', :account='account', :completedUnlogged='completedUnlogged')

    Body(:course='current' :locked='locked')

    aside.aside(v-if="!locked" v-cloak)
      .control-group
        Download(:courseLink='current.downloadLink', :account='account')
        SocialShare(:lesson='current' :category='category')

      Resources(:resources='current.resources')
      Challenges(:challenges='current.codingChallenge')
      .text-center
        a.button.primary.border(href="https://www.facebook.com/groups/152305585468331/") Discuss in our Facebook Group
        router-link.button.inverted.-small(to="/contact") Send us Feedback

    Nav(:lessons='course.lessons' :selected='selected' @redirect='redirect' v-if="current")

    Popup(@redirect='redirect')

  .lesson-container(v-else)
    .header.fake
    .video.fake
      PlayerPlaceholder
    .list.fake
      ul.list-unstyled
        each val in [1, 2, 3]
          li
            .media-block.fake
              .media.-small.fake
              .body.fake
    .content.fake
    .aside.fake

</template>

<script>
import { mapState } from 'vuex'
import Header from '~/components/lessons/Header'
import Video from '~/components/lessons/Video'
import List from '~/components/lessons/List'
import Body from '~/components/lessons/Body'
import Nav from '~/components/lessons/Navigation'
import Resources from '~/components/lessons/resources'
import Challenges from '~/components/lessons/Challenges'
import Popup from '~/components/lessons/Popup'
import Download from '~/components/lessons/Download'
import Unlock from '~/components/lessons/Unlock'
import SocialShare from '~/components/lessons/SocialSharing'
import PlayerPlaceholder from '~/components/static/PlayerPlaceholder'

export default {
  middleware: 'anonymous',
  head () {
    return {
      title: `${this.course.title}: ${this.current.title}`,
      meta: [{
        hid: `og:description`,
        name: 'description',
        content: this.current.description
      }, {
        hid: 'og:url',
        property: 'og:url',
        content: `${process.env.url}/courses/${this.$route.params.lesson}/${this.$route.params.slug}`
      }, {
        hid: `og:title`,
        property: 'og:title',
        content: `${this.course.title}: ${this.current.title}`
      }, {
        hid: `og:image`,
        property: 'og:image',
        content: this.current.image[0].url || 'https://www.vuemastery.com/'
      }, {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: this.current.title
      }, {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: this.current.description
      }, {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: this.current.image[0].url || 'https://www.vuemastery.com/'
      }]
    }
  },

  data () {
    return {
      category: this.$route.params.lesson,
      page: this.$route.params.slug,
      selected: null
    }
  },

  async fetch ({ store }) {
    await store.dispatch('getCourse', this.category)
  },

  components: {
    Header,
    Video,
    List,
    Body,
    Nav,
    Resources,
    Challenges,
    Popup,
    SocialShare,
    Download,
    Unlock,
    PlayerPlaceholder
  },

  computed: {
    ...mapState({
      course: result => result.courses.course,
      account: result => result.account.account,
      completedUnlogged: result => result.account.completedUnlogged
    }),

    current () {
      let currentPage = null
      // If no lesson selected, get the first one of the course
      if (this.page === null) this.page = this.course.lessons[0].slug
      this.course.lessons.map((lesson, index) => {
        // Find the selected lesson in the list
        if (this.page === lesson.slug) {
          // Load the current lesson
          currentPage = lesson
          // Keep track of lesson index for the carousel
          this.selected = index
        }
      })
      return currentPage
    },

    locked () {
      return this.current.lock && !this.account
    },

    lockedStyle () {
      return {
        backgroundImage: `url(${this.current.image[0].url})`
      }
    }
  },

  methods: {
    redirect (slug) {
      this.$router.push(`/courses/${this.category}/${slug}`)
    },

    completed () {
      this.$store.dispatch('userUpdateCompleted', {
        page: this.page,
        category: this.category,
        isCompleted: true
      })
    },

    finished () {
      if (this.selected < this.course.lessons.length - 1) {
        this.$modal.show('next-lesson', {
          lesson: this.course.lessons[this.selected + 1],
          account: this.account
        })
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~assets/css/_variables'
.lesson-container
  display grid
  grid-template-columns 1fr 1fr
  grid-template-areas 'header'\
                      'video'\
                      'list'\
                      'content'\
                      'sidebar'\
                      'footer'
  +laptop-up()
    grid-template-columns 1fr 1fr 30%
    grid-template-areas 'header  header  header'\
                        'video   video   list'\
                        'content content sidebar'\
                        'footer  footer  footer'
.header
  grid-area header

.video
  grid-area video
  &.-locked
    position relative
    background $black
    width 100%
    height 300px
    background-size cover
    +tablet-up()
      height 500px

.content
  grid-area content

.aside
  grid-area sidebar
  padding 0 4%

  +laptop-up()
    padding 0 8%
  > div
    margin-bottom 20px

  .control-group
    justify-content center
    +laptop-up()
      justify-content space-evenly
    .button
      margin-right 4%
      +laptop-up()
        margin-right 0

.nav
  grid-area footer

  .aside
    margin $vertical-space 0

</style>
