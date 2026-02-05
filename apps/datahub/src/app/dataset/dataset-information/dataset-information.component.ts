import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Optional,
} from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { RouterFacade } from 'geonetwork-ui'
import {
  CatalogRecord,
  Keyword,
} from 'geonetwork-ui/libs/common/domain/src/lib/model/record'

@Component({
  selector: 'mel-datahub-dataset-information',
  templateUrl: './dataset-information.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatasetInformationComponent {
  @Input() record: Partial<CatalogRecord>
  iconsUrl = 'assets/icons/'

  constructor(
    public translateService: TranslateService,
    @Optional() protected routerFacade: RouterFacade
  ) {}

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

  get isDevEnv() {
    return (
      window.location.hostname ===
      'mel-integration.apps.prod.gs-platform-fr.camptocamp.cloud'
    )
  }

  onKeywordClick(query: string, keyword: Keyword) {
    this.routerFacade.updateSearch({ [query]: keyword.key })
  }
}
