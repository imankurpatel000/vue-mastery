<template lang='pug'>
.settings
  .account-settings
    h3.title Change Email
    ChangeEmail

    h3.title Change Password
    ChangePassword

    h3.title Notifications
    SubscribeToMailingList(:account='account')

    h3.title Delete Account
    DeleteAccount
</template>

<script>
import { mapState } from 'vuex'
import ChangePassword from '~/components/account/ChangePassword.vue'
import ChangeEmail from '~/components/account/ChangeEmail.vue'
import SubscribeToMailingList from '~/components/account/SubscribeToMailingList.vue'
import DeleteAccount from '~/components/account/DeleteAccount.vue'

export default {
  name: 'account-settings',

  components: {
    ChangeEmail,
    ChangePassword,
    SubscribeToMailingList,
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
@import '~assets/css/_variables'

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
