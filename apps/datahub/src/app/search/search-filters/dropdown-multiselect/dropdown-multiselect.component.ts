import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DropdownMultiselectComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-dropdown-multiselect',
  templateUrl: './dropdown-multiselect.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MelDropdownMultiselectComponent extends DropdownMultiselectComponent {}
