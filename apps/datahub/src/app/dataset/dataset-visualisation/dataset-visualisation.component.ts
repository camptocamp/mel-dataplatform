import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { MdViewFacade } from 'geonetwork-ui'
import { DatasetDistribution } from 'geonetwork-ui/libs/common/domain/src/lib/model/record'

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
  selectedView = 'map'

  selectedLink$ = new BehaviorSubject<DatasetDistribution>(null)

  constructor(public mdViewFacade: MdViewFacade) {}

  onTabIndexChange(index: number): void {
    let view
    switch (index) {
      case 0:
        view = 'map'
        break
      case 1:
        view = 'table'
        break
      default:
        view = 'chart'
    }
    this.selectedView = view
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }
}
