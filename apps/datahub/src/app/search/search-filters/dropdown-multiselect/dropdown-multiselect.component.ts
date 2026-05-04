import { OverlayModule } from '@angular/cdk/overlay'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import {
  matClose,
  matExpandLess,
  matExpandMore,
} from '@ng-icons/material-icons/baseline'
import { TranslatePipe } from '@ngx-translate/core'
import { DropdownMultiselectComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-dropdown-multiselect',
  templateUrl: './dropdown-multiselect.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, OverlayModule, NgIconComponent, TranslatePipe],
  providers: [
    provideIcons({
      matClose,
      matExpandLess,
      matExpandMore,
    }),
  ],
})
export class MelDropdownMultiselectComponent extends DropdownMultiselectComponent {}
