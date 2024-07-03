import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Optional,
} from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { RouterFacade } from 'geonetwork-ui'
import { CatalogRecord } from 'geonetwork-ui/libs/common/domain/src/lib/model/record'

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
    const categoryKeywords = this.record?.keywords?.filter(
      (keyword) => keyword.thesaurus?.name === 'Catégories'
    )

    return categoryKeywords?.map((keyword) => keyword.label)
  }

  onCategoryKeywordClick(category: string) {
    this.routerFacade.updateSearch({ categoryKeyword: category })
  }
}
