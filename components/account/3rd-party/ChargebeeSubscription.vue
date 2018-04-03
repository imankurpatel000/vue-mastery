<template lang='pug'>
button.button.-small.link(
  :href='link'
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
    link: {
      type: String,
      default: 'javascript:void(0)'
    }
  }
}
</script>
