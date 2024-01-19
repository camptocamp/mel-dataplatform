import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CatalogRecord } from 'geonetwork-ui/libs/common/domain/src/lib/model/record'

@Component({
  selector: 'mel-datahub-results-list-item',
  template: '',
})
export class ResultsListItemComponent {
  @Input() record: CatalogRecord
  @Output() mdSelect = new EventEmitter<CatalogRecord>()
}
