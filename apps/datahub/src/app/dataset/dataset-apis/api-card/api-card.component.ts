import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatTooltipModule } from '@angular/material/tooltip'
import { TranslatePipe } from '@ngx-translate/core'
import { ApiCardComponent, CopyTextButtonComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-api-card',
  templateUrl: './api-card.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslatePipe,
    CopyTextButtonComponent,
    MatTooltipModule,
  ],
})
export class MelApiCardComponent extends ApiCardComponent {}
