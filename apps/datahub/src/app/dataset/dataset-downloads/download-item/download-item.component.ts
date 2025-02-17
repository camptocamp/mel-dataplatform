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
    const badgeColors: { [key: string]: string } = {
      csv: '#F6A924',
      excel: '#FFDE10',
      gpkg: '#7D5D9F',
      shp: '#009036',
      gml: '#E75113',
      geojson: '#293C6F',
      json: '#84D0F0',
      zip: '#B0CB52',
      dxf: '#DCCD00',
      kml: '#F4B5D0',
      pdf: '#49579E',
      jpg: '#009EE0',
      svg: '#EB6D82',
      html: '#C0C9B6',
      fgb: '#C4A98F',
      jsonfg: '#A8111C',
    }

    const lowerFormat = format?.toLowerCase() || ''
    const backgroundColor = badgeColors[lowerFormat] || '#CCCDD2'
    const textColor = [
      'gpkg',
      'shp',
      'gml',
      'geojson',
      'pdf',
      'jpg',
      'svg',
      'jsonfg',
    ].includes(lowerFormat)
      ? '#FFF'
      : '#000'

    return { 'background-color': backgroundColor, color: textColor }
  }
}
