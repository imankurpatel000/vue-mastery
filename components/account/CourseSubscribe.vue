<template lang="pug">
form.form
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
      if (this.account) {
        this.$store.dispatch('userUpdateSubscribe', this.slug)
      } else {
        this.$modal.show('login-form', {
          newAccount: true,
          headerTitle: 'Sign up to get notified',
          location: 'Course Subscribe button'
        })
      }
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

.switch
  margin-right: 0
</style>
