import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CatalogRecord } from 'geonetwork-ui/libs/common/domain/src/lib/model/record'

@Component({
  selector: 'mel-datahub-results-list-item',
  template: '',
})
export class ResultsListItemComponent {
  @Input() record: CatalogRecord
  @Output() mdSelect = new EventEmitter<CatalogRecord>()
  @Output() keyword = new EventEmitter<string>()

  get shownOrganization() {
    return this.record?.ownerOrganization
  }

  get creationDate() {
    return this.record?.recordCreated?.toLocaleDateString('fr')
  }

  onKeywordClick(keyword: string, event: Event) {
    event.stopPropagation()
    this.keyword.emit(keyword)
  }
}
