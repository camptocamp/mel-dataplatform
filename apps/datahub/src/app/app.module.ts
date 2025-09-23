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
  FeatureMapModule,
  LOGIN_URL,
  provideGn4,
  provideRepositoryUrl,
  ThemeService,
  TRANSLATE_DEFAULT_CONFIG,
  GEONETWORK_UI_VERSION,
  WEB_COMPONENT_EMBEDDER_URL,
  FieldsService,
  PopupAlertComponent,
  ContentGhostComponent,
  PaginationButtonsComponent,
  SpinningLoaderComponent,
  TextInputComponent,
  LoadingMaskComponent,
  FeatureDetailComponent,
  DataViewShareComponent,
  ChartViewComponent,
  TableViewComponent,
  ErrorComponent,
  CopyTextButtonComponent,
  MapContainerComponent,
  EXTERNAL_VIEWER_URL_TEMPLATE,
  EXTERNAL_VIEWER_OPEN_NEW_TAB,
  Gn4PlatformService,
  ApiCardComponent,
  RecordApiFormComponent,
  DownloadItemComponent,
  DownloadsListComponent,
  MapViewComponent,
  DropdownMultiselectComponent,
  DropdownSelectorComponent,
  MarkdownParserComponent,
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
import { DatasetLinksComponent } from './dataset/dataset-links/dataset-links.component'
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
import { MelLinksListComponent } from './dataset/dataset-links/links-list/links-list.component'
import { MelLinkItemComponent } from './dataset/dataset-links/link-item/link-item.component'
import { DatasetVisualisationComponent } from './dataset/dataset-visualisation/dataset-visualisation.component'
import { MelMapViewComponent } from './dataset/dataset-visualisation/map-view/map-view.component'
import { MelDataViewComponent } from './dataset/dataset-visualisation/data-view/data-view.component'
import { environment } from '../environments/environnment'
import { MelModule, MelEmbeddedTranslateLoader } from '@mel-dataplatform/mel'
import { MelFieldsService } from './search/service/fields.service'
import { MelDatahubDropdownRangeComponent } from './search/search-filters/mel-datahub-dropdown-range/mel-datahub-dropdown-range.component'
import { matCloseOutline } from '@ng-icons/material-icons/outline'
import { NgIconsModule } from '@ng-icons/core'
import {
  matClose,
  matExpandLess,
  matExpandMore,
  matMoreHoriz,
} from '@ng-icons/material-icons/baseline'

@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    SearchHeaderComponent,
    SearchResultsComponent,
    DatasetPageComponent,
    DatasetApisComponent,
    DatasetHeaderComponent,
    DatasetLinksComponent,
    DatasetInformationComponent,
    SearchFormComponent,
    SearchFiltersComponent,
    MelFilterDropdownComponent,
    MelDropdownMultiselectComponent,
    ApiFormComponent,
    MelLinksListComponent,
    MelLinkItemComponent,
    DatasetVisualisationComponent,
    MelMapViewComponent,
    MelDataViewComponent,
    MelDatahubDropdownRangeComponent,
    MelApiCardComponent,
  ],
  imports: [
    MelModule,
    BrowserModule,
    BrowserAnimationsModule,
    SpinningLoaderComponent,
    LoadingMaskComponent,
    ContentGhostComponent,
    ErrorComponent,
    PaginationButtonsComponent,
    TextInputComponent,
    CopyTextButtonComponent,
    FeatureSearchModule,
    FeatureCatalogModule,
    FeatureRecordModule,
    DataViewShareComponent,
    FeatureMapModule,
    MatAutocompleteModule,
    MatIconModule,
    MatTabsModule,
    OverlayModule,
    FormsModule,
    MatTooltipModule,
    PopupAlertComponent,
    FeatureDetailComponent,
    ChartViewComponent,
    TableViewComponent,
    MapContainerComponent,
    ApiCardComponent,
    RecordApiFormComponent,
    DownloadItemComponent,
    DownloadsListComponent,
    MapViewComponent,
    DropdownMultiselectComponent,
    DropdownSelectorComponent,
    ContentGhostComponent,
    MarkdownParserComponent,
    NgIconsModule.withIcons({
      matCloseOutline,
      matMoreHoriz,
      matExpandMore,
      matExpandLess,
      matClose,
    }),
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
    StoreDevtoolsModule.instrument({
      logOnly: !isDevMode(),
      connectInZone: true,
    }),
    RouterModule.forRoot([], {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled',
    }),
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
  ],
  providers: [
    importProvidersFrom(FeatureAuthModule),
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
