<template lang='pug'></template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Search',
  mounted () {
    const q = this.$route.query['q']
    if (q !== undefined) this.search(q)
  },
  methods: {
    ...mapActions(['search'])
  }
}
</script>

<style lang="stylus">
.ais-Hits-Img {
  display none
  width: 200px
  padding-top: .9rem
  padding-bottom: .9rem
  object-fit: contain
  object-position: top

  +tablet-up() {
    display block
  }
}

.ais-Hits-Box {
  +tablet-up() {
    padding-left: 2rem
  }
}

.ais-wrapper {
  margin-right: 0
}
</style>