import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ResultsListComponent } from '../results-list.component'
import { CommonModule } from '@angular/common'
import { ResultsCardSearchComponent } from '../../results-list-item/results-card-search/results-card-search.component'
@Component({
  selector: 'mel-datahub-results-list-grid',
  templateUrl: './results-list-grid.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ResultsCardSearchComponent],
})
export class ResultsListGridComponent extends ResultsListComponent {}
