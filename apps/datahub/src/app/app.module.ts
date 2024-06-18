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
  FeatureMapModule,
  LOGIN_URL,
  provideGn4,
  provideRepositoryUrl,
  ThemeService,
  TRANSLATE_DEFAULT_CONFIG,
  UiElementsModule,
  UiLayoutModule,
  UiInputsModule,
  UiWidgetsModule,
  UiMapModule,
  GN_UI_VERSION,
  WEB_COMPONENT_EMBEDDER_URL,
  FieldsService,
  PopupAlertComponent,
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
import { MatIconModule } from '@angular/material/icon'
import { MatTabsModule } from '@angular/material/tabs'
import { DatasetApisComponent } from './dataset/dataset-apis/dataset-apis.component'
import { DatasetHeaderComponent } from './dataset/dataset-header/dataset-header.component'
import { DatasetDownloadsComponent } from './dataset/dataset-downloads/dataset-downloads.component'
import { DatasetInformationComponent } from './dataset/dataset-information/dataset-information.component'
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
import { MelMapViewComponent } from './dataset/dataset-visualisation/map-view/map-view.component'
import { MelDataViewComponent } from './dataset/dataset-visualisation/data-view/data-view.component'
import { environment } from '../environments/environnment'
import { MelModule, MelEmbeddedTranslateLoader } from '@mel-dataplatform/mel'
import { MelFieldsService } from './search/service/fields.service'

@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    SearchHeaderComponent,
    SearchResultsComponent,
    DatasetPageComponent,
    DatasetApisComponent,
    DatasetHeaderComponent,
    DatasetDownloadsComponent,
    DatasetInformationComponent,
    SearchFormComponent,
    SearchFiltersComponent,
    MelFilterDropdownComponent,
    MelDropdownMultiselectComponent,
    ApiFormComponent,
    MelApiCardComponent,
    MelDownloadsListComponent,
    MelDownloadItemComponent,
    DatasetVisualisationComponent,
    MelMapViewComponent,
    MelDataViewComponent,
  ],
  imports: [
    MelModule,
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
    PopupAlertComponent,
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
    { provide: GN_UI_VERSION, useValue: environment.version },
    {
      provide: WEB_COMPONENT_EMBEDDER_URL,
      useFactory: () => '/catalogue/wc-embedder.html',
    },
    provideRepositoryUrl(() => '/geonetwork/srv/api'),
    {
      provide: LOGIN_URL,
      useFactory: () => '${current_url}?login',
    },
    { provide: FieldsService, useClass: MelFieldsService },
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
      'Lato'
    )
  }
}
