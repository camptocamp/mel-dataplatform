import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'
import {
  ChartViewComponent,
  DataViewComponent,
  DropdownSelectorComponent,
  TableViewComponent,
} from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-data-view',
  templateUrl: './data-view.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslatePipe,
    DropdownSelectorComponent,
    TableViewComponent,
    ChartViewComponent,
  ],
})
export class MelDataViewComponent extends DataViewComponent {
  override selectLink(linkAsString: unknown): void {
    super.selectLink(String(linkAsString))
  }
}
