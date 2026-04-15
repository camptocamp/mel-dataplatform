import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { TranslateDirective } from '@ngx-translate/core'
import { DownloadsListComponent } from 'geonetwork-ui'
import { MelLinkItemComponent } from '../link-item/link-item.component'

@Component({
  selector: 'mel-datahub-links-list',
  templateUrl: './links-list.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateDirective, MelLinkItemComponent],
})
export class MelLinksListComponent extends DownloadsListComponent {
  @Input() section: string
}
