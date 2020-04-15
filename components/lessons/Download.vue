<template lang='pug'>
client-only
  a.button.secondary.-full(
    v-cloak
    v-if='account'
    :href='courseLink'
    download
  )
    Icon(name='download-cloud')
    | Download Video

  //- FREE PERIOD
  //- button.button.secondary.-full(v-else v-cloak @click='openLogin')
  //-   Icon(name='download-cloud')
  //-   | Download Video
</template>

<script>
import Icon from '~/components/ui/Icon'
export default {
  name: 'lesson-download-button',
  components: {
    Icon
  },
  props: {
    account: {
      type: Boolean,
      required: false
    },
    courseLink: {
      type: String,
      default: false
    }
  },

  methods: {
    openLogin () {
      this.$modal.show('login-form', {
        newAccount: true,
        headerTitle: 'Sign up to download the video',
        location: 'Lesson page download button'
      })
    }
  }
}
</script>

<style lang='stylus' scoped>
.button
  display inline-flex
</style>
