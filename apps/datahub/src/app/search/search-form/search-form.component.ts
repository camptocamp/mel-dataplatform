import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CatalogRecord, RouterFacade } from 'geonetwork-ui'
import { MelFuzzySearchComponent } from 'libs/mel/src/lib/fuzzy-search/fuzzy-search.component'
import { SearchFiltersComponent } from '../search-filters/search-filters.component'
import { TranslateDirective } from '@ngx-translate/core'

@Component({
  selector: 'mel-datahub-search-form',
  templateUrl: './search-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslateDirective,
    SearchFiltersComponent,
    MelFuzzySearchComponent,
  ],
})
export class SearchFormComponent {
  constructor(private routerFacade: RouterFacade) {}
  onFuzzySearchSelection(record: CatalogRecord) {
    this.routerFacade.goToMetadata(record)
  }
}
