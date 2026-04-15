import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FilterDropdownComponent } from 'geonetwork-ui'
import { MelDropdownMultiselectComponent } from '../dropdown-multiselect/dropdown-multiselect.component'
import { MelDatahubDropdownRangeComponent } from '../mel-datahub-dropdown-range/mel-datahub-dropdown-range.component'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'mel-datahub-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MelDatahubDropdownRangeComponent,
    MelDropdownMultiselectComponent,
  ],
})
export class MelFilterDropdownComponent extends FilterDropdownComponent {}
