import { ChangeDetectionStrategy, Component } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

marker('mel.datahub.search.filters.categoryKeyword')
marker('mel.datahub.search.filters.publisher')
marker('mel.datahub.search.filters.revisionYear')
marker('mel.datahub.search.filters.license')

@Component({
  selector: 'mel-datahub-search-filters',
  templateUrl: './search-filters.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFiltersComponent {
  searchConfig = [
    'categoryKeyword',
    'publisher',
    'revisionYear',
    'license',
  ].map((filter) => ({
    fieldName: filter,
    title: `mel.datahub.search.filters.${filter}`,
  }))
}
