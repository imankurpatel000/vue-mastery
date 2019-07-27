<template lang='pug'>
  .container.vue-conf-page
    PageHeader(:title='conference.title'
      :title2='conference.location'
      :background_image='conference.banner[0].url'
      align='center')

    .wrapper
      .body
        p.lead {{ conference.titleLine1 }}
        p.lead {{ conference.description }}

      ConfList(:account='account' :conference='conference')
</template>

<script>
import { mapState } from 'vuex'
import ConfList from '~/components/courses/ConfList'
import CheatSheetAlt from '~/components/static/CheatSheetAlt'
import PageHeader from '~/components/ui/PageHeader'

export default {
  name: 'page-vueconf',

  middleware: 'anonymous',

  head () {
    const d = this.conference
    const title = `${d.title} | Vue Mastery`
    const image = d.facebookImage[0].url || d.banner[0].url || `${process.env.url}/images/facbeook_image.png`
    const description = `Watch ${d.talks.length} videos from ${d.title}, which took place in ${d.location} on ${d.titleLine1}`
    return {
      title: title,
      meta: [{
        hid: `description`,
        name: 'description',
        content: description
      }, {
        hid: `og:description`,
        name: 'og:description',
        content: description
      }, {
        hid: 'og:url',
        property: 'og:url',
        content: `${process.env.url}/conferences/${d.slug}`
      }, {
        hid: `og:title`,
        property: 'og:title',
        content: title
      }, {
        hid: `og:image`,
        property: 'og:image',
        content: image
      }, {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: title
      }, {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: description
      }, {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: d.twitterImage[0].url || image
      }]
    }
  },

  components: {
    ConfList,
    CheatSheetAlt,
    PageHeader
  },

  computed: {
    ...mapState({
      account: result => result.account.account,
      conference: result => result.courses.conference
    })
  },

  async fetch ({ store, params }) {
    await store.dispatch('courses/getConference', params.conference)
  }
}
</script>

<style lang='stylus' scoped>
.courses-header
  height 220px
  display flex
  align-items center
  background url(/static/images/bkg-courses.svg) no-repeat
  background-size cover

.title
  margin 0
  padding-top 0
  color $secondary-color
  font-weight 600
  line-height 60px

.callout
  display flex
  justify-content center

  >>> form
    width: auto

.body
  justify-self center
  text-align center
  max-width 700px
  margin-bottom ($vertical-space/4)
  +tablet-up()
    margin-bottom ($vertical-space/3)

.lead
  margin-top 0
  +tablet-up()
    font-size 22px

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
