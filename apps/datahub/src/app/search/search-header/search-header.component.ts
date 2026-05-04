import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MelApplicationBannerComponent, ResultsListCarouselComponent } from '@mel-dataplatform/mel'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import {
  CatalogRecord,
  FavoritesService,
  Gn4PlatformService,
  RouterFacade,
  SearchFacade,
  SearchService,
  SearchStateContainerDirective,
  SortByField,
} from 'geonetwork-ui'
import { distinctUntilChanged, map } from 'rxjs'

@Component({
  selector: 'mel-datahub-search-header',
  templateUrl: './search-header.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslateDirective,
    TranslatePipe,
    SearchStateContainerDirective,
    MelApplicationBannerComponent,
    ResultsListCarouselComponent,
  ],
})
export class SearchHeaderComponent {
  public routerFacade = inject(RouterFacade)
  private searchService = inject(SearchService)
  public favoritesService = inject(FavoritesService)
  protected searchFacade = inject(SearchFacade)
  private platformService = inject(Gn4PlatformService)

  private previousFilters: any = {}
  bannerKey = 'application-banner'
  bannerType = 'secondary'

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
