import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MaxLinesComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-text-expand',
  templateUrl: './text-expand.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextExpandComponent extends MaxLinesComponent {}
