<template lang="pug">
aside.lesson-aside
  div(ref="sidebarContent" :class="sidebarStyles")
    .card
      .card-body
        Download(v-if='current.free'
              :courseLink='current.downloadLink'
              :account='account')

        SocialShare(:lesson='current'
                  :baseUrl='baseUrl')

        Resources(v-if='current.resources'
                  :resources='current.resources'
                  v-cloak)

        Challenges(v-if='current.codingChallenge'
                  :challenges='current.codingChallenge')


    .card.download(v-if='!isLesson' v-cloak)
      .card-body
        h3 Download the Vue Cheat Sheet
        p All the essential syntax at your fingertips
        DownloadButton(button-class='inverted' location='Vueconf download button')

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
    }
  },

  components: {
    Resources,
    Challenges,
    Download,
    DownloadButton,
    SocialShare,
    Icon
  },

  data () {
    return {
      sidebar: {
        height: 0,
        windowHeight: 0,
        windowScrollTop: 0
      },
      debounceTimer: setTimeout(() => {})
    }
  },

  mounted () {
    this.calculateSidebar()
  },

  computed: {
    baseUrl () {
      return `/${this.isLesson ? 'courses' : 'conferences'}/${this.category}/`
    },

    sidebarStyles () {
      if (this.sidebar.height <= this.sidebar.windowHeight) {
        return { 'fixed-top': true }
      }

      if ((this.sidebar.windowScrollTop + this.sidebar.windowHeight) > this.sidebar.height) {
        return { 'fixed-bottom': true }
      }
    }
  },

  methods: {
    calculateSidebar () {
      this.sidebar.height = this.$refs.sidebarContent.offsetHeight
      this.sidebar.windowHeight = window.innerHeight
    },

    handleResize () {
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        this.calculateSidebar()
      }, 100)
    },

    handleScroll () {
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        this.sidebar.windowScrollTop = window.pageYOffset || document.documentElement.scrollTop
      }, 100)
    }
  },

  created () {
    if (process.browser) {
      window.addEventListener('resize', this.handleResize)
      window.addEventListener('scroll', this.handleScroll)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables'
.lesson-aside
  grid-area sidebar
  padding 0 4%

  +laptop-up()
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

.fixed-top
  position fixed
  top 10px

.fixed-bottom
  position fixed
  bottom 10px

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
