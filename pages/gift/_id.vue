<template lang="pug">
.container
  .cloud-cover
  .wrapper
    no-ssr
      .error(v-if='error') {{ error }}
      a.button(v-if='account' v-cloak
              @click='claimGift'
              :class='buttonClass') Claim

      button.button(v-else :class='buttonClass' v-cloak 
                    @click='openLogin') Claim

</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'claim',

  middleware: 'anonymous',

  data () {
    return {
      giftId: this.$route.params.id,
      error: null
    }
  },

  computed: {
    ...mapState({
      account: result => result.account.account
    })
  },

  methods: {
    openLogin () {
      this.$modal.show('login-form', {
        newAccount: true,
        headerTitle: 'Please sign up to claim your gift',
        redirect: `/gift-claim/${this.giftId}`,
        location: this.location
      })
    },

    claimGift () {
      let params = new URLSearchParams()
      params.append('gift_id', this.giftId)
      return axios.post(`${process.env.cloudfunctions}/claim_gift`, params)
        .then(response => {
          this.$router.push('gift-claim-thank-you')
          console.log(response)
        })
        .catch(error => {
          this.error = error.response
        })
    }
  }
}
</script>

<style lang="stylus" scoped>


</style>
