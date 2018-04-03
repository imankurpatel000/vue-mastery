
<template lang="pug">
.form
  h3.form-title Select you plan

  .form-group
    Label Yearly Subscription
    ChargeBeeSubscription(plan='year-subscription')

  .form-group
    Label Yearly Subscription
    ChargeBeeSubscription(plan='monthly-subscription')    
</template>

<script>
import ChargeBeeSubscription from '~/components/account/3rd-party/ChargeBeeSubscription.vue'

export default {
  name: 'page-subscribe',

  middleware: 'anonymous',

  components: {
    ChargeBeeSubscription
  }
}
</script>
