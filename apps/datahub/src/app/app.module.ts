import { importProvidersFrom, isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {
  DefaultRouterModule,
  EmbeddedTranslateLoader,
  FeatureAuthModule,
  FeatureCatalogModule,
  FeatureSearchModule,
  provideRepositoryUrl,
  RouterService,
  TRANSLATE_DEFAULT_CONFIG,
  UiWidgetsModule,
} from 'geonetwork-ui';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SearchPageComponent } from './search/search-page/search-page.component';
import { DatasetPageComponent } from './dataset/dataset-page/dataset-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRouterService } from './app.router.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UiWidgetsModule,
    FeatureSearchModule,
    FeatureCatalogModule,
    RouterModule.forRoot([], {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled',
    }),
    TranslateModule.forRoot({
      ...TRANSLATE_DEFAULT_CONFIG,
      loader: {
        provide: TranslateLoader,
        useClass: EmbeddedTranslateLoader,
      },
    }),
    StoreModule.forRoot(
      {},
      {
        metaReducers: [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ logOnly: !isDevMode() }),
    DefaultRouterModule.forRoot({
      searchStateId: 'mainSearch',
      searchRouteComponent: SearchPageComponent,
      recordRouteComponent: DatasetPageComponent,
    }),
  ],
  providers: [
    importProvidersFrom(FeatureAuthModule),
    provideRepositoryUrl(() => '/geonetwork/srv/api'),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
