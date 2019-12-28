<template lang='pug'>
div(@click='reset')
  ais-instant-search-ssr(:class="{ 'show': searchText !== '' }")
    ais-search-box(index-name="vuemastery" v-model='searchText' autofocus)
    .ais-wrapper(:style='`transform: translateX(${positionX}px)`')

      .search-top
        ais-refinement-list(attribute='category' operator='or' :sort-by="['name:desc']")
        ais-toggle-refinement(attribute='free' label="Free")

      ais-state-results
        template(slot-scope='{ hits }')
          ais-hits(v-if='hits.length > 0')
            template(slot='item' slot-scope='{ item }')
              nuxt-link(:to='item.url')
                img.ais-Hits-Img(:src='item.image' :alt='item.name')
                .ais-Hits-Box
                  h2.ais-Hits-Title
                    ais-highlight(attribute='title' :hit='item')

                  .badge.tertiary {{item.category}}
                  .badge.primary(v-if='item.free') FREE

                  ais-snippet(
                    attribute='description'
                    :hit='item'
                  )
                  ais-snippet(
                    v-if='item._snippetResult.body.matchLevel !== "none"'
                    attribute='body'
                    :hit='item'
                  )

          p(v-else) There are no hits found for: <q>{{searchText}}</q>

          ais-pagination(v-if='hits.length > 0')
</template>

<script>
import { mapState, mapActions } from 'vuex'

import {
  AisInstantSearchSsr,
  AisRefinementList,
  AisHits,
  AisHighlight,
  AisSearchBox,
  AisPagination,
  AisSnippet,
  AisToggleRefinement,
  AisStateResults,
  createInstantSearch
  // for some reason eslint doesn't recognise this dependency, while it's in package.json
  // eslint-disable-next-line import/no-unresolved
} from 'vue-instantsearch'

import algoliasearch from 'algoliasearch/lite'
const serviceAccount = require('~/serviceAccountKey.json')
const searchClient = algoliasearch(serviceAccount.algolia.id, serviceAccount.algolia.key)
const { instantsearch, rootMixin } = createInstantSearch({
  searchClient,
  indexName: 'vuemastery'
})

