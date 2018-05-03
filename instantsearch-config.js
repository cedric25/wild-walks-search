const search = instantsearch({
  appId: 'WETEHHP7BT',
  apiKey: '0d048d028ac0fc01aabaf93d80b5ce22',
  indexName: 'wild-walks',
  urlSync: true
})

// initialize RefinementList
addRefinementList(search, 'hikeType', '#refinement-hike-type')
addRefinementList(search, 'accesses', '#refinement-accesses')

search.addWidget(
  instantsearch.widgets.rangeSlider({
    container: '#range-slider-distance',
    attributeName: 'distance',
  })
)

search.addWidget(
  instantsearch.widgets.rangeSlider({
    container: '#range-slider-duration',
    attributeName: 'duration.minutes',
  })
)

// initialize SearchBox
search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-box',
    placeholder: 'Search for wild walks'
  })
)

// initialize hits widget
search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      empty: 'No results',
      item: '<em>Hit {{name}}</em>: {{{_highlightResult.name.value}}}'
    }
  })
)

search.start()

function addRefinementList(search, attributeName, containerSelector) {
  search.addWidget(
    instantsearch.widgets.refinementList({
      container: containerSelector,
      attributeName: attributeName,
      sortBy: ['name:asc'],
    })
  )
}
