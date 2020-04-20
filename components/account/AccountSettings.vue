<template lang='pug'>
.settings
  .account-settings
    h3.title Change Email
    ChangeEmail

    h3.title Change Password
    ChangePassword

    h3.title(v-if="account && account.chargebeeId") Cancel Subscription 
    .card(v-if="account && account.chargebeeId")
      .card-body
        p You can cancel by clicking on <strong>My Subscription</strong> in the top right of this page, clicking your subscription, then clicking <strong>Cancel Subscription</strong>, and then confirming your cancellation.

    h3.title Delete Account
    DeleteAccount
</template>

<script>
import { mapState } from 'vuex'
import ChangePassword from '~/components/account/ChangePassword.vue'
import ChangeEmail from '~/components/account/ChangeEmail.vue'
import DeleteAccount from '~/components/account/DeleteAccount.vue'

export default {
  name: 'account-settings',

  components: {
    ChangeEmail,
    ChangePassword,
    DeleteAccount
  },

  computed: {
    ...mapState({
      account: result => result.account.account
    })
  }
}
</script>

<style lang='stylus' scoped>
.settings > div
  margin-bottom $vertical-space

  .card
    margin-bottom: ($vertical-space/2)

.account-settings
  width 100%

  +tablet-up()
    width 70%

.title
  color $secondary-color
  font-weight 600
  margin-bottom: 22px

  +tablet-up()
    font-size 40.5px
</style>