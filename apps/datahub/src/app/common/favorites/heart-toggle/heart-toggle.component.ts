import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { propagateToDocumentOnly } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-heart-toggle',
  templateUrl: './heart-toggle.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeartToggleComponent {
  @Input() toggled!: boolean
  @Input() disabled = false
  @Input() extraClass?: string
  @Input() imageClass?: string
  @Output() newValue = new EventEmitter<boolean>()

  toggle(event: Event) {
    if (!this.disabled) {
      this.toggled = !this.toggled
      this.newValue.emit(this.toggled)
    }
    propagateToDocumentOnly(event)
    event.preventDefault()
  }
}
