import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DownloadsListComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-downloads-list',
  templateUrl: './downloads-list.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MelDownloadsListComponent extends DownloadsListComponent {}
