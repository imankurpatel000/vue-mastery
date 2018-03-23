<template lang="pug">
form.form(v-cloak v-if="account")
  .body
    span {{message}}
    .switch
      input(id="subscribeSwitch" type="checkbox" :checked="isSubscribed()" @change="subscribedToMailingList")
      label(for="subscribeSwitch") Toggle
</template>

<script>
export default {
  props: ['account', 'slug', 'message'],
  methods: {
    isSubscribed () {
      let subscribed = false
      if (this.account && typeof (this.account['courses']) !== 'undefined') {
        const completedCourse = this.account.courses[this.slug]
        if (completedCourse) {
          subscribed = completedCourse.subscribed || false
        }
      }
      return subscribed
    },
    subscribedToMailingList () {
      this.$store.dispatch('userUpdateSubscribe', this.slug)
    }
  }
}
</script>
<style lang="stylus" scoped>
.form
  width 100%

.body
  display flex
  justify-content: space-between
  align-items: center
</style>
