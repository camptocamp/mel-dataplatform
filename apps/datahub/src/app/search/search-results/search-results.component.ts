import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SearchFacade, SearchService } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-search-results',
  templateUrl: './search-results.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent {
  pageSize = 18

  constructor(
    protected searchFacade: SearchFacade,
    protected searchService: SearchService
  ) {
    this.searchFacade.setPageSize(this.pageSize)
  }

  onShowMore() {
    this.searchFacade.scroll()
  }

  onPageChange(page: number) {
    this.searchService.setPage(page)
  }
}
