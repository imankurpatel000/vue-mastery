<template lang='pug'>
.actions
  div(v-if='conference.available')

    .button.secondary.border.-full
      | Watch talks

  div(v-else v-cloak)
    div(v-if='isSubscribed()')
      span Subscribed
    div(v-else)
      span Videos Coming Soon

      .button.primary.border.-full(@click.prevent='subscribedToMailingList()' v-if='account' v-cloak)
        | Notify Me

      button.button.primary.border.-full(v-else v-cloak @click.prevent='openLogin()') Notify Me
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'conferences-list-action',

  props: {
    conference: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState({
      account: result => result.account.account
    }),

    conferenceAvailable () {
      let started = false
      try {
        started = this.account.conferences[this.conference.slug].started
      } catch (error) {}
      return started
    }
  },

  mounted () {
    if (this.$route.query.subscribe === this.conference.slug) {
      this.subscribedToMailingList()
    }
  },

  methods: {
    isSubscribed () {
      let subscribed = false
      if (this.account && typeof (this.account['conferences']) !== 'undefined') {
        const conference = this.account.conferences[this.conference.slug]
        if (conference) {
          subscribed = conference.subscribed || false
        }
      }
      return subscribed
    },

    subscribedToMailingList () {
      this.$store.dispatch('account/userUpdateSubscribeConference', this.conference.slug)
    },

    openLogin () {
      let options = {
        newAccount: true,
        headerTitle: 'Sign Up Free to Get Notified',
        location: 'Conference page notify me'
      }
      if (!this.account) options.redirect = `/conferences?subscribe=${this.conference.slug}`
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
