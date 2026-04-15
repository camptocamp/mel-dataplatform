import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatIconModule } from '@angular/material/icon'
import { NgIconsModule } from '@ng-icons/core'
import { iconoirBell } from '@ng-icons/iconoir'
import {
  matChevronLeft,
  matChevronRight,
  matOpenInNew,
  matSearch,
  matWarning,
} from '@ng-icons/material-icons/baseline'
import { matWarningAmberOutline } from '@ng-icons/material-icons/outline'
import { TranslateModule } from '@ngx-translate/core'
import {
  ApplicationBannerComponent,
  AutocompleteComponent,
  ButtonComponent,
  CarouselComponent,
  ContentGhostComponent,
  ExternalViewerButtonComponent,
  FavoriteStarComponent,
  FuzzySearchComponent,
  MaxLinesComponent,
  MetadataQualityComponent,
  MetadataQualityItemComponent,
  PaginationButtonsComponent,
  PopoverComponent,
  PopupAlertComponent,
  ThumbnailComponent,
} from 'geonetwork-ui'
import { MelApplicationBannerComponent } from './application-banner/application-banner.component'
import { MelAutocompleteComponent } from './autocomplete/autocomplete.component'
import { MelButtonComponent } from './button/button.component'
import { MelCarouselComponent } from './carousel/carousel.component'
import { MelExternalViewerButtonComponent } from './external-viewer-button/external-viewer-button.component'
import { FavoriteHeartComponent } from './favorites/favorite-heart/favorite-heart.component'
import { HeartToggleComponent } from './favorites/heart-toggle/heart-toggle.component'
import { MelDatahubFooterComponent } from './footer/mel-datahub-footer.component'
import { MelFuzzySearchComponent } from './fuzzy-search/fuzzy-search.component'
import { MelDatahubMetadataQualityComponent } from './metadata-quality/mel-datahub-metadata-quality.component'
import { MelPaginationButtonsComponent } from './pagination-buttons/pagination-buttons.component'
import { ResultsCardFavoriteComponent } from './results-list-item/results-card-favorite/results-card-favorite.component'
import { ResultsCardLastCreatedComponent } from './results-list-item/results-card-last-created/results-card-last-created.component'
import { ResultsCardSearchComponent } from './results-list-item/results-card-search/results-card-search.component'
import { ResultsListItemComponent } from './results-list-item/results-list-item.component'
import { ResultsListCarouselComponent } from './results-list/results-list-carousel/results-list-carousel.component'
import { ResultsListGridComponent } from './results-list/results-list-grid/results-list-grid.component'
import { ResultsListComponent } from './results-list/results-list.component'
import { StripHtmlPipe } from './strip-html.pipe'
import { TextExpandComponent } from './text-expand/text-expand.component'

@NgModule({
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatIconModule,
    // Ng Icons
    NgIconsModule.withIcons({
      matOpenInNew,
      matSearch,
      matChevronLeft,
      matChevronRight,
      iconoirBell,
      matWarningAmberOutline,
      matWarning,
    }),
    // ngx-translate
    TranslateModule,
    // GeoNetwork-UI
    ApplicationBannerComponent,
    AutocompleteComponent,
    ButtonComponent,
    CarouselComponent,
    ContentGhostComponent,
    ExternalViewerButtonComponent,
    FavoriteStarComponent,
    FuzzySearchComponent,
    MaxLinesComponent,
    MetadataQualityComponent,
    MetadataQualityItemComponent,
    PaginationButtonsComponent,
    PopoverComponent,
    PopupAlertComponent,
    ThumbnailComponent,
    // MEL
    MelApplicationBannerComponent,
    MelAutocompleteComponent,
    MelButtonComponent,
    MelCarouselComponent, //
    MelExternalViewerButtonComponent,
    FavoriteHeartComponent,
    HeartToggleComponent,
    MelDatahubFooterComponent,
    MelFuzzySearchComponent,
    MelDatahubMetadataQualityComponent,
    MelPaginationButtonsComponent,
    ResultsCardFavoriteComponent,
    ResultsCardLastCreatedComponent,
    ResultsCardSearchComponent,
    ResultsListItemComponent,
    ResultsListCarouselComponent,
    ResultsListGridComponent,
    ResultsListComponent,
    StripHtmlPipe, //
    TextExpandComponent, //
  ],
  exports: [
    MelApplicationBannerComponent,
    MelAutocompleteComponent,
    MelButtonComponent,
    MelCarouselComponent, //
    MelExternalViewerButtonComponent,
    FavoriteHeartComponent,
    HeartToggleComponent,
    MelDatahubFooterComponent,
    MelFuzzySearchComponent,
    MelDatahubMetadataQualityComponent,
    MelPaginationButtonsComponent,
    ResultsCardFavoriteComponent,
    ResultsCardLastCreatedComponent,
    ResultsCardSearchComponent,
    ResultsListItemComponent,
    ResultsListCarouselComponent,
    ResultsListGridComponent,
    ResultsListComponent,
    StripHtmlPipe, //
    TextExpandComponent, //
  ],
})
export class MelModule {}
