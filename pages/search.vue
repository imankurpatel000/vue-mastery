<template lang='pug'>
ais-instant-search-ssr
  ais-search-box(index-name="string")
  ais-stats
  ais-refinement-list(attribute='category')
  ais-hits
    template(slot='item' slot-scope='{ item }')
      nuxt-link(:to='item.url')
        img(:src='item.image' align='left' :alt='item.name')
        h2
          ais-highlight(attribute='title' :hit='item')
        p
          ais-highlight(attribute='body' :hit='item')
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
  createInstantSearch
  // for some reason eslint doesn't recognise this dependency, while it's in package.json
  // eslint-disable-next-line import/no-unresolved
} from 'vue-instantsearch'

import algoliasearch from 'algoliasearch/lite'
const serviceAccount = require('../serviceAccountKey.json')
const searchClient = algoliasearch(serviceAccount.algolia.id, serviceAccount.algolia.key)
const { instantsearch, rootMixin } = createInstantSearch({
  searchClient,
  indexName: 'lessons'
})

export default {
  asyncData () {
    return instantsearch
      .findResultsState({
        query: 'vue',
        hitsPerPage: 10,
        disjunctiveFacets: ['body']
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
    AisPagination
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