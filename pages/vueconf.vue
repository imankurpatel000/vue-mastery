<template lang='pug'>
  .container.vue-conf-page
    PageHeader(:title='conference.title'
      :title2='conference.location'
      :background_image='conference.banner[0].url'
      align='center')

    .wrapper
      .body
        h4.lead {{ conference.titleLine1 }}
        p.lead {{ conference.description }}

      ConfList(:account='account' :conference='conference')
</template>

<script>
import { mapState } from 'vuex'
import ConfList from '~/components/courses/ConfList'
import CheatSheetAlt from '~/components/static/CheatSheetAlt'
import CourseSubscribe from '~/components/account/CourseSubscribe'
import PageHeader from '~/components/ui/PageHeader'

export default {
  name: 'page-vueconf',

  middleware: 'anonymous',

  head () {
    return {
      title: 'VueConf US | Vue Mastery',
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
    CourseSubscribe,
    PageHeader
  },

  computed: {
    ...mapState({
      account: result => result.account.account,
      conference: result => result.courses.conference
    })
  },

  async fetch ({ store, params }) {
    await store.dispatch('getConference', 'vueconf-us-2018')
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
