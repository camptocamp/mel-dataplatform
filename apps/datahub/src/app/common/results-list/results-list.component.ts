import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Store } from '@ngrx/store'
import {
  FIELDS_BRIEF,
  RouterFacade,
  SearchFacade,
  SearchState,
} from 'geonetwork-ui'
import { CatalogRecord } from 'geonetwork-ui/libs/common/domain/src/lib/record'

@Component({
  selector: 'mel-datahub-results-list',
  template: '',
})
export class ResultsListComponent implements OnInit {
  @Input() favoritesOnly = false
  @Input() numberOfResults = 10

  constructor(
    protected searchFacade: SearchFacade,
    private routerFacade: RouterFacade,
    private store: Store<SearchState>
  ) {}

  ngOnInit() {
    if (this.favoritesOnly) this.searchFacade.setFavoritesOnly(true)
    this.searchFacade
      .setConfigRequestFields([...FIELDS_BRIEF, 'createDate', 'changeDate'])
      .setPageSize(this.numberOfResults)
      .setSortBy(['desc', 'createDate'])
  }

  onMetadataSelection(metadata: CatalogRecord): void {
    this.routerFacade.goToMetadata(metadata)
  }
}
