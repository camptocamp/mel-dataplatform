import { provideHttpClient } from '@angular/common/http'
import { importProvidersFrom, isDevMode, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MelEmbeddedTranslateLoader, MelModule } from '@mel-dataplatform/mel'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core'
import {
  FeatureSearchModule,
  Gn4PlatformService,
  LOGIN_URL,
  provideGn4,
  provideRepositoryUrl,
  SearchStateContainerDirective,
  ThemeService,
  TRANSLATE_DEFAULT_CONFIG,
} from 'geonetwork-ui'
import { AppComponent } from './app.component'
import { HomeHeaderComponent } from './home/home-header/home-header.component'
import { HomePageComponent } from './home/home-page/home-page.component'

@NgModule({
  declarations: [AppComponent],
  imports: [
    MelModule,
    HomeHeaderComponent,
    HomePageComponent,
    BrowserModule,
    BrowserAnimationsModule,
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
    StoreDevtoolsModule.instrument({
      logOnly: !isDevMode(),
      connectInZone: true,
    }),
    SearchStateContainerDirective,
  ],
  providers: [
    provideHttpClient(),
    importProvidersFrom(FeatureSearchModule),
    provideGn4(),
    provideRepositoryUrl(() => '/geonetwork/srv/api'),
    {
      provide: LOGIN_URL,
      useFactory: () => '${current_url}?login',
    },
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
