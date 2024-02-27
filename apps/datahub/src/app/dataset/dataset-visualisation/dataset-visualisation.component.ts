import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'mel-datahub-dataset-visualisation',
  templateUrl: './dataset-visualisation.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatasetVisualisationComponent {
  @Input() displayMap: boolean
  @Input() displayData: boolean
  selectedTabIndex$ = new BehaviorSubject(0)

  onTabIndexChange(index: number): void {
    this.selectedTabIndex$.next(index)
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }
}
