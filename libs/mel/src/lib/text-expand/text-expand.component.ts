import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'
import { MaxLinesComponent } from 'geonetwork-ui'
import { MelButtonComponent } from '../button/button.component'

@Component({
  selector: 'mel-datahub-text-expand',
  templateUrl: './text-expand.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslatePipe, MelButtonComponent],
})
export class TextExpandComponent extends MaxLinesComponent {}
