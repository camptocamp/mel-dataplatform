import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { iconoirBell } from '@ng-icons/iconoir'
import { matWarning } from '@ng-icons/material-icons/baseline'
import {
  matCloseOutline,
  matWarningAmberOutline,
} from '@ng-icons/material-icons/outline'
import { ApplicationBannerComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-application-banner',
  templateUrl: './application-banner.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgIconComponent],
  providers: [
    provideIcons({
      matWarning,
      matWarningAmberOutline,
      matCloseOutline,
      iconoirBell,
    }),
  ],
})
export class MelApplicationBannerComponent extends ApplicationBannerComponent {
  iconClass = ''
  @Input() override set type(value) {
    switch (value) {
      case 'primary':
        this.msgClass = 'mel-application-banner-primary'
        this.icon = 'matWarning'
        this.iconClass = 'text-white'
        break
      default:
      case 'secondary':
        this.msgClass = 'mel-application-banner-secondary'
        this.icon = 'matWarningAmberOutline'
        this.iconClass = 'text-primary'
        break
      case 'light':
        this.msgClass = 'mel-application-banner-light'
        this.icon = 'iconoirBell'
        this.iconClass = 'text-primary'
        break
    }
  }
}
