import { ConnectedPosition } from '@angular/cdk/overlay'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { MdViewFacade } from 'geonetwork-ui'
import { DatasetFeatureCatalog } from 'geonetwork-ui/libs/common/domain/src/lib/model/record'

@Component({
  selector: 'mel-datahub-dataset-feature-catalog',
  templateUrl: './dataset-feature-catalog.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatasetFeatureCatalogComponent implements OnInit {
  filteredFeatureCatalog: DatasetFeatureCatalog

  protected overlayPositions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'top',
    },
  ]

  constructor(public readonly metadataViewFacade: MdViewFacade) {}

  ngOnInit(): void {
    this.metadataViewFacade.featureCatalog$.subscribe((catalog) => {
      this.filteredFeatureCatalog = catalog
    })
  }

  onFilteredFeatureCatalogChange(catalog: DatasetFeatureCatalog) {
    this.filteredFeatureCatalog = catalog
  }
}
