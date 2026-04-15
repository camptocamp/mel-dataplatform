import { OverlayModule } from '@angular/cdk/overlay'
import { provideHttpClient } from '@angular/common/http'
import { importProvidersFrom, isDevMode, NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatIconModule } from '@angular/material/icon'
import { MatTabsModule } from '@angular/material/tabs'
import { MatTooltipModule } from '@angular/material/tooltip'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { MelEmbeddedTranslateLoader, MelModule } from '@mel-dataplatform/mel'
import { NgIconsModule } from '@ng-icons/core'
import {
  matClose,
  matExpandLess,
  matExpandMore,
  matMoreHoriz,
} from '@ng-icons/material-icons/baseline'
import { matCloseOutline } from '@ng-icons/material-icons/outline'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core'
import {
  ApiCardComponent,
  ChartViewComponent,
  ContentGhostComponent,
  CopyTextButtonComponent,
  DataViewShareComponent,
  DefaultRouterModule,
  DownloadItemComponent,
  DownloadsListComponent,
  DropdownMultiselectComponent,
  DropdownSelectorComponent,
  ErrorComponent,
  EXTERNAL_VIEWER_OPEN_NEW_TAB,
  EXTERNAL_VIEWER_URL_TEMPLATE,
  FeatureCatalogListComponent,
  FeatureDetailComponent,
  FeatureMapModule,
  FeatureRecordModule,
  FeatureSearchModule,
  FieldsService,
  GEONETWORK_UI_VERSION,
  Gn4PlatformService,
  LoadingMaskComponent,
  LOGIN_URL,
  MapContainerComponent,
  MapViewComponent,
  MarkdownParserComponent,
  PaginationButtonsComponent,
  PopupAlertComponent,
  provideGn4,
  provideRepositoryUrl,
  RecordApiFormComponent,
  SearchFeatureCatalogComponent,
  SearchRouterContainerDirective,
  SearchStateContainerDirective,
  SpinningLoaderComponent,
  TableViewComponent,
  TextInputComponent,
  ThemeService,
  TRANSLATE_DEFAULT_CONFIG,
  WEB_COMPONENT_EMBEDDER_URL,
} from 'geonetwork-ui'
import { environment } from '../environments/environment'
import { AppComponent } from './app.component'
import { MelApiCardComponent } from './dataset/dataset-apis/api-card/api-card.component'
import { ApiFormComponent } from './dataset/dataset-apis/api-form/api-form.component'
import { DatasetApisComponent } from './dataset/dataset-apis/dataset-apis.component'
import { DatasetFeatureCatalogComponent } from './dataset/dataset-feature-catalog/dataset-feature-catalog.component'
import { DatasetHeaderComponent } from './dataset/dataset-header/dataset-header.component'
import { DatasetInformationComponent } from './dataset/dataset-information/dataset-information.component'
import { DatasetLinksComponent } from './dataset/dataset-links/dataset-links.component'
import { MelLinkItemComponent } from './dataset/dataset-links/link-item/link-item.component'
import { MelLinksListComponent } from './dataset/dataset-links/links-list/links-list.component'
import { DatasetPageComponent } from './dataset/dataset-page/dataset-page.component'
import { MelDataViewComponent } from './dataset/dataset-visualisation/data-view/data-view.component'
import { DatasetVisualisationComponent } from './dataset/dataset-visualisation/dataset-visualisation.component'
import { MelMapViewComponent } from './dataset/dataset-visualisation/map-view/map-view.component'
import { MelDropdownMultiselectComponent } from './search/search-filters/dropdown-multiselect/dropdown-multiselect.component'
import { MelFilterDropdownComponent } from './search/search-filters/filter-dropdown/filter-dropdown.component'
import { MelDatahubDropdownRangeComponent } from './search/search-filters/mel-datahub-dropdown-range/mel-datahub-dropdown-range.component'
import { SearchFiltersComponent } from './search/search-filters/search-filters.component'
import { SearchFormComponent } from './search/search-form/search-form.component'
import { SearchHeaderComponent } from './search/search-header/search-header.component'
import { SearchPageComponent } from './search/search-page/search-page.component'
import { SearchResultsComponent } from './search/search-results/search-results.component'
import { MelFieldsService } from './search/service/fields.service'

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,
    OverlayModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatTabsModule,
    MatTooltipModule,
    RouterModule.forRoot([], {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled',
    }),
    // Ng Icons
    NgIconsModule.withIcons({
      matCloseOutline,
      matMoreHoriz,
      matExpandMore,
      matExpandLess,
      matClose,
    }),
    // NgRx
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
    StoreDevtoolsModule.instrument({
      logOnly: !isDevMode(),
      connectInZone: true,
    }),
    // ngx-translate
    TranslateModule.forRoot({
      ...TRANSLATE_DEFAULT_CONFIG,
      loader: {
        provide: TranslateLoader,
        useClass: MelEmbeddedTranslateLoader,
      },
    }),
    // GeoNetwork-UI
    ApiCardComponent,
    ChartViewComponent,
    ContentGhostComponent,
    CopyTextButtonComponent,
    DataViewShareComponent,
    DownloadItemComponent,
    DownloadsListComponent,
    DropdownMultiselectComponent,
    DropdownSelectorComponent,
    ErrorComponent,
    FeatureCatalogListComponent,
    FeatureDetailComponent,
    FeatureMapModule,
    FeatureRecordModule,
    LoadingMaskComponent,
    MapContainerComponent,
    MapViewComponent,
    MarkdownParserComponent,
    PaginationButtonsComponent,
    PopupAlertComponent,
    RecordApiFormComponent,
    SearchFeatureCatalogComponent,
    SearchRouterContainerDirective,
    SearchStateContainerDirective,
    SpinningLoaderComponent,
    TableViewComponent,
    TextInputComponent,
    DefaultRouterModule.forRoot({
      searchStateId: 'mainSearch',
      searchRouteComponent: SearchPageComponent,
      recordRouteComponent: DatasetPageComponent,
      serviceRouteComponent: DatasetPageComponent,
      reuseRouteComponent: DatasetPageComponent,
      // reusing the search component for the organization route since MEL
      // does not have org routes but param is compulsory
      organizationRouteComponent: SearchPageComponent,
    }),
    // MEL
    MelModule,
    MelApiCardComponent,
    ApiFormComponent,
    DatasetApisComponent,
    DatasetFeatureCatalogComponent,
    DatasetHeaderComponent,
    DatasetInformationComponent,
    DatasetLinksComponent,
    MelLinkItemComponent,
    MelLinksListComponent,
    DatasetPageComponent,
    MelDataViewComponent,
    DatasetVisualisationComponent,
    MelMapViewComponent,
    MelDropdownMultiselectComponent,
    MelFilterDropdownComponent,
    MelDatahubDropdownRangeComponent,
    SearchFiltersComponent,
    SearchFormComponent,
    SearchHeaderComponent,
    SearchPageComponent,
    SearchResultsComponent,
  ],
  providers: [
    provideHttpClient(),
    importProvidersFrom(FeatureSearchModule),
    provideGn4(),
    { provide: GEONETWORK_UI_VERSION, useValue: environment.version },
    {
      provide: WEB_COMPONENT_EMBEDDER_URL,
      useFactory: () => '/catalogue/wc-embedder.html',
    },
    provideRepositoryUrl(() => '/geonetwork/srv/api'),
    {
      provide: LOGIN_URL,
      useFactory: () => '${current_url}?login',
    },
    {
      provide: EXTERNAL_VIEWER_URL_TEMPLATE,
      useFactory: () =>
        '/mapstore/#/?actions=[{"type":"CATALOG:ADD_LAYERS_FROM_CATALOGS","layers":["${layer_name}"],"sources":[{"url":"${service_url}","type":"${service_type}"}]}]',
    },
    {
      provide: EXTERNAL_VIEWER_OPEN_NEW_TAB,
      useFactory: () => true,
    },
    { provide: FieldsService, useClass: MelFieldsService },
    Gn4PlatformService,
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
