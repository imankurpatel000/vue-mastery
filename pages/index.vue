<template lang='pug'>
.homepage
  Hero
  LevelUp
  StaySharp
  CommunitySupport
  CheatSheetMain
  .bg-wrapper.experts-teachers
    LearnFromExperts
    MeetTeachers
    ProTips
</template>

<script>
import Hero from '~/components/static/Hero'
import LevelUp from '~/components/static/LevelUp'
import StaySharp from '~/components/static/StaySharp'
import MeetTeachers from '~/components/static/MeetTeachers'
import CommunitySupport from '~/components/static/CommunitySupport'
import CheatSheetMain from '~/components/static/CheatSheetMain'
import LearnFromExperts from '~/components/static/LearnFromExperts'
import ProTips from '~/components/static/ProTips'

export default {
  name: 'page-home',

  middleware: 'anonymous',

  head () {
    return {
      title: 'Vue Mastery | The Ultimate Learning Resource for Vue.js Developers',
      meta: [{
        hid: `og:url`,
        property: 'og:url',
        content: process.env
      }],
      __dangerouslyDisableSanitizers: ['script'],
      script: [{
        type: 'application/ld+json',
        json: {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          url: process.env.baseUrl,
          potentialAction: [{
            '@type': 'SearchAction',
            target: 'https://www.vuemastery.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string'
          }]
        }
      }]
    }
  },

  components: {
    Hero,
    LevelUp,
    StaySharp,
    CommunitySupport,
    MeetTeachers,
    CheatSheetMain,
    LearnFromExperts,
    ProTips
  }
}
</script>

<style lang='stylus' scoped>
.bg-wrapper
  position relative
  overflow hidden
  background-size cover
  background-attachment fixed
  background-position center
  -webkit-overflow-scrolling touch

  &::before,
  &::after
    content ''
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    background-size cover
    background-position center bottom
    background-repeat no-repeat
    z-index 1

  &::before
    /* Move the pseudo-element back away from the camera,
    * then scale it back up to fill the viewport.
    * Because the pseudo-element is further away, it appears to move more slowly, like in real life. */
    transform translateZ(-1px) scale(1.5)
    bottom -1px // Remove bottom artfacts
    left -4px // Remove bottom artfacts

.experts-teachers
  &::before
    background-image url(/images/homepage/bg.svg)
</style>
