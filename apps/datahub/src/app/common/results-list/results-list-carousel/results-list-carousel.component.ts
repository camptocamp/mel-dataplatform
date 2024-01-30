import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  RouterFacade,
  SearchFacade,
  SearchService,
  SearchState,
} from 'geonetwork-ui'
import { ResultsListComponent } from '../results-list.component'
import { Store } from '@ngrx/store'

@Component({
  selector: 'mel-datahub-results-list-carousel',
  templateUrl: './results-list-carousel.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsListCarouselComponent extends ResultsListComponent {
  constructor(
    protected override searchFacade: SearchFacade,
    public override routerFacade: RouterFacade,
    public override store: Store<SearchState>,
    public override searchService: SearchService
  ) {
    super(searchFacade, routerFacade, store, searchService)
  }
}
