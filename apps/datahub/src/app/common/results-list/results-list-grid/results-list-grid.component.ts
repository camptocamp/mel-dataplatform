import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import {
  ResultsListComponent,
  RouterFacade,
  SearchFacade,
  SearchService,
} from 'geonetwork-ui'
import { CatalogRecord } from 'geonetwork-ui/libs/common/domain/src/lib/model/record'
@Component({
  selector: 'mel-datahub-results-list-grid',
  templateUrl: './results-list-grid.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsListGridComponent extends ResultsListComponent {
  @Input() numberOfResults: number

  constructor(
    private searchService: SearchService,
    public searchFacade: SearchFacade,
    private routerFacade: RouterFacade
  ) {
    super()
  }

  onInfoKeywordClick(keyword: string) {
    this.searchService.updateFilters({ any: keyword })
  }

  onMetadataSelection(metadata: CatalogRecord): void {
    this.routerFacade.goToMetadata(metadata)
  }
}
