import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TranslateDirective } from '@ngx-translate/core'
import { FavoriteHeartComponent } from '../../favorites/favorite-heart/favorite-heart.component'
import { MelDatahubMetadataQualityComponent } from '../../metadata-quality/mel-datahub-metadata-quality.component'
import { ResultsListItemComponent } from '../results-list-item.component'

@Component({
  selector: 'mel-datahub-results-card-favorite',
  templateUrl: './results-card-favorite.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslateDirective,
    FavoriteHeartComponent,
    MelDatahubMetadataQualityComponent,
  ],
})
export class ResultsCardFavoriteComponent extends ResultsListItemComponent {}
