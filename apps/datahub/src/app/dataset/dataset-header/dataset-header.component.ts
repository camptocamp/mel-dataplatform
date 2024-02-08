import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import {
  CatalogRecord,
  DatasetRecord,
  ServiceRecord,
} from 'geonetwork-ui/libs/common/domain/src/lib/model/record'

@Component({
  selector: 'mel-datahub-dataset-header',
  templateUrl: './dataset-header.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatasetHeaderComponent {
  @Input() set metadata(value: Partial<DatasetRecord | ServiceRecord>) {
    this.record = value as CatalogRecord
  }
  record: CatalogRecord

  @Input() incomplete: boolean

  fieldReady(propName: string) {
    return !this.incomplete || propName in this.metadata
  }

  getScrollElement(id: string) {
    return !!document.getElementById(id)
  }

  scrollTo(id: string) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
  }
}
