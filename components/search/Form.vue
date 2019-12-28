<template lang='pug'>
#searchForm
  router-link.navbar-item.underline.search-link(to="/search") Search
  .form-group.-inline(:class="{ 'active': searchText !== '' }")
    input.input.-small(type='search' placeholder='Search' ref='search' v-model='searchText' @input="search(searchText)")
    button.button.-has-icon.-small.link.search-icon(type='button' v-if='searchText === ""')
      i.fa.fa-search
    button.button.-has-icon.-small.link.search-icon(type='button' v-else @click='search("")')
      svg.ais-SearchBox-resetIcon(role='img', width='1em', height='1em', viewBox='0 0 20 20')
        path(d='M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z', fillrule='evenodd')

</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'searchForm',
  data () {
    return {
      ready: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.ready = true
    }, 2000)
  },
  computed: {
    ...mapState({
      searchFromStore: 'searchText'
    }),
    searchText: {
      get () {
        return this.searchFromStore
      },
      set (newSearch) {
        return this.search(newSearch)
      }
    }
  },
  methods: {
    ...mapActions(['search'])
  }
}
</script>

<style lang='stylus' scoped>
.form-group .search-icon
  top 5px
  right 0
  padding-left 1rem
  margin-left 0
  padding-right 1rem

.search-link
  display flex
  margin 0 auto 2rem auto
  font-size 20px
  color #0a2b4e

.button
  top 5px
  right 5px

.active .input
  transition all ease-out .2s
  border-bottom none
  background #f5f5fa
  border-radius 10px 10px 0 0
  border-color #f5f5fa
  padding 0 36px 0 18px

.navbar-item
  +laptop-up()
    display none

.form-group
  +laptop-down()
    display none

</style>

<style lang='stylus'>
.search
  .form-group
    display none
</style>