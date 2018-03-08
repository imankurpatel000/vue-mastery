<template lang="pug">
  .lesson-video.video-wrapper(v-if="videoId && ready" v-cloak)
    vimeo-player(ref="player" :video-id = "videoId" player-width="860" @progress="videoProgress" @ready="onReady" @ended="videoEnded()")
</template>

<script>
export default {
  name: 'vimeo',
  props: ['videoId'],
  data () {
    return {
      completed: false,
      ready: false
    }
  },
  mounted() {
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
