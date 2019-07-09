<template lang="pug">
aside.lesson-aside
  .sticky
    .card
      .card-body
        Download(v-if="lesson" v-cloak
                :courseLink='lesson.downloadLink'
                :account='account')

        SocialShare(:lesson='current'
                  :baseUrl='baseUrl')

      .card-space(v-if='lesson' v-cloak)
        Resources(v-if='lesson.resources'
                  :resources='lesson.resources')

        Challenges(v-if='lesson.codingChallenge'
                  :challenges='lesson.codingChallenge')


    .card.download(v-if='!isLesson' v-cloak)
      .card-body
        h3 Download the Vue Cheat Sheet
        p All the essential syntax at your fingertips
        DownloadButton(button-class='inverted' location='Vueconf download button')

    .card.download(v-if='!isLesson' v-cloak)
      .card-body
        h3 Download the Nuxt.js Cheat Sheet
        p All the Nuxt.js syntax at your fingertips
        DownloadButtonNuxt(button-class='inverted' location='Vueconf download button')

    .card.communication.text-center(v-if='isLesson')
      .card-body
        a.button.primary.border.-full(href='https://www.facebook.com/groups/152305585468331/') Discuss in our Facebook Group
        router-link.button.inverted.-small(to='/contact')
          Icon(name="send")
          | Send us Feedback
</template>

<script>
import Resources from '~/components/lessons/Resources'
import Challenges from '~/components/lessons/Challenges'
import Download from '~/components/lessons/Download'
import SocialShare from '~/components/lessons/SocialSharing'
import DownloadButton from '~/components/static/DownloadButton'
import DownloadButtonNuxt from '~/components/static/DownloadButtonNuxt'
import Icon from '~/components/ui/Icon'

export default {
  name: 'lesson-sidebar',

  props: {
    account: {
      type: Object,
      required: false
    },
    course: {
      type: Object,
      required: true
    },
    current: {
      type: Object,
      required: true
    },
    isLesson: {
      type: Boolean,
      default: true
    },
    free: {
      type: Boolean,
      default: false
    },
    lesson: {
      type: Object,
      required: false
    },
    affixToElement: {
      type: String,
      required: true
    }
  },

  components: {
    Resources,
    Challenges,
    Download,
    DownloadButton,
    DownloadButtonNuxt,
    SocialShare,
    Icon
  },

  computed: {
    baseUrl () {
      return `/${this.isLesson ? 'courses' : 'conferences'}/${this.course.slug}/`
    }
  }
}
</script>

<style lang="stylus" scoped>
.lesson-aside
  grid-area sidebar
  padding 0 4% 20px


  +laptop-up()
    margin $vertical-space 0

  .control-group
    justify-content center

    +laptop-up()
      justify-content space-evenly

    .button
      margin-right 4%

      +laptop-up()
        margin-right 0

.sticky
  position sticky
  top 20px

  +laptop-up()
    margin-right 1.2%

.card
  flex-flow column

  .card-space
    display flex
    flex-flow column

    +tablet-up()
      flex-flow row

    +laptop-up()
      flex-flow column

    > .card-body
      border-top solid 1px #E6E8EB
      &:last-of-type
        border-left none
        +tablet-up()
          border-left solid 1px #E6E8EB
        +laptop-up()
          border-left none

.download
  margin-top 24px
  color white
  text-align center
  align-items center
  background-image url(/images/bkg-cheatsheet-main.jpg)
  margin-bottom ($vertical-space/2)

  .button
    margin 0 auto

.communication
  margin-top 24px

  > .button
    display inline-flex
    align-items center
</style>
