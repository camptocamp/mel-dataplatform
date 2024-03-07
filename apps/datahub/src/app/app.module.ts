import { importProvidersFrom, isDevMode, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component'
import {
  DefaultRouterModule,
  FeatureAuthModule,
  FeatureCatalogModule,
  FeatureRecordModule,
  FeatureSearchModule,
  FeatureDatavizModule,
  LOGIN_URL,
  provideGn4,
  provideRepositoryUrl,
  RouterService,
  ThemeService,
  TRANSLATE_DEFAULT_CONFIG,
  UiElementsModule,
  UiLayoutModule,
  UiInputsModule,
  UiWidgetsModule
} from 'geonetwork-ui'
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { SearchPageComponent } from './search/search-page/search-page.component'
import { DatasetPageComponent } from './dataset/dataset-page/dataset-page.component'
import { SearchHeaderComponent } from './search/search-header/search-header.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SearchResultsComponent } from './search/search-results/search-results.component'
import { HomePageComponent } from './home/home-page/home-page.component'
import { AppRouterService } from './app.router.service'
import { HomeHeaderComponent } from './home/home-header/home-header.component'
import { MatIconModule } from '@angular/material/icon'
import { MelEmbeddedTranslateLoader } from './common/embedded.translate.loader'
import { ResultsListComponent } from './common/results-list/results-list.component'
import { ResultsListItemComponent } from './common/results-list-item/results-list-item.component'
import { ResultsListCarouselComponent } from './common/results-list/results-list-carousel/results-list-carousel.component'
import { ResultsListGridComponent } from './common/results-list/results-list-grid/results-list-grid.component'
import { ResultsCardFavoriteComponent } from './common/results-list-item/results-card-favorite/results-card-favorite.component'
import { ResultsCardLastCreatedComponent } from './common/results-list-item/results-card-last-created/results-card-last-created.component'
import { ResultsCardSearchComponent } from './common/results-list-item/results-card-search/results-card-search.component'
import { MatTabsModule } from '@angular/material/tabs'
import { DatasetApisComponent } from './dataset/dataset-apis/dataset-apis.component'
import { MelDatahubMetadataQualityComponent } from './common/metadata-quality/mel-datahub-metadata-quality.component'
import { DatasetHeaderComponent } from './dataset/dataset-header/dataset-header.component'
import { ButtonComponent } from './common/button/button.component'
import { DatasetDownloadsComponent } from './dataset/dataset-downloads/dataset-downloads.component'
import { FavoriteHeartComponent } from './common/favorites/favorite-heart/favorite-heart.component'
import { HeartToggleComponent } from './common/favorites/heart-toggle/heart-toggle.component'
import { TextExpandComponent } from './common/text-expand/text-expand.component'
import { MelDatahubFooterComponent } from './common/footer/mel-datahub-footer.component'
import { CustomCarouselComponent } from './common/custom-carousel/custom-carousel.component'
import { DatasetInformationComponent } from './dataset/dataset-information/dataset-information.component'
import { MelFuzzySearchComponent } from './common/fuzzy-search/fuzzy-search.component'
import { MelAutocompleteComponent } from './common/autocomplete/autocomplete.component'
import { ReactiveFormsModule } from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { SearchFormComponent } from './search/search-form/search-form.component'
import { SearchFiltersComponent } from './search/search-filters/search-filters.component'
import { MelFilterDropdownComponent } from './search/search-filters/filter-dropdown/filter-dropdown.component'
import { MelDropdownMultiselectComponent } from './search/search-filters/dropdown-multiselect/dropdown-multiselect.component'
import { OverlayModule } from '@angular/cdk/overlay'
import { FormsModule } from '@angular/forms'
import { ApiFormComponent } from './dataset/dataset-apis/api-form/api-form.component'
import { MelApiCardComponent } from './dataset/dataset-apis/api-card/api-card.component'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MelDownloadsListComponent } from './dataset/dataset-downloads/downloads-list/downloads-list.component'
import { MelDownloadItemComponent } from './dataset/dataset-downloads/download-item/download-item.component'
import { DatasetVisualisationComponent } from './dataset/dataset-visualisation/dataset-visualisation.component'
import { MapViewComponent } from './dataset/dataset-visualisation/map-view/map-view.component'
import { MelDataViewComponent } from './dataset/dataset-visualisation/data-view/data-view.component'

@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    SearchHeaderComponent,
    SearchResultsComponent,
    HomePageComponent,
    HomeHeaderComponent,
    ResultsListComponent,
    ResultsListCarouselComponent,
    ResultsListGridComponent,
    ResultsListItemComponent,
    ResultsCardFavoriteComponent,
    ResultsCardLastCreatedComponent,
    ResultsCardSearchComponent,
    DatasetPageComponent,
    DatasetApisComponent,
    MelDatahubMetadataQualityComponent,
    DatasetHeaderComponent,
    ButtonComponent,
    DatasetDownloadsComponent,
    FavoriteHeartComponent,
    HeartToggleComponent,
    TextExpandComponent,
    MelDatahubFooterComponent,
    CustomCarouselComponent,
    DatasetInformationComponent,
    MelFuzzySearchComponent,
    MelAutocompleteComponent,
    SearchFormComponent,
    SearchFiltersComponent,
    MelFilterDropdownComponent,
    MelDropdownMultiselectComponent,
    ApiFormComponent,
    MelApiCardComponent,
    MelDownloadsListComponent,
    MelDownloadItemComponent,
    DatasetVisualisationComponent,
    MapViewComponent,
    MelDataViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UiWidgetsModule,
    UiElementsModule,
    UiLayoutModule,
    UiInputsModule,
    FeatureSearchModule,
    FeatureCatalogModule,
    FeatureRecordModule,
    MatAutocompleteModule,
    MatIconModule,
    MatTabsModule,
    OverlayModule,
    FormsModule,
    MatTooltipModule,
    FeatureDatavizModule,
    TranslateModule.forRoot({
      ...TRANSLATE_DEFAULT_CONFIG,
      loader: {
        provide: TranslateLoader,
        useClass: MelEmbeddedTranslateLoader,
      },
    }),
    ReactiveFormsModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: [],
        runtimeChecks: {
          strictActionImmutability: false,
          strictStateImmutability: false,
        },
      }
    ),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ logOnly: !isDevMode() }),
    RouterModule.forRoot([], {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled',
    }),
    DefaultRouterModule.forRoot({
      searchStateId: 'mainSearch',
      searchRouteComponent: SearchPageComponent,
      recordRouteComponent: DatasetPageComponent,
    }),
  ],
  providers: [
    importProvidersFrom(FeatureAuthModule),
    provideGn4(),
    provideRepositoryUrl(() => '/geonetwork/srv/api'),
    {
      provide: LOGIN_URL,
      useFactory: () => '${current_url}?login',
    },
    { provide: RouterService, useClass: AppRouterService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(translate: TranslateService) {
    translate.setDefaultLang('fr')
    translate.use('fr')

    ThemeService.applyCssVariables(
      '#E30513',
      '#007A80',
      '#212029',
      'white',
      'Lato',
      'Montserrat'
    )
  }
}
