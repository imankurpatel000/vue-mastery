<template lang='pug'>
form.form.card
  .card-body
    p.switch-legend I want to receive:
    .form-group.-switched
      .switch
        input(id='subscribeSwitch' type='checkbox' v-model='subscribedToMailingList' @change='subscribe')
        label(for='subscribeSwitch')
      span Tips on using Vue Mastery Successfully

    .form-group.-switched
      .switch
        input(id='subscribeBiweeklySwitch' type='checkbox' v-model='subscribedToBiweekly' @change='subscribe')
        label(for='subscribeBiweeklySwitch')
      span The BiWeekly Newsletter

    .form-group.-switched
      .switch
        input(id='subscribeDiscountAndPromotionSwitch' type='checkbox' v-model='subscribedToDiscountAndPromotion' @change='subscribe')
        label(for='subscribeDiscountAndPromotionSwitch')
      span Information about Discounts and Promotions

    .form-group.-switched
      .switch
        input(id='subscribeFreeContentSwitch' type='checkbox' v-model='subscribedToFreeContent' @change='subscribe')
        label(for='subscribeFreeContentSwitch')
      span New Free Content Announcements



    .form-error
      .callout.-error(v-if='formError.length > 0' v-text='formError')
      .callout.-success(v-if='formSuccess.length > 0' v-text='formSuccess')
</template>

<script>
export default {
  name: 'account-subscribe-to-mailing-list',

  props: {
    account: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      subscribedToMailingList: this.account.subscribedToMailingList,
      debounceTimer: setTimeout(() => {}),
      formError: '',
      formSuccess: ''
    }
  },

  methods: {
    resetFormMessages () {
      this.formSuccess = this.formError = ''
    },

    subscribe (e) {
      // this.resetFormMessages()
      // clearTimeout(this.debounceTimer)
      // this.debounceTimer = setTimeout(() => {
      //   this.$store.dispatch('account/userUpdateSubscription', this.subscribedToMailingList)
      //     .then(() => {
      //       this.formSuccess = 'Successfully updated your account details'
      //     })
      //     .catch((err) => {
      //       this.formError = 'Error saving the profile changes'
      //       console.error(err)
      //     })
      // }, 500)
    }
  }
}
</script>

<style lang='stylus' scoped>
.form-group.-switched
  display flex
  flex-direction: row
  align-items center

.switch-legend
  margin-left 11px
</style>
