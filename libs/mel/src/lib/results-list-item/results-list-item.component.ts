import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CatalogRecord, Keyword } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-results-list-item',
  template: '',
})
export class ResultsListItemComponent {
  @Input() record: CatalogRecord
  @Output() mdSelect = new EventEmitter<CatalogRecord>()
  @Output() keyword = new EventEmitter<Keyword>()

  get shownOrganization() {
    return this.record?.ownerOrganization
  }

  get creationDate() {
    return this.record?.recordCreated?.toLocaleDateString('fr')
  }

  get keywords() {
    return this.record?.keywords?.filter(
      (keyword) =>
        keyword.type !== 'place' && keyword.thesaurus?.name !== 'Catégories'
    )
  }

  onKeywordClick(keyword: Keyword, event: Event) {
    event.stopPropagation()
    this.keyword.emit(keyword)
  }
}
