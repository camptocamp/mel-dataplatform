import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ResultsListComponent } from './results-list/results-list.component'
import { ResultsListCarouselComponent } from './results-list/results-list-carousel/results-list-carousel.component'
import { ResultsListGridComponent } from './results-list/results-list-grid/results-list-grid.component'
import { ResultsListItemComponent } from './results-list-item/results-list-item.component'
import { ResultsCardFavoriteComponent } from './results-list-item/results-card-favorite/results-card-favorite.component'
import { ResultsCardLastCreatedComponent } from './results-list-item/results-card-last-created/results-card-last-created.component'
import { ResultsCardSearchComponent } from './results-list-item/results-card-search/results-card-search.component'
import { MelDatahubMetadataQualityComponent } from './metadata-quality/mel-datahub-metadata-quality.component'
import { MelButtonComponent } from './button/button.component'
import { FavoriteHeartComponent } from './favorites/favorite-heart/favorite-heart.component'
import { HeartToggleComponent } from './favorites/heart-toggle/heart-toggle.component'
import { TextExpandComponent } from './text-expand/text-expand.component'
import { MelDatahubFooterComponent } from './footer/mel-datahub-footer.component'
import { MelCarouselComponent } from './carousel/carousel.component'
import { MelFuzzySearchComponent } from './fuzzy-search/fuzzy-search.component'
import { MelAutocompleteComponent } from './autocomplete/autocomplete.component'
import { MelApplicationBannerComponent } from './application-banner/application-banner.component'
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
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatIconModule } from '@angular/material/icon'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { StripHtmlPipe } from './strip-html.pipe'
import { MelPaginationButtonsComponent } from './pagination-buttons/pagination-buttons.component'
import { MelExternalViewerButtonComponent } from './external-viewer-button/external-viewer-button.component'
import { NgIconsModule } from '@ng-icons/core'
import {
  matChevronLeft,
  matChevronRight,
  matOpenInNew,
  matSearch,
  matWarning,
} from '@ng-icons/material-icons/baseline'
import { iconoirBell } from '@ng-icons/iconoir'
import { matWarningAmberOutline } from '@ng-icons/material-icons/outline'

@NgModule({
  imports: [
    CommonModule,
    PopoverComponent,
    ContentGhostComponent,
    MetadataQualityItemComponent,
    MatAutocompleteModule,
    MatIconModule,
    TranslateModule,
    ReactiveFormsModule,
    PopupAlertComponent,
    ThumbnailComponent,
    ButtonComponent,
    ContentGhostComponent,
    ApplicationBannerComponent,
    AutocompleteComponent,
    CarouselComponent,
    ExternalViewerButtonComponent,
    FavoriteStarComponent,
    FuzzySearchComponent,
    MetadataQualityComponent,
    PaginationButtonsComponent,
    MaxLinesComponent,
    NgIconsModule.withIcons({
      matOpenInNew,
      matSearch,
      matChevronLeft,
      matChevronRight,
      iconoirBell,
      matWarningAmberOutline,
      matWarning,
    }),
  ],
  declarations: [
    ResultsListComponent,
    ResultsListCarouselComponent,
    ResultsListGridComponent,
    ResultsListItemComponent,
    ResultsCardFavoriteComponent,
    ResultsCardLastCreatedComponent,
    ResultsCardSearchComponent,
    MelDatahubMetadataQualityComponent,
    MelButtonComponent,
    FavoriteHeartComponent,
    HeartToggleComponent,
    TextExpandComponent,
    MelDatahubFooterComponent,
    MelCarouselComponent,
    MelFuzzySearchComponent,
    MelAutocompleteComponent,
    StripHtmlPipe,
    MelPaginationButtonsComponent,
    MelExternalViewerButtonComponent,
    MelApplicationBannerComponent,
  ],
  exports: [
    ResultsListComponent,
    ResultsListCarouselComponent,
    ResultsListGridComponent,
    ResultsListItemComponent,
    ResultsCardFavoriteComponent,
    ResultsCardLastCreatedComponent,
    ResultsCardSearchComponent,
    MelDatahubMetadataQualityComponent,
    MelButtonComponent,
    FavoriteHeartComponent,
    HeartToggleComponent,
    TextExpandComponent,
    MelDatahubFooterComponent,
    MelCarouselComponent,
    MelFuzzySearchComponent,
    MelAutocompleteComponent,
    MelPaginationButtonsComponent,
    MelExternalViewerButtonComponent,
    MelApplicationBannerComponent,
  ],
})
export class MelModule {}
