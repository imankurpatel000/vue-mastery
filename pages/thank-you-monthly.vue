<template lang="pug">
ThankYou(monthlyPayment='5' :renewal="new Date() | moment('add', '1 months', 'MMMM D, YYYY')")
</template>

<script>
import ThankYou from '~/components/account/ThankYou'
export default {
  name: 'page-thank-you-monthly',

  middleware: 'anonymous',

  components: {
    ThankYou
  }
}
</script>
