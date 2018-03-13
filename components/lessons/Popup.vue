<template lang="pug">
no-ssr
  modal(v-if="lesson" name="next-lesson" v-cloak height="auto" @before-open="beforeOpen")
    h3.form-title(v-if="account" v-cloak) Great job finishing the lesson!
    h3.form-title(v-else v-cloak) Next Lesson: {{ lesson.title }}
    .body
      p(v-if="account" v-cloak) You will lose your progress unlesss you create a free account, would you like to do that now?
      p(v-else v-cloak) {{ lesson.description }}

    .progress(v-if="!account" v-cloak)
      p Next lesson starting in:
      h2.blink(v-on:animationiteration="countdown") {{ count }}

    .form-footer
      .control-group.-spaced
        button.button.link.-full(v-if="!account" @click="signup" v-cloak) Save my progress
        button.button.link.-full(@click="selectLesson" rel="next") Go to Next Lesson
        //- button.button.primary(@click="stop" rel="next") Cancel
</template>

<script>
export default {
  name: 'popup',
  data () {
    return {
      lesson: false,
      account: false,
      count: 10
    }
  },
  methods: {
    selectLesson () {
      this.$modal.hide('next-lesson')
      this.$emit('selectLesson', this.lesson.slug)
    },
    beforeOpen (event) {
      this.lesson = event.params.lesson
      this.account = event.params.account
    },
    countdown () {
      this.count--
      if (this.count === 0) this.selectLesson()
    },
    signup () {
      this.$modal.hide('next-lesson')
      this.$modal.show('login-form', {
        newAccount: true,
        location: 'Completed Lesson'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables'

.body
  padding: 0 20px

.progress
  width 100%
  text-align center
  .blink
    color $secondary-color
    animation blink 1s infinite

@keyframes blink
  0%
    transform: scale(0)
    opacity: 0
	49%
    opacity: 0
    transform: scale(1)
	50%
    opacity: 1
    transform: scale(2)

</style>
