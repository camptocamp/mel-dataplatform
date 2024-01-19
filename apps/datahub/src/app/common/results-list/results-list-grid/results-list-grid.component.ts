import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ResultsListComponent } from '../results-list.component'

@Component({
  selector: 'mel-datahub-results-list-grid',
  templateUrl: './results-list-grid.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsListGridComponent extends ResultsListComponent {}
