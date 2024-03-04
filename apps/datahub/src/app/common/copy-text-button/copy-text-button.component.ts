import { ChangeDetectionStrategy, Component } from '@angular/core'
import { CopyTextButtonComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-copy-text-button',
  templateUrl: './copy-text-button.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MelCopyTextButtonComponent extends CopyTextButtonComponent {}
