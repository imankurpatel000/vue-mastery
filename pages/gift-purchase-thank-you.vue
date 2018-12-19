<template lang="pug">
PurchaseThankYou(:renewal="new Date() | dateFormat('MMMM D, YYYY', '1 year')")
</template>

<script>
import PurchaseThankYou from '~/components/account/PurchaseThankYou'
export default {
  name: 'gift-purchase-thank-you',

  head () {
    return {
      title: 'Thank you | Vue Mastery'
    }
  },

  middleware: 'anonymous',

  components: {
    PurchaseThankYou
  }
}
</script>
