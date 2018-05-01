<template lang='pug'>
.actions
  div(v-if='course.lessonsCount && !course.pushToSubscribe' v-cloak)
    span(v-if="course.hasOwnProperty('progression')") {{course.progression}}
    span(v-else) {{ course.lessonsCount | pluralizeLesson }}
    .button.primary.-full(v-if='checkCourseStarted()' v-cloak)
      | Resume

    .button.secondary.border.-full(v-else v-cloak)
      | Play

  div(v-else v-cloak)
    span(v-if="course.hasOwnProperty('progression')") {{course.progression}}
    div(v-if='isSubscribed()')
      .progression(v-if='course.pushToSubscribe' v-cloak) More Coming Soon
      span Subscribed
    div(v-else)
      .progression(v-if='course.pushToSubscribe' v-cloak) More Coming Soon
      span(v-else v-cloak) Coming Soon

      .button.primary.border.-full(@click.prevent='subscribedToMailingList()' v-if='account' v-cloak)
        | Notify Me

      button.button.primary.border.-full(v-else v-cloak @click.prevent='openLogin()') Notify Me
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'courses-list-action',

  props: {
    course: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState({
      account: result => result.account.account
    })
  },

  mounted () {
    if (this.$route.query.subscribe === this.course.slug) {
      this.subscribedToMailingList()
    }
  },

  methods: {
    checkCourseStarted () {
      let started = false
      try {
        started = this.account.courses[this.course.slug].started
      } catch (error) {}
      return started
    },

    isSubscribed () {
      let subscribed = false
      if (this.account && typeof (this.account['courses']) !== 'undefined') {
        const completedCourse = this.account.courses[this.course.slug]
        if (completedCourse) {
          subscribed = completedCourse.subscribed || false
        }
      }
      return subscribed
    },

    subscribedToMailingList () {
      this.$store.dispatch('userUpdateSubscribe', this.course.slug)
    },

    openLogin () {
      let options = {
        newAccount: true,
        headerTitle: 'Sign Up Free to Get Notified',
        location: 'Course page notify me'
      }
      if (!this.account) options.redirect = `/courses?subscribe=${this.course.slug}`
      this.$modal.show('login-form', options)
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~assets/css/_variables'

.actions
  display flex
  align-items center
  justify-content center
  width 100%
  text-align: center
  margin-top 20px

  +tablet-up()
    width 200px
    margin-left 4%
    margin-top: 0

  span
    font-weight: 700

.progression
  margin-top: 5px
  margin-bottom: 10px
</style>
