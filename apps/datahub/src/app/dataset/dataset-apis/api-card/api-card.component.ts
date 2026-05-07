import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MatTooltipModule } from '@angular/material/tooltip'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { matMoreHoriz } from '@ng-icons/material-icons/baseline'
import { TranslatePipe } from '@ngx-translate/core'
import { ApiCardComponent, CopyTextButtonComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-api-card',
  templateUrl: './api-card.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NgIconComponent,
    TranslatePipe,
    CopyTextButtonComponent,
    MatTooltipModule,
  ],
  providers: [
    provideIcons({
      matMoreHoriz,
    }),
  ],
})
export class MelApiCardComponent extends ApiCardComponent {}
