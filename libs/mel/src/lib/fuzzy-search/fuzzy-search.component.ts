import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'
import { FuzzySearchComponent } from 'geonetwork-ui'
import { MelAutocompleteComponent } from '../autocomplete/autocomplete.component'

@Component({
  selector: 'mel-datahub-fuzzy-search',
  templateUrl: './fuzzy-search.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslatePipe, MelAutocompleteComponent],
})
export class MelFuzzySearchComponent extends FuzzySearchComponent {}
