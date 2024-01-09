import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterFacade, SearchService } from 'geonetwork-ui';
import { CatalogRecord } from 'geonetwork-ui/src/libs/common/domain/src/lib/record';
import { SortByField } from 'geonetwork-ui/libs/common/domain/src/lib/search';

@Component({
  selector: 'mel-datahub-home-header',
  templateUrl: './home-header.component.html',
  styles: `
  ::ng-deep .mdc-menu-surface.mat-mdc-autocomplete-panel {
    margin-top: 10px !important;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 2px 4px -1px #0003, 0 4px 5px #00000024, 0 1px 10px #0000001f;
  }
`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHeaderComponent {
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
