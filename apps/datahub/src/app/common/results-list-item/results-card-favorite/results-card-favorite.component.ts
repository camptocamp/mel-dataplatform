import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ResultsListItemComponent } from '../results-list-item.component'

@Component({
  selector: 'mel-datahub-results-card-favorite',
  templateUrl: './results-card-favorite.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsCardFavoriteComponent extends ResultsListItemComponent {}
