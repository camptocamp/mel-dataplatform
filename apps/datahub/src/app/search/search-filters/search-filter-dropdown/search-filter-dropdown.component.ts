import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FilterDropdownComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-search-filter-dropdown',
  templateUrl: './search-filter-dropdown.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilterDropdownComponent extends FilterDropdownComponent {}
