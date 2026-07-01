import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import {
  CatalogRecord,
  FavoritesService,
  FieldFilters,
  FIELDS_BRIEF,
  Keyword,
  RouterFacade,
  SearchFacade,
  SearchService,
  SortByField,
} from 'geonetwork-ui'
import { Subscription } from 'rxjs'
import { goFromHomeToRecord, goFromHomeToSearch } from '../route.utils'

const SORT_BY_RESOURCE_DATE: SortByField = [
  ['desc', 'revisionDateForResource'],
  ['desc', 'publicationDateForResource'],
  ['desc', 'creationDateForResource'],
]

const SORT_BY_METADATA_DATE: SortByField = [['desc', 'createDate']]

@Component({
  selector: 'mel-datahub-results-list',
  template: '',
})
export class ResultsListComponent implements OnInit, OnDestroy {
  protected searchService = inject(SearchService)
  protected searchFacade = inject(SearchFacade)
  protected routerFacade = inject(RouterFacade, { optional: true })
  protected favoritesService = inject(FavoritesService)
  protected store = inject(Store)

  @Input() set favoritesOnly(value: boolean) {
    this.favoritesOnlyValue = value
    this.searchFacade.setFavoritesOnly(value)
    if (!value) {
      this.producerHasChanged = this.producerOnlyFilter
    }
  }
  favoritesOnlyValue = false
  @Input() set sortBy(value: 'resourceDate' | 'metadataDate') {
    if (value === 'resourceDate') {
      this.sortByValue = SORT_BY_RESOURCE_DATE
    } else if (value === 'metadataDate') {
      this.sortByValue = SORT_BY_METADATA_DATE
    }
  }
  sortByValue: SortByField = SORT_BY_METADATA_DATE
  @Input() numberOfResults = 10
  subscriptions: Subscription
  producerOnlyFilter = {}
  @Input() set producerHasChanged(value: FieldFilters) {
    this.producerOnlyFilter = {
      'originatorOrgForResourceObject.default':
        value['originatorOrgForResourceObject.default'],
    }
    if (!this.favoritesOnlyValue && value) {
      this.searchFacade.updateFilters(this.producerOnlyFilter)
    }
  }

  ngOnInit() {
    this.searchFacade
      .setConfigRequestFields([
        ...FIELDS_BRIEF,
        'createDate',
        'changeDate',
        'allKeywords',
      ])
      .setPageSize(this.numberOfResults)
      .setSortBy(this.sortByValue)
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
    if (this.routerFacade) {
      this.routerFacade.updateSearch({ q: keyword.label })
    } else {
      goFromHomeToSearch(keyword.label)
    }
  }

  onMetadataSelection(metadata: CatalogRecord): void {
    if (this.routerFacade) {
      this.routerFacade.goToMetadata(metadata)
    } else {
      goFromHomeToRecord(metadata)
    }
  }
}
