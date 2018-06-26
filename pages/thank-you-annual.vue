<template lang="pug">
ThankYou(monthlyPayment='50' paySchedule='yearly' :renewal="new Date() | moment('add', '1 years', 'MMMM D, YYYY')")
</template>

<script>
import ThankYou from '~/components/account/ThankYou'
export default {
  name: 'page-thank-you-annual',

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
