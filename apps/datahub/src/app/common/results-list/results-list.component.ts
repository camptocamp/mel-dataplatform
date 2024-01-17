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
  templateUrl: './results-list.component.html',
  styleUrl: './results-list.component.css',
})
export class ResultsListComponent implements OnInit {
  @Input() favoritesOnly = false
  @Output() mdSelect = new EventEmitter<CatalogRecord>()

  constructor(
    protected searchFacade: SearchFacade,
    private routerFacade: RouterFacade,
    private store: Store<SearchState>
  ) {}

  ngOnInit() {
    if (this.favoritesOnly) this.searchFacade.setFavoritesOnly(true)
    this.searchFacade
      .setConfigRequestFields([...FIELDS_BRIEF, 'createDate', 'changeDate'])
      .setPageSize(10)
      .setSortBy(['desc', 'createDate'])
  }
}
