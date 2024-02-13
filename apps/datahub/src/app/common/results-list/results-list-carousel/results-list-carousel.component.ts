import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import { ResultsListComponent } from '../results-list.component'

@Component({
  selector: 'mel-datahub-results-list-carousel',
  templateUrl: './results-list-carousel.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsListCarouselComponent
  extends ResultsListComponent
  implements OnInit
{
  @Input() numberOfDisplayedCards?: number = 3

  resultsReady = false

  override ngOnInit(): void {
    // unsubscribe?
    this.searchFacade.results$.subscribe((results) => {
      if (results.length > 0) this.resultsReady = true
      // this.changeDetector.detectChanges()
    })
  }
}