export default {
  data () {
    return {
      positionX: 0
    }
  },
  asyncData () {
    const q = this.$route.query['q']
    if (q !== undefined) this.search(q)
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
  watch: {
    searchText (searchText) {
      return this.algoliaSearch(searchText)
    }
  },
  beforeMount () {
    // Nuxt will merge `asyncData` and `data` on the client
    instantsearch.hydrate(this.algoliaState)
    this.checkSize()
    window.addEventListener('resize', this.checkSize)
  },

  mixins: [rootMixin],
  components: {
    AisInstantSearchSsr,
    AisRefinementList,
    AisHits,
    AisHighlight,
    AisSearchBox,
    AisPagination,
    AisSnippet,
    AisToggleRefinement,
    AisStateResults
  },
  methods: {
    ...mapActions(['search']),
    checkSize () {
      this.positionX = document.querySelector('#searchForm').getBoundingClientRect().x
    },
    dispose (disposeOptions) {
      this.search = null
    },
    algoliaSearch (valueText) {
      return instantsearch
        .findResultsState({
          query: valueText,
          hitsPerPage: 9,
          disjunctiveFacets: ['category', 'free'],
          facets: ['category'],
          distinct: true,
          disjunctiveFacetsRefinements: ['category']
        })
        .then(() => ({
          algoliaState: instantsearch.getState()
        }))
    },
    reset () {
      if (this.$route.name !== 'search') this.searchText = ''
    }
  }
}
</script>

<style lang="stylus">
[class^=ais-]
  font-size 1rem

.ais-wrapper
  background #f5f5fa
  overflow hidden
  padding 0rem 1.1rem 0 1.1rem
  transform translateX(328px)
  border-radius 0 10px 10px 10px
  max-width 400px

.ais-Hits-Img
  display none

.ais-SearchBox-form
  display block
  position relative
  width 760px
  max-width calc(100% - 2rem)

.ais-SearchBox-loadingIndicator,
.ais-SearchBox-reset,
.ais-SearchBox-submit
  appearance none
  position absolute
  z-index 1
  width 20px
  height 20px
  top 50%
  right .3rem
  transform translateY(-50%)
  border 0
  cursor pointer
  user-select none

.ais-Highlight-highlighted,
.ais-Snippet-highlighted
  text-decoration underline
  text-underline-position under
  background-color transparent
  color #0a2b4e
  text-decoration-color #39b982

.ais-SearchBox-submit
  left 1rem

.ais-Hits-Box
  flex 1

  .ais-Hits-Title
    margin-top 0

  .ais-Hits-Title .badge
    font-size 0.6rem


  .badge
    margin 8px 8px 8px 0


  .ais-Highlight
    margin-right 8px

.ais-InstantSearch
  position absolute
  top 100px
  opacity 0
  width 100%
  height 100%
  transition opacity .2s ease-out, transform .2s ease-out
  overflow hidden
  pointer-events none
  display none

  +laptop-up()
    z-index 5
    display block

  &.show
    transition opacity .2s ease-in, transform .2s ease-in
    transform translateY(-28px)
    opacity 1
    width 100%
    pointer-events initial

.ais-SearchBox
  display none

.ais-ToggleRefinement-checkbox
  display none

  &:checked + span:before
    content 'free'
    position absolute
    top 0
    left 0
    background-color #39b981
    width 100%
    height 100%
    text-align right
    display flex
    justify-content flex-end
    align-items center
    padding-right 1rem
    box-sizing border-box

.ais-SearchBox-input
  padding 0 3rem
  height 54px
  width 100%
  line-height 54px
  border 1px solid #bbb
  border-radius 30px
  color initial

  &:focus
    outline none


.ais-SearchBox-submitIcon path
  fill $primary-color

.ais-SearchBox-submit
  left .8rem
  margin-top 1px

  svg
    width 1rem
    height 1rem

.ais-SearchBox-reset
  right 1rem
  width 1.8rem
  height 1rem

  svg
    width 100%

.search-top
  overflow hidden
  position relative
  margin 0 -1.1rem
  padding 1rem
  border-bottom 2px solid #fff
  display flex
  justify-content space-between
  align-items center
  background #082a4e
  text-transform uppercase
  color #fff

  +mobile-only()
    display none

.ais-RefinementList-list
  display flex
  list-style-type none
  margin-left -.5rem
  padding 0
  position relative
  z-index 4

.ais-RefinementList-item
  margin-right .5rem
  margin-bottom 0

.ais-ToggleRefinement-count,
.ais-RefinementList-count
  display none

.ais-ToggleRefinement-labelText,
.ais-RefinementList-labelText
  padding 4px 10px
  border-radius 24px
  font-size .8rem
  cursor pointer

.ais-RefinementList-checkbox
  display none

  &:checked + span
    background #835ec2
    color #fff


.ais-Hits-list
  margin 0
  padding 0
  justify-content space-between
  list-style-type none

.ais-Hits-item
  cursor pointer
  padding 0.7rem 1.5rem
  margin 0 -1.1rem

  +tablet-up()
    padding 0.7rem 1.1rem

    &:hover
      margin 0 -.7rem
      padding 0.7rem .7rem

  &:hover
    background #fff
    .ais-Highlight,
    a
      text-decoration none

  a
    display flex

.ais-Pagination-list
  display flex
  list-style-type none
  justify-content space-evenly
  margin 20px 0 30px 0
  padding 0px

  li
    display flex
    margin-bottom 0


.ais-Pagination-item
  border-radius 50%
  border none
  background-color transparent
  color $primary-color
  width 25px
  height 25px
  justify-content center
  align-items center
  cursor pointer
  transition background-color .3s ease-out

  &:hover
    transition background-color .1s ease-in


  .ais-Pagination-link
    transition color .3s ease-out
    line-height 0
    height 2px

    &:hover
      transition color .1s ease-out
  
.ais-Pagination-item--selected
  background-color $primary-color

  .ais-Pagination-link
    color #fff
    text-decoration none

.ais-Pagination-itemhover
  background-color #fff

  .ais-Pagination-link
    color #666
    text-decoration none

.ais-Snippet
  display block
  color #666
  font-size 1rem
  line-height 1.4rem
  padding-bottom 10px
  max-width 365px

.search
  .ais-InstantSearch
    opacity 1
    pointer-events initial
    position relative
    transform none
    top 0
    display block

  .ais-wrapper
    transform none !important
    max-width 785px
    margin 0 auto
    background transparent
    // test
    overflow visible
    margin-top -4rem

  .ais-SearchBox
    display block
    margin-bottom 1rem
    background-color #0a2b4e
    height 7rem
    display flex
    justify-content center
    align-items center

    // test
    height 10rem
    padding-bottom 3rem
    margin-bottom 0

  .search-top
    background transparent
    color #082a4e

    // test
    border-bottom: none

  .ais-ToggleRefinement-checkbox
    &:checked + span
      background $primary-color
      border-radius 24px
      color #fff

      &:before
        content: none

  .ais-Snippet
    max-width 100%


  // Test
  .search-top
    color #fff
    padding 1.3rem 2rem
    margin-bottom 3rem
</style>