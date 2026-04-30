import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MelFuzzySearchComponent } from '@mel-dataplatform/mel'
import { TranslateDirective } from '@ngx-translate/core'
import { CatalogRecord, RouterFacade } from 'geonetwork-ui'
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
  ],
})
export class SearchFormComponent {
  constructor(private routerFacade: RouterFacade) {}
  onFuzzySearchSelection(record: CatalogRecord) {
    this.routerFacade.goToMetadata(record)
  }
}
