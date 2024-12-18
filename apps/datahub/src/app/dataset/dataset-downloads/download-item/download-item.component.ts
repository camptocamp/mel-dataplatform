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

  // note that the download attribute calling this getter only takes effect on same-origin resources
  get downloadFileName() {
    let fileName = ''
    if (this.format === 'geojson') {
      fileName = 'data.geojson'
    } else if (this.format === 'json') {
      fileName = 'data.json'
    }
    return fileName
  }
}
