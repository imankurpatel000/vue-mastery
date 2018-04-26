<template lang="pug">
ThankYou(monthlyPayment='50' :renewal="new Date() | moment('add', '1 years', 'MMMM D, YYYY')")
</template>

<script>
import ThankYou from '~/components/account/ThankYou'
export default {
  name: 'page-thank-you-annual',

  middleware: 'anonymous',

  components: {
    ThankYou
  }
}
</script>
