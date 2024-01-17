import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CatalogRecord } from 'geonetwork-ui/libs/common/domain/src/lib/record'

@Component({
  selector: 'mel-datahub-results-list-item',
  templateUrl: './results-list-item.component.html',
  styleUrl: './results-list-item.component.css',
})
export class ResultsListItemComponent {
  @Input() record: CatalogRecord
  @Output() mdSelect = new EventEmitter<CatalogRecord>()
}
