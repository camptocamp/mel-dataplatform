import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core'
import { ResultsListItemComponent } from '../results-list-item.component'

@Component({
  selector: 'mel-datahub-results-card-last-created',
  templateUrl: './results-card-last-created.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsCardLastCreatedComponent
  extends ResultsListItemComponent
  implements OnInit
{
  @Output() keyword = new EventEmitter<string>()
  ngOnInit(): void {
    console.log(this.record)
    console.log('creationDate', this.creationDate)
  }

  get shownOrganization() {
    return this.record?.ownerOrganization
  }

  get creationDate() {
    return this.record?.recordCreated?.toLocaleDateString('fr')
  }

  onKeywordClick(keyword: string) {
    this.keyword.emit(keyword)
  }
}
