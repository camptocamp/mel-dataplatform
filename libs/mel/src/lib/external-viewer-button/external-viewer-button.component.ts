import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ExternalViewerButtonComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-external-viewer-button',
  templateUrl: './external-viewer-button.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MelExternalViewerButtonComponent extends ExternalViewerButtonComponent {}
