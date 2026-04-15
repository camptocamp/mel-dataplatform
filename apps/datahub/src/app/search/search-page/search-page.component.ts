import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SearchHeaderComponent } from '../search-header/search-header.component'
import { SearchFormComponent } from '../search-form/search-form.component'
import { SearchResultsComponent } from '../search-results/search-results.component'

@Component({
  selector: 'mel-datahub-search-page',
  templateUrl: './search-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SearchHeaderComponent, SearchFormComponent, SearchResultsComponent],
})
export class SearchPageComponent {}
