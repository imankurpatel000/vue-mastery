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

  methods: {
    onReady () {
      this.$refs.player.play()
    },

    videoProgress (data) {
      if (data.percent > 0.85 && !this.completed) {
        this.$emit('lessonCompleted')
        this.completed = true
      }
    },

    videoEnded () {
      this.$emit('videoEnded')
    }
  }
}
</script>
