import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ResultsListItemComponent } from '../results-list-item.component'
import { ThumbnailComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-results-card-last-created',
  templateUrl: './results-card-last-created.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ThumbnailComponent],
})
export class ResultsCardLastCreatedComponent extends ResultsListItemComponent {}
