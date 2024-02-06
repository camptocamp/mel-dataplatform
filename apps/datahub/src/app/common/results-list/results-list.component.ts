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
import { CatalogRecord } from 'geonetwork-ui/libs/common/domain/src/lib/model/record'
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
  myFavoritesSubscription: Subscription

  constructor(
    protected searchService: SearchService,
    protected searchFacade: SearchFacade,
    protected routerFacade: RouterFacade,
    protected favoritesService: FavoritesService,
    protected store: Store<SearchState>
  ) {}

  ngOnInit() {
    this.searchFacade
      .setConfigRequestFields([...FIELDS_BRIEF, 'createDate', 'changeDate'])
      .setPageSize(this.numberOfResults)
      .setSortBy(['desc', 'createDate'])
    this.myFavoritesSubscription =
      this.favoritesService.myFavoritesUuid$.subscribe(() => {
        if (this.favoritesOnly) this.searchFacade.setFavoritesOnly(true)
      })
  }

  ngOnDestroy() {
    this.myFavoritesSubscription.unsubscribe()
  }

  onInfoKeywordClick(keyword: string) {
    this.routerFacade.updateSearch({ q: keyword })
  }

  onMetadataSelection(metadata: CatalogRecord): void {
    this.routerFacade.goToMetadata(metadata)
  }
}
