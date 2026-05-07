import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'
import { propagateToDocumentOnly } from 'geonetwork-ui'
import { MelButtonComponent } from '../../button/button.component'

@Component({
  selector: 'mel-datahub-heart-toggle',
  templateUrl: './heart-toggle.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, MelButtonComponent],
})
export class HeartToggleComponent {
  @Input() toggled!: boolean
  @Input() disabled = false
  @Input() buttonClass?: string
  @Input() imageClass?: string
  @Input() label?: string
  @Input() iconSuffix? = ''
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
