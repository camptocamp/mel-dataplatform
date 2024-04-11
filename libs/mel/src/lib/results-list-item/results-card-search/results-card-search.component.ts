import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ResultsListItemComponent } from '../results-list-item.component'

@Component({
  selector: 'mel-datahub-results-card-search',
  templateUrl: './results-card-search.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsCardSearchComponent extends ResultsListItemComponent {}
