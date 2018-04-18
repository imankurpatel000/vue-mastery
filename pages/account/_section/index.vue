<template lang='pug'>
.wrapper
  .account(v-if='account' v-cloak)
    .account-image
      a(:href='account.image' target='_blank' title='Click To View')
        img(:src='account.image' width='100' height='100' :alt='imageAlt')

    .account-info
      h3(v-text='account.displayName')

  .account-actions
    button.tab(type='button'
               v-for='tab in tabs'
               :disabled='!account'
               :class="{'active-tab': selectedTab == tab}"
               @click='goTo(tab)' ) {{ tab.replace('_', ' ') }}

    button.tab(@click="openPortal") My Subscription

  div.account-content
    div.course-list(v-if="selectedTab == 'dashboard'" v-cloak)
      div.main-course-list
        h3.title In Progress
        CourseList(v-if='Object.keys(inProgress).length !== 0' v-cloak
                   :courses='inProgress'
                   :account='account')
        .empty(v-else)
          div
            h4.empty-title You have no courses currently in progress
            p Get started by browsing our recommended course list.
            button.button.secondary.border.-small(type='button'
                                                  @click='scrollTo'
                                                  data-target='recommended') Browse Courses

      div.completed-course-list
        aside.completed-course-list
          h3.title Completed Courses
          CourseList(v-if='Object.keys(completed).length !== 0' v-cloak
                     :courses='completed'
                     :account='account')
          .empty(v-else)
            h4.empty-title You have not completed any courses yet

      aside.recommend-course-list
        .card.download
          .card-body
            h3 Download the Vue Cheat Sheet
            p All the essential syntax at your fingertips
            DownloadButton(buttonClass='inverted' location='Dashboard download button')
        #recommended
          h3.title Recommended Courses
          CourseGrid(v-if='Object.keys(recommended).length !== 0' v-cloak
                     :courses='recommended'
                     :account='account')

    div.settings(v-if="selectedTab == 'profile'" v-cloak)
      .profile-settings
        h3.title Update Profile

        EditAccountForm(:account='account' v-if='account')

    div(v-else-if="selectedTab == 'account_settings'" v-cloak)
      AccountSettings
</template>

<script>
import { mapState } from 'vuex'
import EditAccountForm from '~/components/account/EditAccountForm.vue'
import CourseList from '~/components/courses/All.vue'
import CourseGrid from '~/components/courses/Grid.vue'
import BadgeGrid from '~/components/courses/BadgeGrid.vue'
import AccountSettings from '~/components/account/AccountSettings.vue'
import DownloadButton from '~/components/static/DownloadButton'
import axios from 'axios'

