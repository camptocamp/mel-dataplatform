import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { BehaviorSubject, map } from 'rxjs'
import { MdViewFacade } from 'geonetwork-ui'
import { DatasetDistribution } from 'geonetwork-ui/libs/common/domain/src/lib/model/record'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'

@Component({
  selector: 'mel-datahub-dataset-visualisation',
  templateUrl: './dataset-visualisation.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatasetVisualisationComponent {
  @Input() displayMap: boolean
  @Input() displayData: boolean
  selectedTabIndex = 0

  selectedLink$ = new BehaviorSubject<DatasetDistribution>(null)

  constructor(
    public mdViewFacade: MdViewFacade,
    private breakpointObserver: BreakpointObserver
  ) {}

  onTabIndexChange(index: number): void {
    this.selectedTabIndex = index
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }

  isMediumScreen$ = this.breakpointObserver
    .observe(Breakpoints.Medium)
    .pipe(map((result) => result.matches))
}
