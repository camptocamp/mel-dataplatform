import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ApiCardComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-api-card',
  templateUrl: './api-card.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MelApiCardComponent extends ApiCardComponent {}
