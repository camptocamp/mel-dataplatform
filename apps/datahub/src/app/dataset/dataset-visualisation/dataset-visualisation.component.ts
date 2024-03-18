import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { getLinkPriority, getLinkLabel } from 'geonetwork-ui'
import { BehaviorSubject, combineLatest, map, tap } from 'rxjs'
import { MdViewFacade } from 'geonetwork-ui'
import { DatasetDistribution } from 'geonetwork-ui/libs/common/domain/src/lib/model/record'

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

  compatibleDataLinks$ = combineLatest([
    this.mdViewFacade.dataLinks$,
    this.mdViewFacade.geoDataLinks$,
  ]).pipe(
    map(([dataLinks, geoDataLinks]) => {
      const a = [...dataLinks, ...geoDataLinks]
      a.sort((a, b) => getLinkPriority(b) - getLinkPriority(a))
      return a
    })
  )

  dropdownChoices$ = this.compatibleDataLinks$.pipe(
    tap((links) => {
      if (links.indexOf(this.selectedLink$.value) === -1) {
        this.selectedLink$.next(links[0])
      }
    }),
    map((links) =>
      links.map((link) => ({
        label: getLinkLabel(link),
        value: JSON.stringify(link),
      }))
    )
  )

  selectedLink$ = new BehaviorSubject<DatasetDistribution>(null)

  constructor(public mdViewFacade: MdViewFacade) {}

  onTabIndexChange(index: number): void {
    this.selectedTabIndex = index
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }
}
