import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterFacade, SearchService } from 'geonetwork-ui';
import { CatalogRecord } from 'geonetwork-ui/src/libs/common/domain/src/lib/record';
import { SortByField } from 'geonetwork-ui/libs/common/domain/src/lib/search';

@Component({
  selector: 'mel-datahub-search-header',
  templateUrl: './search-header.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchHeaderComponent {
  constructor(
    public routerFacade: RouterFacade,
    private searchService: SearchService
  ) {}

  onFuzzySearchSelection(record: CatalogRecord) {
    this.routerFacade.goToMetadata(record);
  }
  clearSearchAndSort(sort: SortByField | string): void {
    this.searchService.setSortAndFilters({}, sort as SortByField);
  }
}
