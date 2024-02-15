import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'mel-datahub-button-primary',
  templateUrl: './button-primary.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() label: string
  @Input() set icon(fileName: string) {
    if (fileName) {
      this.src = `assets/icons/${fileName}.svg`
      this.placeholder = fileName
    }
  }
  src?: string
  placeholder?: string
  @Input() set buttonClass(value: string) {
    if (value) this.btnClass = value
  }
  btnClass = 'mel-primary-button'
  @Input() imageClass?: string
  @Input() disabled = false
}
