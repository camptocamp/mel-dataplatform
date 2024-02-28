import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FilterDropdownComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MelFilterDropdownComponent extends FilterDropdownComponent {}
