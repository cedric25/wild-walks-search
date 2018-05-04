const search = instantsearch({
  appId: 'WETEHHP7BT',
  apiKey: '0d048d028ac0fc01aabaf93d80b5ce22',
  indexName: 'wild-walks',
  urlSync: true
})

// initialize RefinementList
addRefinementList(search, 'hikeType', '#refinement-hike-type')
addRefinementList(search, 'accesses.by', '#refinement-accesses')
addRefinementList(search, 'difficultyLabel', '#refinement-difficulty')
addRefinementList(search, 'wheelchair', '#refinement-wheelchair')

search.addWidget(
  instantsearch.widgets.rangeSlider({
    container: '#range-slider-distance',
    attributeName: 'distance.meters',
  })
)

search.addWidget(
  instantsearch.widgets.rangeSlider({
    container: '#range-slider-duration',
    attributeName: 'duration.minutes',
  })
)

search.addWidget(
  instantsearch.widgets.rangeSlider({
    container: '#range-slider-climbing',
    attributeName: 'totalClimbing',
  })
)

// initialize SearchBox
search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#search-box',
    placeholder: 'Search for wild walks'
  })
)

const hitTemplate = `
  <div class="one-hit">
  
    <a href="{{detailLink}}" target="_blank">
      <div class="hike-title">
        <h6>{{ name }}</h6>
      </div>
    </a>
    
    <div class="hike-img">
      <a href="{{detailLink}}" target="_blank">
        <img src="{{mainImage}}">
      </a>
    </div>
    
    <div class="accesses">
      {{#accesses}}
        <img src="http://www.wildwalks.com//wildwalks_custom/icons/white_{{by}}.png" class="access-image" />
      {{/accesses}}
    </div>
    
    <div class="hike-info">
    
      <div class="hike-info-left">
        <p>{{distance.raw.value}} {{distance.raw.unit}} &nbsp;{{hikeType}}</p>
        <p>{{duration.raw.value}} {{duration.raw.unit}}</p>
        <p>
          {{totalClimbing}}m
          <img src="./arrow-top-right-15.png" class="climbing-arrow" />
        </p>
      </div>
      
      <div class="hike-info-right">
        {{#wheelchair}}
          <img src="http://www.wildwalks.com/wildwalks_custom/icons/{{wheelchair}}.png" class="wheelchair-access-image" />
        {{/wheelchair}}
        <img src="http://www.wildwalks.com/wildwalks_custom/icons/class{{difficulty}}.png" class="difficulty-image" />
        <div class="difficulty-label">
          {{difficultyLabel}}
        </div>
      </div>
      
    </div>
    <div class="elevation-image">
      <img src="{{elevationImage}}" />
    </div>
  </div>
`

// initialize hits widget
const hitsWidget = instantsearch.widgets.hits({
  container: '#hits',
  templates: {
    empty: '<strong>No results :(</strong>',
    item: hitTemplate,
  },
})
search.addWidget(hitsWidget)

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
