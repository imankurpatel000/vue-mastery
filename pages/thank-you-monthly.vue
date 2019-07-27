<template lang="pug">
ThankYou(monthlyPayment='5' paySchedule='monthly' :renewal="new Date() | dateFormat('MMMM D, YYYY', '1 month')")
</template>

<script>
import ThankYou from '~/components/account/ThankYou'
export default {
  name: 'page-thank-you-monthly',

  head () {
    return {
      title: 'Thank you | Vue Mastery'
    }
  },

  middleware: 'anonymous',

  components: {
    ThankYou
  }
}
</script>
