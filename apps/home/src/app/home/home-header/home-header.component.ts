import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SearchService } from 'geonetwork-ui'
import {
  DATAHUB_ROOT,
  DATAHUB_ROUTE_SEARCH,
  goFromHomeToRecord,
  goFromHomeToSearch,
} from '@mel-dataplatform/mel'
import { CatalogRecord } from 'geonetwork-ui/libs/common/domain/src/lib/model/record'
import { SortByField } from 'geonetwork-ui/libs/common/domain/src/lib/model/search'

@Component({
  selector: 'mel-datahub-home-header',
  templateUrl: './home-header.component.html',
  styles: `
    ::ng-deep .mdc-menu-surface.mat-mdc-autocomplete-panel {
      margin-top: 10px !important;
      border-radius: 8px;
      background-color: white;
      box-shadow:
        0 2px 4px -1px #0003,
        0 4px 5px #00000024,
        0 1px 10px #0000001f;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHeaderComponent {
  HREF_ROUTE_SEARCH = `${DATAHUB_ROOT}/${DATAHUB_ROUTE_SEARCH}`

  constructor(private searchService: SearchService) {}

  onFuzzySearchSelection(record: CatalogRecord) {
    goFromHomeToRecord(record)
  }

  onFuzzySearchSubmit(query: string) {
    goFromHomeToSearch(query)
  }

  clearSearchAndSort(sort: SortByField | string): void {
    this.searchService.setSortAndFilters({}, sort as SortByField)
  }
}
