<template lang="pug">
  .container
    .conf-header
      .wrapper
        h1.title VueConf US
    .wrapper
      .callout.-success
        div
          courseSubscribe(:account="account" slug="vueConf" message="Notify me when new talks are available.")
      ConfList(:talks="talks" :account="account")
    CheatSheetAlt(location='Course page cheat sheet download')
</template>

<script>
import { mapState } from 'vuex'

import ConfList from '~/components/courses/ConfList'
import CheatSheetAlt from '~/components/static/CheatSheetAlt'
import courseSubscribe from '~/components/account/CourseSubscribe'

export default {
  middleware: 'anonymous',
  head () {
    return {
      title: 'Vue Mastery | VueConf US',
      meta: [{
        hid: 'og:url',
        property: 'og:url',
        content: `${process.env.url}/vue-conf`
      }]
    }
  },
  components: {
    ConfList,
    CheatSheetAlt,
    courseSubscribe
  },

  computed: {
    ...mapState({
      account: result => result.account.account,
      talks: result => result.courses.talks
    })
  },

  async fetch ({ store }) {
    await store.dispatch('talks')
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables'

.courses-header
  height 220px
  display flex
  align-items center
  background url(/static/images/bkg-courses.svg) no-repeat
  background-size cover

.title
  margin 0
  padding-top 0
  font-size 60px
  font-weight 600
  color blue
  line-height 60px

.callout
  display flex
  justify-content center

.courses-body
  display grid
  width 100%
  grid-column-gap 4%
  grid-row-gap 45px
  padding-top ($vertical-space/2)
  padding-bottom ($vertical-space/2)

  +laptop-up()
    grid-template-columns 63% 33%
</style>
