<template lang='pug'>
no-ssr
  modal(name='next-lesson' height='auto' @before-open='beforeOpen')
    h3.form-title(v-if='account' v-cloak) Next Lesson: {{ lesson.title }}
    h3.form-title(v-else v-cloak) Great job finishing the lesson!

    .body
      p(v-if='account' v-cloak) {{ lesson.description }}
      p(v-else v-cloak) You will lose your progress unlesss you create a free account, would you like to do that now?

    .progress(v-if='account' v-cloak)
      p Next lesson starting in:
      h2.blink(@animationiteration='countdown') {{ count }}

    .control-group.-spaced
      button.button.secondary.border(v-if='!account' v-cloak
                                     @click='signup') Save my Progress
      button.button.primary(rel='next' @click='selectLesson') Go to Next Lesson

</template>

<script>
export default {
  name: 'lesson-popup',

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
      this.$emit('redirect', this.lesson.slug)
    },

    beforeOpen (event) {
      this.count = 10
      this.lesson = event.params.lesson
      this.account = event.params.account || false
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

<style lang='stylus' scoped>
@import '~assets/css/_variables'

.body
  padding: 0 20px

.progress
  width 100%
  text-align center

  .blink
    color $secondary-color
    animation blink 1s infinite

.control-group
  margin-bottom 30px

@keyframes blink
  0%
    transform scale(0)
    opacity 0
	49%
    opacity 0
    transform scale(1)
	50%
    opacity 1
    transform scale(2)

</style>
