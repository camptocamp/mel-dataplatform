import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {
  FavoritesService,
  RouterFacade,
  SearchFacade,
  SearchService,
} from 'geonetwork-ui'
import { CatalogRecord } from 'geonetwork-ui/libs/common/domain/src/lib/model/record'
import { SortByField } from 'geonetwork-ui/libs/common/domain/src/lib/model/search'
import {
  Observable,
  Subscription,
  combineLatest,
  map,
  BehaviorSubject,
  distinctUntilChanged,
  debounceTime,
  take,
  skip,
} from 'rxjs'

@Component({
  selector: 'mel-datahub-search-header',
  templateUrl: './search-header.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchHeaderComponent implements OnInit, OnDestroy {
  results$: Observable<CatalogRecord[]>
  private recordsSubject: BehaviorSubject<CatalogRecord[]> =
    new BehaviorSubject<CatalogRecord[]>([])
  records$: Observable<CatalogRecord[]> = this.recordsSubject.asObservable()
  private previousResults: CatalogRecord[] = []
  private previousFilters: any = {}
  private sub: Subscription = new Subscription()

  constructor(
    public routerFacade: RouterFacade,
    private searchService: SearchService,
    public favoritesService: FavoritesService,
    protected searchFacade: SearchFacade
  ) {
    this.results$ = this.searchFacade.results$
  }

  ngOnInit(): void {
    this.sub.add(
      this.results$
        .pipe(skip(1), distinctUntilChanged(), debounceTime(100))
        .subscribe((results) => {
          if (this.previousResults.length === 0) {
            this.recordsSubject.next(results || [])
            this.previousResults = [...results]
          }
        })
    )

    this.sub.add(
      combineLatest([
        this.results$.pipe(take(1), distinctUntilChanged(), debounceTime(100)),
        this.searchFacade.searchFilters$.pipe(
          distinctUntilChanged(),
          debounceTime(100)
        ),
      ]).subscribe(([results, filters]) => {
        this.updateRecords(results, filters)
      })
    )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  updateRecords(results: CatalogRecord[], filters: any): void {
    const producerFilterChanged = this.hasProducerFilterChanged(filters)

    if (producerFilterChanged) {
      this.recordsSubject.next(results)
      this.previousResults = [...results]
    } else {
      if (this.previousResults.length > 0) {
        this.recordsSubject.next(this.previousResults)
      } else {
        this.previousResults = [...results]
      }
    }
    this.previousFilters = { ...filters }
  }

  hasProducerFilterChanged(filters: any): boolean {
    const currentProducerFilter =
      filters['originatorOrgForResourceObject.default']
    const previousProducerFilter =
      this.previousFilters['originatorOrgForResourceObject.default']
    const isEmptyOrNullOrUndefined = (obj: any) =>
      !obj || (Object.keys(obj).length === 0 && obj.constructor === Object)

    const bothEmptyOrNullOrUndefined =
      isEmptyOrNullOrUndefined(currentProducerFilter) &&
      isEmptyOrNullOrUndefined(previousProducerFilter)

    if (bothEmptyOrNullOrUndefined) {
      return false
    }

    return (
      JSON.stringify(currentProducerFilter) !==
      JSON.stringify(previousProducerFilter)
    )
  }

  hasFavorites$ = this.favoritesService.myFavoritesUuid$.pipe(
    map((favorites) => favorites.length > 0)
  )

  onFuzzySearchSelection(record: CatalogRecord) {
    this.routerFacade.goToMetadata(record)
  }

  clearSearchAndSort(sort: SortByField | string): void {
    this.searchService.setSortAndFilters({}, sort as SortByField)
  }
}