export default {
  name: 'page-dashboard',

  middleware: 'authenticated',

  components: {
    EditAccountForm,
    CourseList,
    CourseGrid,
    BadgeGrid,
    AccountSettings,
    DownloadButton
  },

  data () {
    return {
      tabs: ['dashboard', 'profile', 'account_settings'],
      editing: false,
      selectedTab: this.$route.params.section || 'dashboard',
      completed: {},
      recommended: {},
      uncompleted: {},
      portalLink: '',
      chargebeeInstance: null,
      chargebeePortalInstance: null
    }
  },

  transition (from, to) {
    if (from && to) {
      const fromArray = from.path.split('/')
      const toArray = to.path.split('/')
      if (fromArray.length > 2 && toArray.length > 2) {
        return fromArray[1] === toArray[1] ? 'settings' : 'page'
      }
    }
    return 'page'
  },

  computed: {
    ...mapState({
      account: result => result.account.account,
      courses: result => result.courses.courses
    }),

    inProgress () {
      for (let courseId in this.courses) {
        let category = 'recommended'
        const course = this.courses[courseId]
        // Check if user started the course
        if (this.account && this.account.hasOwnProperty('courses') && this.account.courses.hasOwnProperty(course.slug)) {
          const startedCourse = this.account.courses[course.slug]
          if (startedCourse.hasOwnProperty('completedLessons')) {
            const completedLessons = Object.values(startedCourse.completedLessons).filter(completed => completed).length
            // Check how many lessons are completed
            course.progression = `${completedLessons} / ${course.lessonsCount} lesson${completedLessons > 1 ? 's' : ''} completed`
            if (course.completable) {
              category = completedLessons >= course.lessonsCount ? 'completed' : 'uncompleted'
            } else {
              if (completedLessons >= course.lessonsCount) {
                course.pushToSubscribe = true
              }
              category = 'uncompleted'
            }
          }
        }
        this[category][courseId] = course
      }
      return this.uncompleted
    },

    imageAlt () {
      return `${this.account.displayName} profile image`
    },

    openPortal () {
      if (this.chargebeePortalInstance) {
        this.chargebeePortalInstance.open({
          loaded () {
            // called when chargebee portal is loaded
          },
          close () {
            // called when chargebee portal is closed
          },
          visit (sectionName) {
            // called whenever the customer navigates across different sections in portal
          },
          paymentSourceAdd () {
            // called whenever a new payment source is added in portal
          },
          paymentSourceUpdate () {
            // called whenever a payment source is updated in portal
          },
          paymentSourceRemove () {
            // called whenever a payment source is removed in portal.
          },
          subscriptionChanged (data) {
            // called whenever a subscription is changed
            // data.subscription.id will give you the subscription id
            // Make sure you whitelist your domain in the checkout settings page
          },
          subscriptionCancelled (data) {
            // called when a subscription is cancelled
            // data.subscription.id will give you the subscription id
            // Make sure you whitelist your domain in the checkout settings page
          }
        })
      }
    }
  },

  watch: {
    account () {
      if (!this.chargebeeInstance) {
        this.getPortalLink()
      }
    },

    $route (to, from) {
      this.selectedTab = this.$route.params.section
    }
  },

  mounted () {
    this.$store.dispatch('getAllCourses')

    if (!process.server) {
      this.chargebeeInstance = window.Chargebee.init({
        site: 'vuemastery-test',
        domain: process.env.url
      })

      if (this.account && !this.chargebeeInstance) {
        this.getPortalLink()
      }
    }
  },

  methods: {
    toggleEditForm () {
      this.editing = !this.editing
    },

    scrollTo: function (e) {
      let target = e.currentTarget.dataset.target
      let element = document.getElementById(target)
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      element.classList.add('-flash')
      setTimeout(function () {
        element.classList.remove('-flash')
      }, 1000)
    },

    signOut () {
      this.$store.dispatch('userLogout')
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
        })
    },

    goTo (tab) {
      this.selectedTab = tab
      this.$router.replace(`/account/${tab}`, false)
    },

    getPortalLink () {
      console.log('Get portal link method', this.chargebeeInstance, this.chargebeeInstance.setPortalSession)
      this.chargebeeInstance.setPortalSession(() => {
        console.log('Get portal Session')
        this.chargebeePortalInstance = axios.post('/create_portal_session', {
          customer_id: this.account.key
        })
          .then((response) => {
            console.log('Charge be response.data', response.data)
          })
      })
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~assets/css/_variables'
.settings
  display flex
  justify-content center

.account
  display flex
  justify-items flex-start
  align-items center
  margin ($vertical-space/3) 0

.account-image
  margin-right 20px
  width 100px

  img
    border-radius 100px
    overflow hidden

.account-info
  color $secondary-color

.course-list
  display grid
  grid-template-areas 'main'\
                      'recommend'\
                      'completed'
  +laptop-up()
    grid-template-columns 63% 33%
    grid-column-gap: 4%
    grid-template-areas 'main recommend'\
                        'completed recommend'\


.main-course-list,
.completed-course-list,
.recommend-course-list,
.earned-badge-list,
.profile-settings
  .title
    color $secondary-color
    font-weight 600
    margin-bottom: 22px

    +tablet-up()
      font-size 40.5px

.main-course-list
  grid-area main
  margin-bottom $vertical-space

.completed-course-list
  grid-area completed
  grid-row span 2
  margin-bottom ($vertical-space/2)

.recommend-course-list
  grid-area recommend
  margin-bottom $vertical-space

.earned-badge-list
  grid-area aside
  margin-bottom $vertical-space

.account-actions
  display flex
  justify-items flex-start
  margin-bottom: ($vertical-space/2)
  border-bottom solid 2px $secondary-color

.download
  color #FFFFFF
  text-align center
  align-items center
  background-image url(/images/bkg-cheatsheet-main.jpg)
  margin-bottom ($vertical-space/2)

  .button
    margin 0 auto

.tab
  display inline-block
  height $button-height-small
  margin 0.25em 0
  padding 0 10px
  color $gray
  text-decoration none
  text-align center
  line-height $button-height-small
  background transparent
  border none
  cursor pointer
  text-transform capitalize

  &:last-of-type
    margin-left auto

  &:focus
    outline none

.active-tab
  color $secondary-color
  font-weight 600

.profile-settings
  width 100%
  margin-bottom: $vertical-space

  +tablet-up()
    width 70%

</style>
