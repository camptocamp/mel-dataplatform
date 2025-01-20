import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { MdViewFacade } from 'geonetwork-ui'
import { DatasetOnlineResource } from 'geonetwork-ui/libs/common/domain/src/lib/model/record'

@Component({
  selector: 'mel-datahub-dataset-visualisation',
  templateUrl: './dataset-visualisation.component.html',
  styles: `
  @media only screen and (max-width: 639px) {
    /*hide chart tab on mobile*/
      ::ng-deep .mat-mdc-tab.mdc-tab:nth-child(3) {
      display: none;
    }
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatasetVisualisationComponent {
  @Input() displayMap: boolean
  @Input() displayData: boolean
  selectedView: string

  selectedLink$ = new BehaviorSubject<DatasetOnlineResource>(null)

  constructor(public mdViewFacade: MdViewFacade) {
    this.selectedView = this.displayMap ? 'map' : 'table'
  }

  onTabIndexChange(index: number): void {
    let view
    switch (index) {
      case 1:
        view = 'table'
        break
      case 2:
        view = 'chart'
        break
      default:
        view = 'map'
    }
    this.selectedView = view
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }
}
