import { SlicePipe } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { getOptionalSearchConfig } from '@mel-dataplatform/mel'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { matExpandLess, matExpandMore } from '@ng-icons/material-icons/baseline'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { RouterFacade } from 'geonetwork-ui'
import { MelFilterDropdownComponent } from './filter-dropdown/filter-dropdown.component'

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
marker('mel.datahub.search.filters.revisionYear')

@Component({
  selector: 'mel-datahub-search-filters',
  templateUrl: './search-filters.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SlicePipe,
    NgIconComponent,
    TranslateDirective,
    TranslatePipe,
    MelFilterDropdownComponent,
  ],
  providers: [
    provideIcons({
      matExpandLess,
      matExpandMore,
    }),
  ],
})
export class SearchFiltersComponent {
  constructor(private routerFacade: RouterFacade) {}
  displayCount = 3
  searchConfig = (
    getOptionalSearchConfig().ADVANCED_FILTERS || [
      'producerOrg',
      'categoryKeyword',
      'territories',
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
