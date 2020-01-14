<template lang='pug'>
.actions
  div(v-if='course.lessonsCount && !course.pushToSubscribe || course.completable' v-cloak)
    span {{ inProgress || course.lessonsCount + ` Lesson${course.lessonsCount > 1 ? 's' : ''}` }}
    div(v-if='checkCourseStarted' v-cloak)
      .button.primary.-full(v-if='isCourseCompleted' v-cloak)
        | Replay

      .button.secondary.border.-full(v-else)
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
    }),

    checkCourseStarted () {
      let started = false
      try {
        started = this.account.courses[this.course.slug].started
      } catch (error) {}
      return started
    },

    isCourseCompleted () {
      try {
        let total = 0
        if (this.course.completable) {
          if (this.account.courses[this.course.slug]) {
            Object.entries(this.account.courses[this.course.slug].completedLessons).forEach(
              ([key, value]) => {
                if (value) total++
              }
            )
          }
          if (total >= this.course.lessonsCount) {
            return true
          }
        }
      } catch (error) {}
      return false
    },

    inProgress () {
      let progression = 0
      // Check if user started the course
      if (this.account && this.account.hasOwnProperty('courses') && this.account.courses.hasOwnProperty(this.course.slug)) {
        const startedCourse = this.account.courses[this.course.slug]
        if (startedCourse.hasOwnProperty('completedLessons')) {
          let completedLessons = Object.values(startedCourse.completedLessons).filter(completed => completed).length
          // Check how many lessons are completed
          if (completedLessons > this.course.lessonsCount) completedLessons = this.course.lessonsCount
          progression = `${completedLessons} / ${this.course.lessonsCount} lesson${completedLessons > 1 ? 's' : ''} completed`
        }
      }
      return progression
    }
  },

  mounted () {
    if (this.$route.query.subscribe === this.course.slug) {
      this.subscribedToMailingList()
    }
  },

  methods: {
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
      this.$store.dispatch('account/userUpdateSubscribe', this.course.slug)
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
