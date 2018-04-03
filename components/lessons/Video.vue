<template lang='pug'>
.lesson-video(v-if='videoId && ready' v-cloak)
  vimeo-player.video-wrapper(ref='player'
                             player-width='860'
                             :video-id = 'videoId'
                             @progress='videoProgress'
                             @ready='onReady'
                             @ended='videoEnded()')
</template>

<script>
export default {
  name: 'lesson-video',

  props: {
    videoId: {
      type: String,
      required: true
    },
    account: {
      type: Object,
      required: false
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
        this.$emit('lessonCompleted')
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
