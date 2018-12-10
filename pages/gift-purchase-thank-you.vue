<template lang="pug">
ClaimThankYou(:renewal="new Date() | dateFormat('MMMM D, YYYY', '1 year')")
</template>

<script>
import ClaimThankYou from '~/components/account/ClaimThankYou'
export default {
  name: 'page-claim-thank-you-annual',

  head () {
    return {
      title: 'Thank you | Vue Mastery'
    }
  },

  middleware: 'anonymous',

  components: {
    ClaimThankYou
  }
}
</script>
