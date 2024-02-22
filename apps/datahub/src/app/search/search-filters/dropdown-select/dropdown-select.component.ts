import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DropdownMultiselectComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-dropdown-select',
  templateUrl: './dropdown-select.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownSelectComponent extends DropdownMultiselectComponent {}
