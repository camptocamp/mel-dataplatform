import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { ApplicationBannerComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-application-banner',
  templateUrl: './application-banner.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
