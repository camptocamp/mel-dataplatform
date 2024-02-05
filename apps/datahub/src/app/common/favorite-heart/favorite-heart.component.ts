import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { FavoritesService } from 'geonetwork-ui'
import {
  DatasetRecord,
  ServiceRecord,
} from 'geonetwork-ui/libs/common/domain/src/lib/model/record'
import { map, tap } from 'rxjs'

@Component({
  selector: 'mel-datahub-favorite-heart',
  templateUrl: './favorite-heart.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteHeartComponent {
  @Input() record: Partial<DatasetRecord | ServiceRecord>
  loading = false
  toggled = false
  isFavorite$ = this.favoritesService.myFavoritesUuid$.pipe(
    map((favorites) => favorites.indexOf(this.record.uniqueIdentifier) > -1),
    tap((toggled) => (this.toggled = toggled))
  )
  constructor(private favoritesService: FavoritesService) {}

  toggleFavorite() {
    this.toggled = !this.toggled
    this.loading = true
    ;(this.toggled
      ? this.favoritesService.addToFavorites([this.record.uniqueIdentifier])
      : this.favoritesService.removeFromFavorites([
          this.record.uniqueIdentifier,
        ])
    ).subscribe({
      complete: () => {
        this.loading = false
      },
      error: () => {
        this.loading = false
      },
    })
  }
}
