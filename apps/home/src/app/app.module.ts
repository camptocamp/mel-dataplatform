import { importProvidersFrom, isDevMode, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import {
  FeatureAuthModule,
  FeatureCatalogModule,
  FeatureSearchModule,
  LOGIN_URL,
  provideGn4,
  provideRepositoryUrl,
  ThemeService,
  TRANSLATE_DEFAULT_CONFIG,
} from 'geonetwork-ui'
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MelModule, MelEmbeddedTranslateLoader } from '@mel-dataplatform/mel'
import { HomeHeaderComponent } from './home/home-header/home-header.component'
import { HomePageComponent } from './home/home-page/home-page.component'

@NgModule({
  declarations: [AppComponent, HomeHeaderComponent, HomePageComponent],
  imports: [
    MelModule,
    BrowserModule,
    BrowserAnimationsModule,
    FeatureSearchModule,
    FeatureCatalogModule,
    TranslateModule.forRoot({
      ...TRANSLATE_DEFAULT_CONFIG,
      loader: {
        provide: TranslateLoader,
        useClass: MelEmbeddedTranslateLoader,
      },
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
    StoreDevtoolsModule.instrument({ logOnly: !isDevMode() }),
  ],
  providers: [
    importProvidersFrom(FeatureAuthModule),
    provideGn4(),
    provideRepositoryUrl(() => '/geonetwork/srv/api'),
    {
      provide: LOGIN_URL,
      useFactory: () => '${current_url}?login',
    },
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
