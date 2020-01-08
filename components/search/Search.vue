<template lang='pug'>
ais-instant-search-ssr
  .ais-background(@click='reset' v-if='searchText !== ""')
  .ais-wrapper(:class="{ 'show': searchText !== '', 'signin': account }")
    ais-configure(:hits-per-page.camel="$route.name !== 'search' ? 5 : 10")
    ais-search-box(index-name="vuemastery" v-model='searchText' autofocus placeholder='Search')
    .search-result
      .search-top
        ais-menu(attribute='category' :sort-by="['name:desc']")
        ais-toggle-refinement(attribute='free' label="Free")
    
      ais-state-results
        template(slot-scope='{ hits }')
          ais-hits(v-if='hits.length > 0')
            template(slot='item' slot-scope='{ item }')
              nuxt-link(:to='item.url' @click.native='reset')
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

          .no-result(v-else) 
            p Your search - <q>{{searchText}}</q> - did not match any documents.
            p Suggestions:
            ul
              li Make sure that all words are spelled correctly.
              li Try different keywords.
              li Try more general keywords.
              li Try fewer keywords.

          ais-pagination(v-if='hits.length > 0')
</template>

<script>
import { mapState } from 'vuex'
import {
  AisInstantSearchSsr,
  AisConfigure,
  AisHits,
  AisMenu,
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
const searchClient = algoliasearch(
  process.env.algolia.app_id,
  process.env.algolia.api_key
)
const { instantsearch, rootMixin } = createInstantSearch({
  searchClient,
  indexName: 'vuemastery'
})

export default {
  data () {
    return {
      searchText: ''
    }
  },
  asyncData () {
    const q = this.$route.query['q']
    if (q !== undefined) {
      this.searchText = q
      this.algoliaSearch(q)
    }
  },
  beforeMount () {
    // Nuxt will merge `asyncData` and `data` on the client
    instantsearch.hydrate(this.algoliaState)
  },
  mounted () {
    const q = this.$route.query['q']
    if (q !== undefined) this.searchText = q
  },
  mixins: [rootMixin],
  components: {
    AisConfigure,
    AisHits,
    AisHighlight,
    AisInstantSearchSsr,
    AisMenu,
    AisPagination,
    AisSearchBox,
    AisSnippet,
    AisStateResults,
    AisToggleRefinement
  },
  computed: {
    ...mapState({
      account: result => result.account.account
    })
  },
  methods: {
    dispose (disposeOptions) {
      this.search = null
    },
    algoliaSearch (valueText) {
      return instantsearch
        .findResultsState({
          query: valueText,
          hitsPerPage: 10,
          disjunctiveFacets: ['category', 'free'],
          distinct: true,
          facets: ['category'],
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

$inputWidth = 246px

.ais-wrapper
  position absolute
  left 10rem
  transition left ease-out .5s
  max-width $inputWidth

  &.signin
    left 14rem

.ais-Hits-Img
  display none

.ais-SearchBox-form
  display block
  position relative

.ais-SearchBox-loadingIndicator,
.ais-SearchBox-reset,
.ais-SearchBox-submit
  background transparent
  appearance none
  position absolute
  z-index 1
  width 25px
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

.ais-Hits-Box
  flex 1

  .ais-Hits-Title
    margin-top 0

    .badge
      font-size 0.6rem

  .badge
    margin 8px 8px 8px 0


  .ais-Highlight
    margin-right 8px

.ais-background
  position fixed
  top 0
  left 0
  width 100%
  height 100%

.ais-InstantSearch
  display none
  position absolute
  top 28px
  right 50%

  +wide-up()
    z-index 5
    display block

.ais-SearchBox
  max-width $inputWidth

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
    padding-right 1.7rem
    box-sizing border-box

.ais-SearchBox-input
  width 100%
  height 44px
  padding 0 36px 0 23px
  font-size 20px
  border 2px solid #bbb
  border-radius 30px
  transition all ease-out 0.2s

  &:focus
    outline none


.ais-SearchBox-submitIcon path
  fill $primary-color

.ais-SearchBox-submit
  right 1.3rem
  margin-top -1px

  svg
    width 20px
    height 20px

.ais-SearchBox-reset
  right .8rem
  width 1.8rem

  svg
    width 100%

.ais-StateResults
  background #f5f5fa
  padding 0rem 1.1rem 0 1.1rem
  border-radius 0 0 10px 10px

.search-top
  overflow hidden
  position relative
  padding 0 1rem
  border-radius 0 10px 0 0
  border-bottom 2px solid #fff
  display flex
  justify-content space-between
  align-items center
  background #082a4e
  text-transform uppercase
  color #fff

  +mobile-only()
    display none

.search-result
  opacity 0
  width 400px
  max-width 100%
  height 100%
  transition opacity .2s ease-out, transform .2s ease-out
  overflow hidden
  pointer-events none
  transform translateY(30px)

.show
  &.ais-wrapper
    max-width initial

  .search-result
    transition opacity .2s ease-in, transform .2s ease-in
    transform translateY(2px)
    opacity 1
    pointer-events initial
    overflow visible

    &:before
      content ''
      position absolute
      height 3px
      top -3px
      width $inputWidth + 4
      background-color #0a2b4e
      -webkit-mask-image: radial-gradient(circle 3px at $inputWidth + 3 0, transparent 0, transparent 3px, black 2px)


  .ais-SearchBox-input
    padding 0 36px 0 18px
    border-radius 10px 10px 0 0
    border-color #f5f5fa
    background #f5f5fa

  .ais-SearchBox-submit
    opacity 0

.ais-Menu-list
  display flex
  list-style-type none
  margin-left -.5rem
  padding 1rem 0
  position relative
  z-index 4

.ais-Menu-item
  margin-right .5rem
  margin-bottom 0

.ais-ToggleRefinement-count,
.ais-Menu-count
  display none

.ais-ToggleRefinement-labelText,
.ais-Menu-label
  padding 4px 10px
  border-radius 24px
  font-size .8rem
  cursor pointer
  color #fff
  display block
  text-decoration none

.ais-Menu-item
  border-radius 24px

.ais-ToggleRefinement-labelText:hover,
.ais-Menu-item:hover,
.ais-Menu-item--selected
  background #835ec2
  color #fff

  .ais-Menu-link
    text-decoration none

.ais-ToggleRefinement
  padding: 1rem 0

.ais-ToggleRefinement--noRefinement
  display none

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
    align-items end

.ais-Pagination-list
  display flex
  list-style-type none
  justify-content space-evenly
  margin 0
  padding 20px 0 30px 0

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

.no-result
  padding 1rem 0
  p
    margin-top 0
  q
    font-weight bold

  ul
    list-style-type none
    padding 0
    margin-left 0

.search
  .ais-Hits-Img
    display none
    width: 200px
    padding-top: .9rem
    padding-bottom: .9rem
    object-fit: contain
    object-position: top

    +tablet-up()
      display block

  .ais-Hits-Box
    +tablet-up()
      padding-left: 2rem

  &.ais-InstantSearch
    opacity 1
    pointer-events initial
    position relative
    transform none
    top 0
    right 0
    display block

  .search-result
    margin 0 auto
    width 100%
    background #f5f5fa
    opacity 1
    transform none
    pointer-events initial

    &:before
      display none

  .search-top
    width: 100%
    max-width: 100%
    background: #0a2b4e
    color: #fff
    border-radius initial
    border-bottom none
    margin-bottom 1rem
    display flex
    padding 0 .8rem 0 1.4rem

    +tablet-up()
      margin-bottom 2rem

    @media screen and (min-width: 50em)
      padding-left calc(50% - 345px)
      padding-right calc(50% - 357px)

  .ais-StateResults
    margin 0 auto
    background transparent
    max-width 100%
    width 785px
    min-height 300px

  .ais-wrapper
    position: relative
    left: 0
    margin-right 0
    max-width initial

  .ais-background
    display none

  .ais-SearchBox
    background-color #0a2b4e
    display flex
    justify-content center
    align-items center
    height 5rem
    max-width 100%
    margin-bottom -1rem

    +tablet-up()
      height 7rem

  .ais-SearchBox-input
    padding 0 1.4rem
    height 47px
    font-size 16px
    border: 2px solid #bbb
    border-radius 30px
    color initial

    +tablet-up()
      padding 0 2rem
      height 54px
      font-size 20px

  .ais-SearchBox-form
    width 760px
    max-width calc(100% - 1.4rem)

  .ais-Menu-list
    padding 1rem 0 1.3rem 0

  .ais-SearchBox-submit
    right 2.2rem

  .ais-SearchBox-reset
    right 1.8rem

  .ais-ToggleRefinement-checkbox
    &:checked + span
      background $primary-color
      border-radius 24px
      color #fff

      &:before
        content: none

  .ais-Snippet
    max-width 100%

  .ais-Hits-Title
    line-height 1.2rem

  .ais-Pagination-list
    max-width 500px
    padding 0
    margin 2rem auto 3rem auto

  .no-result
    text-align center

    ul
      list-style-type none
      padding 0
      margin-left 0
</style>