import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { SearchFacade, SearchService } from 'geonetwork-ui'
@Component({
  selector: 'mel-datahub-results-list-grid',
  templateUrl: './results-list-grid.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsListGridComponent {
  @Input() numberOfResults: number

  constructor(
    private searchService: SearchService,
    public searchFacade: SearchFacade
  ) {}

  onInfoKeywordClick(keyword: string) {
    this.searchService.updateFilters({ any: keyword })
  }
}
