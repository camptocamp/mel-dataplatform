import { ChangeDetectionStrategy, Component } from '@angular/core'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { matOpenInNew } from '@ng-icons/material-icons/baseline'
import { TranslatePipe } from '@ngx-translate/core'
import { ButtonComponent, ExternalViewerButtonComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-external-viewer-button',
  templateUrl: './external-viewer-button.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIconComponent, TranslatePipe, ButtonComponent],
  providers: [
    provideIcons({
      matOpenInNew,
    }),
  ],
})
export class MelExternalViewerButtonComponent extends ExternalViewerButtonComponent {}
