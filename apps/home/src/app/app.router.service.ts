import { Injectable } from '@angular/core'
import { Routes } from '@angular/router'
import { RouterService } from 'geonetwork-ui'
import { HomePageComponent } from './home/home-page/home-page.component'

@Injectable()
export class AppRouterService extends RouterService {
  override buildRoutes(): Routes {
    return [
      {
        path: '',
        component: HomePageComponent,
        data: {
          shouldDetach: true,
        },
      },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]
  }
}
