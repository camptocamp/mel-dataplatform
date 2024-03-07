import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { DataViewComponent } from 'geonetwork-ui'
import { DatasetDistribution } from 'geonetwork-ui/libs/common/domain/src/lib/model/record'

@Component({
  selector: 'mel-datahub-data-view',
  templateUrl: './data-view.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MelDataViewComponent extends DataViewComponent {
  @Input() set links(link: unknown) {
    const parsedLink: DatasetDistribution = JSON.parse(link[0].value)
    parsedLink.url = new URL(parsedLink.url)
    this.selectedLink$.next(parsedLink)
  }
}
