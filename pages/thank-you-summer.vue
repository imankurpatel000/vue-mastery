<template lang="pug">
ThankYou(monthlyPayment='12' paySchedule='3 months' :renewal="new Date() | moment('add', '3 months', 'MMMM D, YYYY')")
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
