import { CdkOverlayOrigin } from '@angular/cdk/overlay'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgIconComponent } from '@ng-icons/core'
import { TranslatePipe } from '@ngx-translate/core'
import { DropdownMultiselectComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-dropdown-multiselect',
  templateUrl: './dropdown-multiselect.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, CdkOverlayOrigin, NgIconComponent, TranslatePipe],
})
export class MelDropdownMultiselectComponent extends DropdownMultiselectComponent {}
