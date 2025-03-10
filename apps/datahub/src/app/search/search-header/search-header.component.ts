import { ChangeDetectionStrategy, Component } from '@angular/core'
import { getOptionalWarningConfig } from '@mel-dataplatform/mel'
import {
  FavoritesService,
  RouterFacade,
  SearchFacade,
  SearchService,
  Gn4PlatformService,
} from 'geonetwork-ui'
import { CatalogRecord } from 'geonetwork-ui/libs/common/domain/src/lib/model/record'
import { SortByField } from 'geonetwork-ui/libs/common/domain/src/lib/model/search'
import { map, distinctUntilChanged, Observable } from 'rxjs'

@Component({
  selector: 'mel-datahub-search-header',
  templateUrl: './search-header.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchHeaderComponent {
  private previousFilters: any = {}
  bannerKey = 'application-banner'
  bannerType = getOptionalWarningConfig().WARNING_LEVEL || 'secondary'

  constructor(
    public routerFacade: RouterFacade,
    private searchService: SearchService,
    public favoritesService: FavoritesService,
    protected searchFacade: SearchFacade,
    private platformService: Gn4PlatformService
  ) {}

  translatedBannerMessage$ = this.platformService.translateKey(this.bannerKey)

  producerHasChanged$ = this.searchFacade.searchFilters$.pipe(
    distinctUntilChanged(),
    map((filters) => this.hasProducerFilterChanged(filters))
  )

  hasProducerFilterChanged(filters: any) {
    const currentProducerFilter =
      filters['originatorOrgForResourceObject.default']
    const previousProducerFilter =
      this.previousFilters['originatorOrgForResourceObject.default']
    const isEmptyOrNullOrUndefined = (obj: any) =>
      !obj || (Object.keys(obj).length === 0 && obj.constructor === Object)

    const bothEmptyOrNullOrUndefined =
      isEmptyOrNullOrUndefined(currentProducerFilter) &&
      isEmptyOrNullOrUndefined(previousProducerFilter)
    let hasChanged = false
    if (
      bothEmptyOrNullOrUndefined ||
      JSON.stringify(currentProducerFilter) ===
        JSON.stringify(previousProducerFilter)
    ) {
      return false
    } else {
      hasChanged = true
    }
    this.previousFilters = { ...filters }
    return hasChanged ? filters : null
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
