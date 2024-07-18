import { ChangeDetectionStrategy, Component } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { RouterFacade } from 'geonetwork-ui'
import { getOptionalSearchConfig } from '@mel-dataplatform/mel'

marker('mel.datahub.search.filters.topic')
marker('mel.datahub.search.filters.categoryKeyword')
marker('mel.datahub.search.filters.organization')
marker('mel.datahub.search.filters.publicationYear')
marker('mel.datahub.search.filters.license')
marker('mel.datahub.search.filters.qualityScore')
marker('mel.datahub.search.filters.territories')
marker('mel.datahub.search.filters.producerOrg')
marker('mel.datahub.search.filters.publisherOrg')
marker('mel.datahub.search.filters.format')
marker('mel.datahub.search.filters.inspireKeyword')
marker('mel.datahub.search.filters.keyword')
marker('mel.datahub.search.filters.isSpatial')
marker('mel.datahub.search.filters.resourceType')
marker('mel.datahub.search.filters.representationType')

@Component({
  selector: 'mel-datahub-search-filters',
  templateUrl: './search-filters.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFiltersComponent {
  constructor(private routerFacade: RouterFacade) {}
  displayCount = 3
  searchConfig = (
    getOptionalSearchConfig().ADVANCED_FILTERS || [
      'producerOrg',
      'categoryKeyword',
      'revisionYear',
      'license',
    ]
  ).map((filter) => ({
    fieldName: filter,
    title: `mel.datahub.search.filters.${filter}`,
  }))

  showAll() {
    this.displayCount =
      this.displayCount === this.searchConfig.length
        ? 3
        : this.searchConfig.length
  }

  trackByFn(item) {
    return item.fieldName
  }

  resetFilters() {
    this.routerFacade.setSearch({})
  }
}
