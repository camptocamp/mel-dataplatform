import { provideHttpClient } from '@angular/common/http'
import {
  importProvidersFrom,
  isDevMode,
  NgModule,
  provideNgReflectAttributes,
} from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { setCacheExpiryDuration } from '@camptocamp/ogc-client'
import {
  MelDatahubFooterComponent,
  MelEmbeddedTranslateLoader,
} from '@mel-dataplatform/mel'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core'
import {
  DefaultRouterModule,
  EXTERNAL_VIEWER_OPEN_NEW_TAB,
  EXTERNAL_VIEWER_URL_TEMPLATE,
  FeatureRecordModule,
  FeatureSearchModule,
  FieldsService,
  GEONETWORK_UI_VERSION,
  LOGIN_URL,
  provideGn4,
  provideRepositoryUrl,
  SearchRouterContainerDirective,
  ThemeService,
  TRANSLATE_DEFAULT_CONFIG,
  WEB_COMPONENT_EMBEDDER_URL,
} from 'geonetwork-ui'
import { environment } from '../environments/environment'
import { AppComponent } from './app.component'
import { DatasetPageComponent } from './dataset/dataset-page/dataset-page.component'
import { SearchPageComponent } from './search/search-page/search-page.component'
import { MelFieldsService } from './search/service/fields.service'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([], {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled',
    }),
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
    TranslateModule.forRoot({
      ...TRANSLATE_DEFAULT_CONFIG,
      loader: {
        provide: TranslateLoader,
        useClass: MelEmbeddedTranslateLoader,
      },
    }),
    FeatureRecordModule,
    SearchRouterContainerDirective,
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
    MelDatahubFooterComponent,
  ],
  providers: [
    provideNgReflectAttributes(),
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
