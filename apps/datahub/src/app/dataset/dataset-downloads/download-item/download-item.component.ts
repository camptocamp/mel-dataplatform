import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DownloadItemComponent } from 'geonetwork-ui'
import { formatColors } from '@mel-dataplatform/mel'

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
    let completeFileName = ''
    const fileName = this.link.name ?? 'data'
    if (this.format === 'geojson') {
      completeFileName = `${fileName}.geojson`
    } else if (this.format === 'json') {
      completeFileName = `${fileName}.json`
    }
    return completeFileName
  }

  getBadgeStyles(format: string): { [key: string]: string } {
    const lowerFormat = format?.toLowerCase() || ''
    const colors = formatColors[lowerFormat] || {
      background: '#CCCDD2',
      text: '#000',
    }

    return { 'background-color': colors.background, color: colors.text }
  }
}
