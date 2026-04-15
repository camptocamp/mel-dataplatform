import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TranslateDirective } from '@ngx-translate/core'
import {
  SearchFacade,
  SearchService,
  SpinningLoaderComponent,
} from 'geonetwork-ui'
import { MelPaginationButtonsComponent } from 'libs/mel/src/lib/pagination-buttons/pagination-buttons.component'
import { ResultsListGridComponent } from 'libs/mel/src/lib/results-list/results-list-grid/results-list-grid.component'

@Component({
  selector: 'mel-datahub-search-results',
  templateUrl: './search-results.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslateDirective,
    SpinningLoaderComponent,
    ResultsListGridComponent,
    MelPaginationButtonsComponent,
  ],
})
export class SearchResultsComponent {
  pageSize = 18
  totalPages_: number
  currentPage_: number

  constructor(
    protected searchFacade: SearchFacade,
    protected searchService: SearchService
  ) {
    this.searchFacade.setPageSize(this.pageSize)
    this.searchFacade.currentPage$.subscribe((page) => {
      this.currentPage_ = page
    })
    this.searchFacade.totalPages$.subscribe((total) => {
      this.totalPages_ = total
    })
  }

  // Paginable API
  get isFirstPage() {
    return this.currentPage_ === 1
  }
  get isLastPage() {
    return this.currentPage_ === this.totalPages_
  }
  get pagesCount() {
    return this.totalPages_
  }
  get currentPage() {
    return this.currentPage_
  }
  goToPage(page: number) {
    this.searchService.setPage(page)
  }
  goToNextPage() {
    this.searchService.setPage(this.currentPage_ + 1)
  }
  goToPrevPage() {
    this.searchService.setPage(this.currentPage_ - 1)
  }
}
