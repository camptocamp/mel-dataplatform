import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { DownloadsListComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-links-list',
  templateUrl: './links-list.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MelLinksListComponent extends DownloadsListComponent {
  @Input() section: string
}
