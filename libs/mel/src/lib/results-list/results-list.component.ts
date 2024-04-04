import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import {
  FIELDS_BRIEF,
  FavoritesService,
  RouterFacade,
  SearchFacade,
  SearchService,
  SearchState,
} from 'geonetwork-ui'
import {
  CatalogRecord,
  Keyword,
} from 'geonetwork-ui/libs/common/domain/src/lib/model/record'
import { Subscription } from 'rxjs'

@Component({
  selector: 'mel-datahub-results-list',
  template: '',
})
export class ResultsListComponent implements OnInit, OnDestroy {
  @Input() set favoritesOnly(value: boolean) {
    this.favoritesOnlyValue = value
    this.searchFacade.setFavoritesOnly(value)
  }
  favoritesOnlyValue: boolean
  @Input() numberOfResults = 10
  subscriptions: Subscription

  constructor(
    protected searchService: SearchService,
    protected searchFacade: SearchFacade,
    protected routerFacade: RouterFacade,
    protected favoritesService: FavoritesService,
    protected store: Store<SearchState>
  ) {}

  ngOnInit() {
    this.searchFacade
      .setConfigRequestFields([
        ...FIELDS_BRIEF,
        'createDate',
        'changeDate',
        'allKeywords',
      ])
      .setPageSize(this.numberOfResults)
      .setSortBy(['desc', 'createDate'])
    this.subscriptions = this.favoritesService.myFavoritesUuid$.subscribe(
      () => {
        if (this.favoritesOnlyValue) this.searchFacade.setFavoritesOnly(true)
      }
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  onInfoKeywordClick(keyword: Keyword) {
    this.routerFacade.updateSearch({ q: keyword.label })
  }

  onMetadataSelection(metadata: CatalogRecord): void {
    this.routerFacade.goToMetadata(metadata)
  }
}
