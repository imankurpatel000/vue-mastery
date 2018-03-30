<template lang='pug'>
div
  .lesson-wrapper(v-if='course'  v-cloak)
    Header(:course='course')

    Video(v-if='current && !locked'
          :videoId = 'current.videoEmbedId'
          @videoEnded='finished'
          @completed='completed')
    
    .video.-locked(v-else :style='lockedStyle')
      Unlock(:account='account')

    List(:course='course'
         :current='page'
         :account='account'
         :completed-unlogged='completedUnlogged'
         :isLesson='isLesson'
         @redirect='redirect')

    Body(:course='current' :locked='locked')

    aside.lesson-aside(v-if='!locked' v-cloak)
      .control-group(v-if='isLesson' v-cloak)
        Download(:courseLink='current.downloadLink', :account='account')
        SocialShare(:lesson='current' :category='category')

      .card.download(v-else)
        .card-body
          h3 Download the Vue Cheat Sheet
          p All the essential syntax at your fingertips
          DownloadButton(button-class='inverted' location='Vueconf download button')

      Resources(v-if='current.resources' v-cloak
                :resources='current.resources')
    
      Challenges(v-if='current.codingChallenge' :challenges='current.codingChallenge')
    
      .text-center(v-if='isLesson')
        a.button.primary.border(href='https://www.facebook.com/groups/152305585468331/') Discuss in our Facebook Group
        router-link.button.inverted.-small(to='/contact') Send us Feedback

    Nav(v-if='current'
        :lessons='course.lessons'
        :selected='selected'
        @redirect='redirect')

    Popup(@redirect='redirect')

  .container(v-else)
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
    .lesson-aside.fake

</template>

<script>
import Body from '~/components/lessons/Body'
import Challenges from '~/components/lessons/Challenges'
import Download from '~/components/lessons/Download'
import Header from '~/components/lessons/Header'
import List from '~/components/lessons/List'
import Nav from '~/components/lessons/Navigation'
import Popup from '~/components/lessons/Popup'
import Resources from '~/components/lessons/Resources'
import SocialShare from '~/components/lessons/SocialSharing'
import Unlock from '~/components/lessons/Unlock'
import Video from '~/components/lessons/Video'
import PlayerPlaceholder from '~/components/static/PlayerPlaceholder'
import DownloadButton from '~/components/static/DownloadButton'

export default {
  name: 'wrapper-lesson',

  props: {
    category: {
      type: String,
      required: true
    },
    page: {
      type: String,
      required: true
    },
    course: {
      type: Object,
      required: true
    },
    account: {
      type: Object
    },
    current: {
      type: Object,
      required: true
    },
    completedUnlogged: {
      type: Object,
      required: true
    },
    selected: {
      type: Number
    },
    isLesson: {
      type: Boolean,
      default: true
    }
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
    PlayerPlaceholder,
    DownloadButton
  },

  computed: {
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
.lesson-wrapper
  display grid
  grid-template-columns 1fr
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
.lesson-header
  grid-area header

.lesson-video
  grid-area video
  &.-locked
    position relative
    background $black
    width 100%
    height 300px
    background-size cover
    +tablet-up()
      height 500px

.lesson-content
  grid-area content

.lesson-aside
  grid-area sidebar
  padding 0 4%

  +laptop-up()
    padding 0 8%
    margin $vertical-space 0

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

.lessons-nav
  grid-area footer


.download
  color white
  text-align center
  align-items center
  background-image url(/images/bkg-cheatsheet-main.jpg)
  margin-bottom ($vertical-space/2)

  .button
    margin 0 auto
</style>
