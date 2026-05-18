import { AsyncPipe } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { matOpenInNew } from '@ng-icons/material-icons/baseline'
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core'
import { CatalogRecord, Keyword, RouterFacade } from 'geonetwork-ui'
import { map } from 'rxjs'
import { GeorchestraPlatformService } from '../../platform/georchestra-platform.service'

@Component({
  selector: 'mel-datahub-dataset-information',
  templateUrl: './dataset-information.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, NgIconComponent, TranslateDirective, TranslatePipe],
  providers: [
    provideIcons({
      matOpenInNew,
    }),
  ],
})
export class DatasetInformationComponent {
  public translateService = inject(TranslateService)
  protected routerFacade = inject(RouterFacade, { optional: true })
  private georchestraPlatformService = inject(GeorchestraPlatformService)

  @Input() record: Partial<CatalogRecord>
  iconsUrl = 'assets/icons/'

  get lastUpdate() {
    return this.record?.resourceUpdated?.toLocaleDateString(
      this.translateService.currentLang
    )
  }

  get territories() {
    return this.record?.keywords?.filter((keyword) => keyword.type === 'place')
  }

  get displayCategories() {
    return this.record?.keywords?.filter(
      (keyword) =>
        keyword.thesaurus?.id ===
        'geonetwork.thesaurus.external.theme.thesaurus_mot_cle_thematique_categories'
    )
  }

  get displayLandingPage$() {
    return this.georchestraPlatformService
      .getMyRoles()
      .pipe(
        map(
          (roles) =>
            roles.includes('ROLE_SUPERUSER') || roles.includes('ROLE_MEL')
        )
      )
  }

  onKeywordClick(query: string, keyword: Keyword) {
    this.routerFacade.updateSearch({ [query]: keyword.key })
  }
}
