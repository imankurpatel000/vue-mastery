<template lang='pug'>
  .homepage(:class='{ready: ready}')
    .hero-wrapper
      .hero
        .text
          h1.title The ultimate learning resource for Vue developers
          p.lead Weekly Vue.js tutorials to guide your journey to Mastery.

      .actions
        nuxt-link.button.inverted(to='/courses') Explore courses
    .community
      CommunitySupport
    .cheatsheet
      CheatSheetMain
    LearnFromExperts
    .meet-teachers
      MeetTeachers
</template>

<script>
import MeetTeachers from '~/components/static/MeetTeachers'
import CommunitySupport from '~/components/static/CommunitySupport'
import CheatSheetMain from '~/components/static/CheatSheetMain'
import LearnFromExperts from '~/components/static/LearnFromExperts'

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

  data () {
    return {
      ready: false
    }
  },

  mounted () {
    this.ready = true
  },

  components: {
    MeetTeachers,
    CommunitySupport,
    CheatSheetMain,
    LearnFromExperts
  }
}
</script>

<style lang='stylus' scoped>
.homepage
  z-index: 2;
  position: relative;

  &.ready
    ::v-deep .title,
    .hero-wrapper
      opacity: 1
      transition: ease-in .3s 1.3s

::v-deep .title
  opacity: 0

.text
  position absolute
  color white
  top: 20%
  text-align: center
  padding: 0 15px;
  width: 100%
  height: 100%
  +tablet-up()
    top: 20%

  @media screen and (orientation: landscape) and (max-width: 40em)
    top: 90px

.hero-wrapper
  max-height: 92vh
  min-height: 600px
  position: relative
  opacity: 0

  @media (orientation: portrait)
    min-height: 600px

.hero
  height: 0;
  padding-top: 65%;

  .title
    max-width: 300px;
    padding-top 0
    margin 0 auto
    font-size: 24px;
    font-weight: 600;

    +tablet-up()
      font-size: 29px;
      max-width: 400px;

    +laptop-up()
      font-size: 40px;
      max-width 550px

.lead
  font-size: 16px;
  font-weight: 400;

.actions
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 50px;
  text-align: center;

  .button
    width: max-content

  +mobile-only()
    top: 58%;

.button
  width 100%

+tablet-up()
  .button
    width max-content
</style>
