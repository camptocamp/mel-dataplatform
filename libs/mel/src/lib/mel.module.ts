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
import { ButtonComponent } from './button/button.component'
import { FavoriteHeartComponent } from './favorites/favorite-heart/favorite-heart.component'
import { HeartToggleComponent } from './favorites/heart-toggle/heart-toggle.component'
import { TextExpandComponent } from './text-expand/text-expand.component'
import { MelDatahubFooterComponent } from './footer/mel-datahub-footer.component'
import { CustomCarouselComponent } from './custom-carousel/custom-carousel.component'
import { MelFuzzySearchComponent } from './fuzzy-search/fuzzy-search.component'
import { MelAutocompleteComponent } from './autocomplete/autocomplete.component'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
  FeatureCatalogModule,
  FeatureDatavizModule,
  FeatureMapModule,
  FeatureRecordModule,
  FeatureSearchModule,
  UiElementsModule,
  UiInputsModule,
  UiLayoutModule,
  UiMapModule,
  UiWidgetsModule,
} from 'geonetwork-ui'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatIconModule } from '@angular/material/icon'
import { MatTabsModule } from '@angular/material/tabs'
import { OverlayModule } from '@angular/cdk/overlay'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatTooltipModule } from '@angular/material/tooltip'
import { TranslateModule } from '@ngx-translate/core'
import { StripHtmlPipe } from './strip-html.pipe'

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    UiWidgetsModule,
    UiElementsModule,
    UiLayoutModule,
    UiInputsModule,
    UiMapModule,
    FeatureSearchModule,
    FeatureCatalogModule,
    FeatureRecordModule,
    FeatureMapModule,
    MatAutocompleteModule,
    MatIconModule,
    MatTabsModule,
    OverlayModule,
    FormsModule,
    MatTooltipModule,
    FeatureDatavizModule,
    TranslateModule,
    ReactiveFormsModule,
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
    ButtonComponent,
    FavoriteHeartComponent,
    HeartToggleComponent,
    TextExpandComponent,
    MelDatahubFooterComponent,
    CustomCarouselComponent,
    MelFuzzySearchComponent,
    MelAutocompleteComponent,
    StripHtmlPipe,
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
    ButtonComponent,
    FavoriteHeartComponent,
    HeartToggleComponent,
    TextExpandComponent,
    MelDatahubFooterComponent,
    CustomCarouselComponent,
    MelFuzzySearchComponent,
    MelAutocompleteComponent,
  ],
})
export class MelModule {}
