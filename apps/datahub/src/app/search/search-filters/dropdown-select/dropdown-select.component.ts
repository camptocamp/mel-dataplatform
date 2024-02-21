import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { Choice, DropdownMultiselectComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-dropdown-select',
  templateUrl: './dropdown-select.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownSelectComponent extends DropdownMultiselectComponent {
  //FIXME: overrides and casting via method due to typing issues with gn-ui
  @Input() override selected: any
  @Output() override selectValues = new EventEmitter<any>()

  selectFromEvent(choice: Choice, event: Event) {
    this.select(choice, (event.target as HTMLInputElement).checked)
  }
}
