import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DownloadItemComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-download-item',
  templateUrl: './download-item.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MelDownloadItemComponent extends DownloadItemComponent {
  handleClickCopy(event: MouseEvent) {
    navigator.clipboard.writeText(this.link.url.href)
    ;(event.target as HTMLElement).blur()
  }
}
