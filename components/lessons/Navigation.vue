<template lang='pug'>
.lessons-nav.paginate(v-if='lessons.length > 1' v-cloak)
  button.prev(rel='prev'
              :disabled='isFirst'
              @click='goTo(-1)')
    i.fa.fa-chevron-left(v-if='!isFirst || !isPath')
    | {{previousCopy}}

  button.next(rel='next'
              :disabled='isLast'
              @click='goTo(1)')
    | {{nextCopy}}
    i.fa.fa-chevron-right(v-if='!isLast || !isPath')
</template>

<script>
export default {
  name: 'navigation',

  props: {
    account: {
      type: Object,
      required: false
    },
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
    isPath () { return this.type === 'path' },
    isFirst () { return this.selected === 0 },
    isLast () {
      const next = this.lessons[this.selected + 1]
      let isLast = this.selected === this.lessons.length - 1
      if (!isLast && !this.isPath) {
        isLast = (!this.account && next.lock) || next.status === 'draft'
      }
      return isLast
    },
    previousCopy () {
      if (this.isPath) {
        if (this.selected === 1) return 'All courses'
        return this.isFirst ? '' : this.lessons[this.selected - 1] + ' path'
      } else {
        return 'Previous ' + this.type
      }
    },
    nextCopy () {
      if (this.isPath) {
        return this.isLast ? '' : this.lessons[this.selected + 1] + ' path'
      } else {
        return 'Next ' + this.type
      }
    }
  },

  methods: {
    goTo (direction) {
      window.scroll({
        top: 300,
        behavior: 'smooth'
      })
      let next = this.lessons[this.selected + direction]
      if (this.type !== 'path') next = next.slug
      this.$emit('redirect', next)
    }
  }
}
</script>

