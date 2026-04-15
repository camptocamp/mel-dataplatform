import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TranslateDirective } from '@ngx-translate/core'
import {
  MetadataQualityComponent,
  MetadataQualityItemComponent,
  PopoverComponent,
} from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-metadata-quality',
  templateUrl: './mel-datahub-metadata-quality.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateDirective, PopoverComponent, MetadataQualityItemComponent],
})
export class MelDatahubMetadataQualityComponent extends MetadataQualityComponent {}
