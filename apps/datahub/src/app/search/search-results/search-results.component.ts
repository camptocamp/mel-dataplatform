import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { RouterFacade, SearchFacade } from 'geonetwork-ui'
import { CatalogRecord } from 'geonetwork-ui/libs/common/domain/src/lib/model/record'

@Component({
  selector: 'mel-datahub-search-results',
  templateUrl: './search-results.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent implements OnInit {
  isQualitySortable = true

  constructor(
    private searchRouter: RouterFacade,
    private searchFacade: SearchFacade
  ) {}
  ngOnInit() {
    this.searchFacade.setResultsLayout('CARD')
  }
}
