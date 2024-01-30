import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core'
import { ResultsListItemComponent } from '../results-list-item.component'

@Component({
  selector: 'mel-datahub-results-card-last-created',
  templateUrl: './results-card-last-created.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsCardLastCreatedComponent extends ResultsListItemComponent {
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
