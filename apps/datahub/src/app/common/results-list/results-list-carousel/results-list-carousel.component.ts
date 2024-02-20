import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import { ResultsListComponent } from '../results-list.component'
import { Subscription } from 'rxjs'

@Component({
  selector: 'mel-datahub-results-list-carousel',
  templateUrl: './results-list-carousel.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsListCarouselComponent
  extends ResultsListComponent
  implements OnInit, OnDestroy
{
  resultsSubscription: Subscription

  resultsReady = false

  override ngOnInit(): void {
    super.ngOnInit()
    this.resultsSubscription = this.searchFacade.results$.subscribe(
      (results) => {
        if (results.length > 0) this.resultsReady = true
      }
    )
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy()
    this.resultsSubscription.unsubscribe()
  }
}
