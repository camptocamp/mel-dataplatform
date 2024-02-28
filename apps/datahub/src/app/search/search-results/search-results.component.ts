import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SearchFacade } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-search-results',
  templateUrl: './search-results.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent {
  constructor(protected searchFacade: SearchFacade) {}

  onShowMore() {
    this.searchFacade.scroll()
  }
}
