import { ChangeDetectionStrategy, Component } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

marker('mel.datahub.search.filters.topic')
marker('mel.datahub.search.filters.publisher')
marker('mel.datahub.search.filters.publicationYear')
marker('mel.datahub.search.filters.format')

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
      title: `mel.datahub.search.filters.${filter}`,
    })
  )
}
