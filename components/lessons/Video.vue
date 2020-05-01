<template lang='pug'>
.lesson-video-wrapper(:style='lockedStyle')
  Unlock(:free='current.free' v-if='restricted' v-cloak )
  
  .lesson-video(v-else)
    div(v-if='video' v-cloak
      itemprop='video' itemscope itemtype='http://schema.org/VideoObject')
      meta(itemprop='name' :content='current.title')
      meta(itemprop='duration' :content='current.duration')
      meta(itemprop='thumbnailUrl' :content='current.image[0].url')
      meta(itemprop='embedURL' :content="'https://player.vimeo.com/video/'+video.videoEmbedId")
      meta(itemprop='uploadDate' :content='current.date || current.uploadDate')
      meta(itemprop='description' :content='current.description')
      vimeo-player.video-wrapper(ref='player'
        player-width='860'
        autoplay='true'
        :video-id = 'video.videoEmbedId'
        @progress='videoProgress'
        @ready='onReady'
        @ended='videoEnded()')

</template>

<script>
import Unlock from '~/components/lessons/Unlock'

export default {
  name: 'lesson-video',

  components: {
    Unlock
  },

  props: {
    current: {
      type: Object,
      required: false
    },
    video: {
      type: Object,
      required: false
    },
    account: {
      type: Object,
      required: false
    },
    url: {
      type: String,
      required: true
    },
    restricted: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      completed: false
    }
  },

  watch: {
    video () {
      this.$nextTick(() => {
        this.updatePlaybackRate()
      })
    }
  },

  computed: {
    lockedStyle () {
      const imageUrl = this.current.image ? `url(${this.current.image[0].url})` : ''
      return {
        backgroundImage: imageUrl
      }
    }
  },

  methods: {
    onReady () {
      const player = this.$refs.player
      player.player.on('playbackratechange', this.playbackratechange)
      this.updatePlaybackRate()
      // player.play()
    },

    videoProgress (data) {
      if (data.percent > 0.85 && !this.completed) {
        this.$emit('completed')
        this.completed = true
      }
    },

    videoEnded () {
      this.$emit('videoEnded')
    },

    playbackratechange () {
      this.$refs.player.player
        .getPlaybackRate()
        .then((playbackRate) => {
          if (this.account) {
            this.$store.dispatch('account/userUpdatePlaybackRate', playbackRate)
          } else {
            window.localStorage.setItem('playbackRate', playbackRate)
          }
        })
    },

    setPlayback (rate) {
      if (rate) {
        this.$refs.player.player
          .getPlaybackRate()
          .then((playbackRate) => {
            if (rate !== playbackRate) {
              this.$refs.player.player.setPlaybackRate(rate)
            }
          })
      }
    },

    updatePlaybackRate () {
      this.setPlayback(this.account ? this.account.playbackRate : window.localStorage.playbackRate)
    }
  }
}
</script>

<style lang="stylus" scoped>
.lesson-video-wrapper
  grid-area video
  position relative
  background $black
  width 100%
  padding-bottom 56.25%
  background-size auto 100%
  background-position center
  background-repeat no-repeat

.lesson-video
  position absolute
  top 0
  width 100%

</style>