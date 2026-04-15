import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  CatalogRecord,
  ErrorComponent,
  ErrorType,
  Keyword,
  MdViewFacade,
  RouterFacade,
} from 'geonetwork-ui'
import { ResultsCardLastCreatedComponent } from 'libs/mel/src/lib/results-list-item/results-card-last-created/results-card-last-created.component'
import { combineLatest, filter, map, startWith } from 'rxjs'
import { DatasetApisComponent } from '../dataset-apis/dataset-apis.component'
import { DatasetFeatureCatalogComponent } from '../dataset-feature-catalog/dataset-feature-catalog.component'
import { DatasetHeaderComponent } from '../dataset-header/dataset-header.component'
import { DatasetLinksComponent } from '../dataset-links/dataset-links.component'
import { DatasetVisualisationComponent } from '../dataset-visualisation/dataset-visualisation.component'
import { TranslateDirective } from '@ngx-translate/core'

@Component({
  selector: 'mel-datahub-dataset-page',
  templateUrl: './dataset-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslateDirective,
    ErrorComponent,
    DatasetHeaderComponent,
    DatasetVisualisationComponent,
    DatasetLinksComponent,
    DatasetApisComponent,
    DatasetFeatureCatalogComponent,
    ResultsCardLastCreatedComponent,
  ],
})
export class DatasetPageComponent {
  displayMap$ = combineLatest([
    this.facade.mapApiLinks$,
    this.facade.geoDataLinksWithGeometry$,
  ]).pipe(
    map(([mapApiLinks, geoDataLinksWithGeometry]) => {
      return mapApiLinks?.length > 0 || geoDataLinksWithGeometry?.length > 0
    }),
    startWith(false)
  )
  displayData$ = combineLatest([
    this.facade.dataLinks$,
    this.facade.geoDataLinks$,
  ]).pipe(
    map(
      ([dataLinks, geoDataLinks]) =>
        dataLinks?.length > 0 || geoDataLinks?.length > 0
    )
  )
  displayDownload$ = this.facade.downloadLinks$.pipe(
    map((links) => links?.length > 0)
  )
  displayApi$ = this.facade.apiLinks$.pipe(map((links) => links?.length > 0))
  displayRelated$ = this.facade.related$.pipe(
    map((records) => records?.length > 0)
  )
  displayAssociated$ = this.facade.otherLinks$.pipe(
    map((links) => links?.length > 0)
  )
  displayFeatureCatalog$ = combineLatest([
    this.facade.metadata$,
    this.facade.featureCatalog$,
  ]).pipe(
    map(
      ([metadata, featureCatalog]) =>
        //subscribing to metadata in order to refresh featureCatalog information
        featureCatalog?.featureTypes?.length > 0
    )
  )
  metadataUuid$ = this.facade.metadata$.pipe(
    map((record) => record?.uniqueIdentifier),
    filter(Boolean)
  )
  errorTypes = ErrorType

  constructor(
    public facade: MdViewFacade,
    protected routerFacade: RouterFacade
  ) {}

  onInfoKeywordClick(keyword: Keyword) {
    this.routerFacade.updateSearch({ q: keyword.label })
  }

  onMetadataSelection(metadata: CatalogRecord): void {
    this.routerFacade.goToMetadata(metadata)
  }
}
