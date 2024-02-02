import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import {
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
  @Input() metadata: Partial<DatasetRecord | ServiceRecord>

  scrollTo(id: string) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
  }
}
