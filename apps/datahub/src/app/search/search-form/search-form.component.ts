import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterFacade } from 'geonetwork-ui'
import { CatalogRecord } from 'geonetwork-ui/libs/common/domain/src/lib/model/record'

@Component({
  selector: 'mel-datahub-search-form',
  templateUrl: './search-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent {
  constructor(private routerFacade: RouterFacade) {}
  onFuzzySearchSelection(record: CatalogRecord) {
    this.routerFacade.goToMetadata(record)
  }
}
