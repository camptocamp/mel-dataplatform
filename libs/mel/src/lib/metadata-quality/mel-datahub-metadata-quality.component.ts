import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MetadataQualityComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-metadata-quality',
  templateUrl: './mel-datahub-metadata-quality.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MelDatahubMetadataQualityComponent extends MetadataQualityComponent {}
