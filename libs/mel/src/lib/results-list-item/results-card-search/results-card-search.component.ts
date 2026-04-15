import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TranslatePipe } from '@ngx-translate/core'
import { FavoriteHeartComponent } from '../../favorites/favorite-heart/favorite-heart.component'
import { MelDatahubMetadataQualityComponent } from '../../metadata-quality/mel-datahub-metadata-quality.component'
import { StripHtmlPipe } from '../../strip-html.pipe'
import { ResultsListItemComponent } from '../results-list-item.component'

@Component({
  selector: 'mel-datahub-results-card-search',
  templateUrl: './results-card-search.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslatePipe,
    StripHtmlPipe,
    MelDatahubMetadataQualityComponent,
    FavoriteHeartComponent,
  ],
})
export class ResultsCardSearchComponent extends ResultsListItemComponent {}
