<template lang='pug'>
a.button.-small.link(
  href='javascript:void(0)'
  data-cb-type='checkout'
  :data-cb-plan-id='plan')
  | {{ label }}
</template>

<script>
export default {
  name: 'chargebee-subscription',

  props: {
    label: {
      type: String,
      default: 'Subscribe'
    },
    plan: {
      type: String,
      required: true
    },
    redirect: {
      type: String,
      default: ''
    }
  }
}
</script>
