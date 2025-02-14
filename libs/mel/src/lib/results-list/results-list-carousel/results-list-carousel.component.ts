import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { ResultsListComponent } from '../results-list.component'
import { CatalogRecord } from 'geonetwork-ui/libs/common/domain/src/lib/model/record'

@Component({
  selector: 'mel-datahub-results-list-carousel',
  templateUrl: './results-list-carousel.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsListCarouselComponent extends ResultsListComponent {
  @Input() records: CatalogRecord[]
}
