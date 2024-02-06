import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import {
  FIELDS_BRIEF,
  RouterFacade,
  SearchFacade,
  SearchService,
  SearchState,
} from 'geonetwork-ui'
import { CatalogRecord } from 'geonetwork-ui/libs/common/domain/src/lib/model/record'

@Component({
  selector: 'mel-datahub-results-list',
  template: '',
})
export class ResultsListComponent implements OnInit {
  @Input() set favoritesOnly(value: boolean) {
    this.favoritesOnlyValue = value
    this.searchFacade.setFavoritesOnly(value)
  }
  favoritesOnlyValue: boolean
  @Input() numberOfResults = 10

  constructor(
    protected searchService: SearchService,
    protected searchFacade: SearchFacade,
    protected routerFacade: RouterFacade,
    protected store: Store<SearchState>
  ) {}

  ngOnInit() {
    this.searchFacade
      .setConfigRequestFields([...FIELDS_BRIEF, 'createDate', 'changeDate'])
      .setPageSize(this.numberOfResults)
      .setSortBy(['desc', 'createDate'])
  }

  onInfoKeywordClick(keyword: string) {
    this.routerFacade.updateSearch({ q: keyword })
  }

  onMetadataSelection(metadata: CatalogRecord): void {
    this.routerFacade.goToMetadata(metadata)
  }
}
