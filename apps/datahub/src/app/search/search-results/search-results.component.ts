import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import {
  MetadataQualityDisplay,
  RouterFacade,
  SearchFacade,
} from 'geonetwork-ui'
import { CatalogRecord } from 'geonetwork-ui/src/libs/common/domain/src/lib/record'

@Component({
  selector: 'mel-datahub-search-results',
  templateUrl: './search-results.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent implements OnInit {
  isQualitySortable = true
  metadataQualityDisplay = {
    widget: true,
    title: true,
    description: true,
    contact: true,
    keywords: true,
    legalConstraints: true,
    topic: true,
    updateFrequency: true,
    organisation: true,
  } as MetadataQualityDisplay

  constructor(
    private searchRouter: RouterFacade,
    private searchFacade: SearchFacade
  ) {}
  ngOnInit() {
    this.searchFacade.setResultsLayout('CARD')
  }

  onMetadataSelection(metadata: CatalogRecord): void {
    this.searchRouter.goToMetadata(metadata)
  }
}
