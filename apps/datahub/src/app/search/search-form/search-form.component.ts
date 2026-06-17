import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MelFuzzySearchComponent } from '@mel-dataplatform/mel'
import { TranslateDirective } from '@ngx-translate/core'
import { CatalogRecord, RouterFacade, SortByComponent } from 'geonetwork-ui'
import { SearchFiltersComponent } from '../search-filters/search-filters.component'

@Component({
  selector: 'mel-datahub-search-form',
  templateUrl: './search-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslateDirective,
    SearchFiltersComponent,
    MelFuzzySearchComponent,
    SortByComponent,
  ],
})
export class SearchFormComponent {
  private routerFacade = inject(RouterFacade)

  onFuzzySearchSelection(record: CatalogRecord) {
    this.routerFacade.goToMetadata(record)
  }
}
