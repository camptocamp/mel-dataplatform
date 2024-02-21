import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FuzzySearchComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-fuzzy-search',
  templateUrl: './fuzzy-search.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MelFuzzySearchComponent extends FuzzySearchComponent {}
