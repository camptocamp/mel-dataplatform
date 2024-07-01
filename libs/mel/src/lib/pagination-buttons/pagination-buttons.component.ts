import { ChangeDetectionStrategy, Component } from '@angular/core'
import { PaginationButtonsComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-pagination-buttons',
  templateUrl: './pagination-buttons.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MelPaginationButtonsComponent extends PaginationButtonsComponent {}
