<template lang='pug'>
.lesson-video(v-if='video && ready' v-cloak
              itemprop='video' itemscope itemtype='http://schema.org/VideoObject')
  meta(itemprop='name' :content='video.title')
  meta(itemprop='duration' :content='video.duration')
  meta(itemprop='thumbnailUrl' :content='video.image[0].url')
  //- meta(itemprop='contentURL' :content='url')
  meta(itemprop='embedURL' :content="'https://player.vimeo.com/video/'+video.videoEmbedId")
  meta(itemprop='uploadDate' :content='video.date')
  meta(itemprop='description' :content='video.description')
  vimeo-player.video-wrapper(ref='player'
                             player-width='860'
                             :video-id = 'video.videoEmbedId'
                             @progress='videoProgress'
                             @ready='onReady'
                             @ended='videoEnded()')
</template>

<script>
export default {
  name: 'lesson-video',

  props: {
    video: {
      type: Object,
      required: true
    },
    account: {
      type: Object,
      required: false
    },
    url: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      completed: false,
      ready: false
    }
  },

  mounted () {
    this.ready = true
  },

  watch: {
    account () {
      this.updatePlaybackRate()
    }
  },

  methods: {
    onReady () {
      this.$refs.player.play()
      this.$refs.player.player.on('playbackratechange', this.playbackratechange)
      this.updatePlaybackRate()
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
            this.$store.dispatch('userUpdatePlaybackRate', playbackRate)
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
