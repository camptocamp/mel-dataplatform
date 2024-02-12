import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'mel-datahub-button-primary',
  templateUrl: './button-primary.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonPrimaryComponent {
  @Input() label: string
  @Input() extraClass?: string
  @Input() imageClass?: string
  @Input() set icon(fileName: string) {
    if (fileName) {
      this.src = `assets/icons/${fileName}.svg`
      this.placeholder = fileName
    }
  }
  @Input() disabled = false
  src?: string
  placeholder?: string
}
