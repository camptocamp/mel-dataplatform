import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ContentGhostComponent } from 'geonetwork-ui'
import { MelCarouselComponent } from '../../carousel/carousel.component'
import { ResultsCardFavoriteComponent } from '../../results-list-item/results-card-favorite/results-card-favorite.component'
import { ResultsCardLastCreatedComponent } from '../../results-list-item/results-card-last-created/results-card-last-created.component'
import { ResultsListComponent } from '../results-list.component'

@Component({
  selector: 'mel-datahub-results-list-carousel',
  templateUrl: './results-list-carousel.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ContentGhostComponent,
    MelCarouselComponent,
    ResultsCardFavoriteComponent,
    ResultsCardLastCreatedComponent,
  ],
})
export class ResultsListCarouselComponent extends ResultsListComponent {}
