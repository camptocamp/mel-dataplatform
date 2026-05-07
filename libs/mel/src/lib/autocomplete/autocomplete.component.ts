import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { matClose, matSearch } from '@ng-icons/material-icons/baseline'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { AutocompleteComponent, PopupAlertComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-autocomplete',
  templateUrl: './autocomplete.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    NgIconComponent,
    TranslateDirective,
    TranslatePipe,
    PopupAlertComponent,
  ],
  providers: [
    provideIcons({
      matClose,
      matSearch,
    }),
  ],
})
export class MelAutocompleteComponent extends AutocompleteComponent {}
