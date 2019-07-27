<template lang='pug'>
.actions
  .text.text-center(v-if='isSubscribed()' v-cloak) 
    h3 You are subscribed!
    p We will notify you when lessons are available.
    
  button.button.primary.border(v-else v-cloak
    @click.prevent='subscribedToMailingList()') Notify Me When Available

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
          Object.entries(this.account.courses[this.course.slug].completedLessons).forEach(
            ([key, value]) => {
              if (value) total++
            }
          )
          if (total >= this.course.lessonsCount) {
            return true
          }
        }
      } catch (error) {}
      return false
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
      if (this.account) {
        this.$store.dispatch('account/userUpdateSubscribe', this.course.slug)
      } else {
        this.openLogin()
      }
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
  position absolute
  overflow hidden
  top 0
  bottom 0
  width 100%
  background transparent
  transition all 0.2s

  .button
  .text
    position absolute
    top -50%
    left 50%
    transform translate(-50%, -50%)
    transition all 0.2s
  
  .text
    font-size 22px
    color $white

    h5
      margin: $size.by-0

  &:hover
    background rgba(0, 0, 0, 0.8)

    .button
    .text
      top 50%

</style>
