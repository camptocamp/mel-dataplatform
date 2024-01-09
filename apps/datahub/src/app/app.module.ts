import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import {
  DefaultRouterModule,
  EmbeddedTranslateLoader,
  TRANSLATE_DEFAULT_CONFIG,
  UiWidgetsModule
} from 'geonetwork-ui';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SearchPageComponent } from './search/search-page/search-page.component';
import { DatasetPageComponent } from './dataset/dataset-page/dataset-page.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    UiWidgetsModule,
    RouterModule.forRoot(appRoutes),
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
