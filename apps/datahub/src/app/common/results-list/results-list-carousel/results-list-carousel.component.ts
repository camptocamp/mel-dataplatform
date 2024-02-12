import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { ResultsListComponent } from '../results-list.component'

@Component({
  selector: 'mel-datahub-results-list-carousel',
  templateUrl: './results-list-carousel.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsListCarouselComponent extends ResultsListComponent {
  @Input() numberOfDisplayedCards?: number = 3
}
