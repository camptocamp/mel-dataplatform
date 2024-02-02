import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'mel-datahub-button-primary',
  templateUrl: './button-primary.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonPrimaryComponent {
  @Input() label: string
  @Input() set icon(fileName: string) {
    this.src = `/assets/${fileName}.svg`
    this.placeholder = fileName
  }
  src: string
  placeholder: string
}
