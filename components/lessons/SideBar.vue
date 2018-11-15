<template lang="pug">
aside.lesson-aside
  affix(ref='affix'
    :relative-element-selector='affixToElement'
    :offset='{ top: 20, bottom: 20 }',
    :enabled='enableAffix')
    .card
      .card-body
        Download( v-if="!locked"
                :courseLink='current.downloadLink'
                :account='account')

        SocialShare(:lesson='current'
                  :baseUrl='baseUrl')

      .card-space
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
    },
    free: {
      type: Boolean,
      default: false
    },
    locked: {
      type: Boolean,
      default: true
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
    SocialShare,
    Icon
  },

  data () {
    return {
      windowWidth: null,
      enableAffix: false,
      debounceTimer: setTimeout(() => {})
    }
  },

  mounted () {
    this.calculateWindowWidth()
    this.addAffix()
  },

  computed: {
    baseUrl () {
      return `/${this.isLesson ? 'courses' : 'conferences'}/${this.category}/`
    },

    relativeElement () {
      if (process.browser) {
        return document.querySelector(this.affixToElement)
      }
    }
  },

  methods: {
    calculateWindowWidth () {
      this.windowWidth = window.innerWidth
    },

    handleResize () {
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => {
        this.calculateWindowWidth()
        this.addAffix()
      }, 100)
    },

    mediaBreakpointUp (width) {
      return (this.windowWidth > width)
    },

    affixTooLarge (element) {
      const yPadding = 80
      return (this.$refs.affix.affixHeight + yPadding > element.offsetHeight)
    },

    addAffix () {
      if (this.mediaBreakpointUp(1024) && !this.affixTooLarge(this.relativeElement)) {
        this.enableAffix = true
      }
    }
  },

  created () {
    if (process.browser) {
      window.addEventListener('resize', this.handleResize)
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style lang="stylus" scoped>
.lesson-aside
  grid-area sidebar
  padding 0 4% 20px


  +laptop-up()
    margin $vertical-space 0

  .vue-affix.affix
    margin-right 1.2%

  .control-group
    justify-content center

    +laptop-up()
      justify-content space-evenly

    .button
      margin-right 4%

      +laptop-up()
        margin-right 0

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
