<template lang='pug'>
button.button.primary.-full(
  @click=''
  :href='link'
  data-cb-type='checkout'
  :data-cb-plan-id='plan'
  :class='className')
  | {{ label }}
</template>

<script>
export default {
  name: 'chargebee-subscription',

  props: {
    account: {
      type: Object,
      required: false
    },
    label: {
      type: String,
      default: 'Select Plan'
    },
    plan: {
      type: String,
      required: true
    },
    link: {
      type: String,
      default: 'javascript:void(0)'
    },
    className: {
      type: String,
      default: 'button'
    }
  }
}
</script>
