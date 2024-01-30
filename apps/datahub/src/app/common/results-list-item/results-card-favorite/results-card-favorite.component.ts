import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core'
import { ResultsListItemComponent } from '../results-list-item.component'

@Component({
  selector: 'mel-datahub-results-card-favorite',
  templateUrl: './results-card-favorite.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsCardFavoriteComponent extends ResultsListItemComponent {
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
