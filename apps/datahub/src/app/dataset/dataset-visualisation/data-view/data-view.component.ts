import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DataViewComponent } from 'geonetwork-ui'
import { DatasetOnlineResource } from 'geonetwork-ui/libs/common/domain/src/lib/model/record'

@Component({
  selector: 'mel-datahub-data-view',
  templateUrl: './data-view.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MelDataViewComponent extends DataViewComponent {
  override selectLink(linkAsString: unknown): void {
    super.selectLink(String(linkAsString))
  }
}
