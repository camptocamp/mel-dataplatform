import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay'
import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { TranslateDirective } from '@ngx-translate/core'
import {
  DatasetFeatureCatalog,
  FeatureCatalogListComponent,
  MdViewFacade,
  SearchFeatureCatalogComponent,
} from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-dataset-feature-catalog',
  templateUrl: './dataset-feature-catalog.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    OverlayModule,
    TranslateDirective,
    SearchFeatureCatalogComponent,
    FeatureCatalogListComponent,
  ],
})
export class DatasetFeatureCatalogComponent implements OnInit {
  public readonly metadataViewFacade = inject(MdViewFacade)

  filteredFeatureCatalog: DatasetFeatureCatalog

  protected overlayPositions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'top',
    },
  ]

  ngOnInit(): void {
    this.metadataViewFacade.featureCatalog$.subscribe((catalog) => {
      this.filteredFeatureCatalog = catalog
    })
  }

  onFilteredFeatureCatalogChange(catalog: DatasetFeatureCatalog) {
    this.filteredFeatureCatalog = catalog
  }
}
