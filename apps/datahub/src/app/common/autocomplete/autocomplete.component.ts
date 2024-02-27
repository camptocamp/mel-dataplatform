import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AutocompleteComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-autocomplete',
  templateUrl: './autocomplete.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MelAutocompleteComponent extends AutocompleteComponent {}
