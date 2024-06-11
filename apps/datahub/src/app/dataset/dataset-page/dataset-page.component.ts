import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ErrorType, MdViewFacade, RouterFacade } from 'geonetwork-ui'
import {
  CatalogRecord,
  Keyword,
} from 'geonetwork-ui/libs/common/domain/src/lib/model/record'
import { combineLatest, map, startWith } from 'rxjs'

@Component({
  selector: 'mel-datahub-dataset-page',
  templateUrl: './dataset-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
