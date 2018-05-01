<template lang='pug'>
.lessons-nav.paginate(v-if='lessons.length > 1' v-cloak)
  button.prev(rel='prev'
              :disabled='isFirst'
              @click='goTo(-1)')
    i.fa.fa-chevron-left
    | Previous {{type}}

  button.next(rel='next'
              :disabled='isLast'
              @click='goTo(1)')
    | Next {{type}}
    i.fa.fa-chevron-right
</template>

<script>
export default {
  name: 'navigation',

  props: {
    lessons: {
      type: Array,
      required: true
    },
    selected: {
      type: Number
    },
    type: {
      type: String,
      default: 'Lesson'
    }
  },

  computed: {
    isFirst () { return this.selected === 0 },
    isLast () {
      const next = this.lessons[this.selected + 1]
      return this.selected === this.lessons.length - 1 || next.lock || next.status === 'draft'
    }
  },

  methods: {
    goTo (direction) {
      this.$emit('redirect', this.lessons[this.selected + direction].slug)
    }
  }
}
</script>

