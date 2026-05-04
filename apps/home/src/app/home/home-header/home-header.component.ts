import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import {
  DATAHUB_ROOT,
  DATAHUB_ROUTE_SEARCH,
  goFromHomeToRecord,
  goFromHomeToSearch,
  MelApplicationBannerComponent,
  MelButtonComponent,
  MelFuzzySearchComponent,
  ResultsListCarouselComponent,
} from '@mel-dataplatform/mel'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import {
  CatalogRecord,
  Gn4PlatformService,
  SearchService,
  SortByField,
} from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-home-header',
  templateUrl: './home-header.component.html',
  styles: `
    ::ng-deep .mdc-menu-surface.mat-mdc-autocomplete-panel {
      margin-top: 10px !important;
      border-radius: 8px;
      background-color: white;
      box-shadow:
        0 2px 4px -1px #0003,
        0 4px 5px #00000024,
        0 1px 10px #0000001f;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslateDirective,
    TranslatePipe,
    MelApplicationBannerComponent,
    MelFuzzySearchComponent,
    ResultsListCarouselComponent,
    MelButtonComponent,
  ],
})
export class HomeHeaderComponent {
  private searchService = inject(SearchService)
  private platformService = inject(Gn4PlatformService)

  HREF_ROUTE_SEARCH = `${DATAHUB_ROOT}/${DATAHUB_ROUTE_SEARCH}`
  bannerKey = 'application-banner'
  bannerType = 'secondary'

  translatedBannerMessage$ = this.platformService.translateKey(this.bannerKey)

  onFuzzySearchSelection(record: CatalogRecord) {
    goFromHomeToRecord(record)
  }

  onFuzzySearchSubmit(query: string) {
    goFromHomeToSearch(query)
  }

  clearSearchAndSort(sort: SortByField | string): void {
    this.searchService.setSortAndFilters({}, sort as SortByField)
  }
}
