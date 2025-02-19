import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SearchFacade } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-home-page',
  templateUrl: './home-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  constructor(protected searchFacade: SearchFacade) {}
}
