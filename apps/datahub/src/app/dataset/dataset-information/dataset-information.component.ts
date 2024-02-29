import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
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
  @Output() keyword = new EventEmitter<string>()

  constructor(public translateService: TranslateService) {}

  get lastUpdate() {
    return this.record?.recordUpdated?.toLocaleDateString(
      this.translateService.currentLang
    )
  }

  onKeywordClick(keyword: string, event: Event) {
    event.stopPropagation()
    this.keyword.emit(keyword)
  }
}
