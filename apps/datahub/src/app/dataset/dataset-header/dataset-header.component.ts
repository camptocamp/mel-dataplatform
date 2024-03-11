import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { RouterFacade } from 'geonetwork-ui'
import { CatalogRecord } from 'geonetwork-ui/libs/common/domain/src/lib/model/record'

@Component({
  selector: 'mel-datahub-dataset-header',
  templateUrl: './dataset-header.component.html',
  styles: `
    :host ::ng-deep .markdown-body {
      line-height: 1.2 !important;
    } 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatasetHeaderComponent {
  @Input() record: Partial<CatalogRecord>

  @Input() incomplete: boolean

  constructor(protected routerFacade: RouterFacade) {}

  fieldReady(propName: string) {
    return !this.incomplete || propName in this.record
  }

  getScrollElement(id: string) {
    return !!document.getElementById(id)
  }

  scrollTo(id: string) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
  }
}
