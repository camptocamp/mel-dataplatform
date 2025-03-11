import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { DownloadItemComponent } from 'geonetwork-ui'
import { formatColors } from '@mel-dataplatform/mel'

@Component({
  selector: 'mel-datahub-link-item',
  templateUrl: './link-item.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MelLinkItemComponent extends DownloadItemComponent {
  @Input() section: string
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

  get icon() {
    if (this.section === 'downloads') {
      return 'assets/icons/download.svg'
    } else {
      return 'assets/icons/link.svg'
    }
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
