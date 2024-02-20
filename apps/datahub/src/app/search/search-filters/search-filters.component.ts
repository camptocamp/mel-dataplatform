import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'mel-datahub-search-filters',
  templateUrl: './search-filters.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFiltersComponent {
  searchConfig = ['topic', 'publisher', 'publicationYear', 'format'].map(
    (filter) => ({
      fieldName: filter,
      title: `search.filters.${filter}`,
    })
  )
}
