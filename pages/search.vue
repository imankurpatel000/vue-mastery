<template lang='pug'>
ais-instant-search-ssr
  ais-search-box(index-name="string")
  .search-top
    ais-refinement-list(attribute='category' operator='and')
    //- ais-sort-by(:items='[{ value: "category", label: "Category" }, { value: "free", label: "Free" }]')
    ais-stats
  ais-hits
    template(slot='item' slot-scope='{ item }')
      nuxt-link(:to='item.url')
        .ais-Hits-Img
          img(:src='item.image' :alt='item.name')
        h2
          ais-highlight(attribute='title' :hit='item')

        ais-snippet(
          attribute='body'
          :hit='item'
        )
  ais-pagination
</template>

<script>
import {
  AisInstantSearchSsr,
  AisRefinementList,
  AisHits,
  AisHighlight,
  AisSearchBox,
  AisStats,
  AisPagination,
  AisSnippet,
  createInstantSearch,
  AisSortBy
  // for some reason eslint doesn't recognise this dependency, while it's in package.json
  // eslint-disable-next-line import/no-unresolved
} from 'vue-instantsearch'

import algoliasearch from 'algoliasearch/lite'
const serviceAccount = require('../serviceAccountKey.json')
const searchClient = algoliasearch(serviceAccount.algolia.id, serviceAccount.algolia.key)
const { instantsearch, rootMixin } = createInstantSearch({
  searchClient,
  indexName: 'vuemastery'
})

export default {
  asyncData () {
    return instantsearch
      .findResultsState({
        query: 'vue',
        hitsPerPage: 9,
        disjunctiveFacets: ['body'],
        facets: ['category']
        // distinct: true
        // disjunctiveFacetsRefinements: { brand: ['Apple'] }
      })
      .then(() => ({
        algoliaState: instantsearch.getState()
      }))
  },
  beforeMount () {
    // Nuxt will merge `asyncData` and `data` on the client
    instantsearch.hydrate(this.algoliaState)
  },
  mixins: [rootMixin],
  components: {
    AisInstantSearchSsr,
    AisRefinementList,
    AisHits,
    AisHighlight,
    AisSearchBox,
    AisStats,
    AisPagination,
    AisSnippet,
    AisSortBy
  },
  head () {
    return {
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://unpkg.com/instantsearch.css@7.1.0/themes/algolia-min.css'
        }
      ]
    }
  }
}
</script>

<style lang="stylus">
.ais-InstantSearch {
  padding: 45px 4%
}

.ais-SearchBox {
  padding: 20px 0
}

.ais-SearchBox-input {
  padding: 0 3rem
  height: 54px
  line-height: 54px
  border: 2px solid #bbb
  border-radius: 30px
  color: initial

  &:focus {
    outline: none
  }
}

.ais-SearchBox-submitIcon path {
  fill: $primary-color;
}

.ais-SearchBox-submit {
  left: 1rem
}

.ais-SearchBox-reset {
  right: 1rem
}

.search-top {
  display flex
  align-items: center
  justify-content: space-between
  margin: 0rem 1rem 2rem 1.2rem

  +mobile-only() {
    display none
  }
}

.ais-RefinementList-list {
  display: flex
}

.ais-RefinementList-item {
  margin-right: 1rem
  input {
    margin-right: .5rem
  }
}

.ais-Stats {
  margin: 0 0 1rem 0
}

.ais-Hits-list {
  margin-left: 0
  justify-content: space-between
}

.ais-Hits-item {
  box-shadow: 0 1px 4px 0 rgba(0,0,0,.3)
  border-radius: 12px
  transition: box-shadow .5s cubic-bezier(.19,1,.22,1)
  border: none
  cursor: pointer
  margin-top: 2rem;
  padding: 1.5rem;
  width: 100%;
  margin-left: 0

  +tablet-up() {
    width: 48%
    margin: 0 0 2rem 0
  }

  +desktop-up() {
    width: 31%;
  }

  &:hover {
    box-shadow: 0 2px 7px 0 rgba(0,0,0,.3)
  }
}

.ais-Pagination-link {
  border: none
  background-color: transparent
  color: $primary-color
}

.ais-Pagination-item--selected .ais-Pagination-link {
  background-color: $primary-color
}

.ais-Hits-Img {
  width: 100%
  height: 0
  padding-top: 57%
  position: relative
  overflow: hidden

  img {
    position: absolute
    top: 50%
    transform: translateY(-50%)
  }
}

.ais-Snippet {
  color: initial
  line-height: 1.4rem
}

.ais-Hits-item a:hover {
  text-decoration none
  h2 {
    text-decoration underline
  }
}
</style>