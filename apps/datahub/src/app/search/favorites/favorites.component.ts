import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import {
  FIELDS_BRIEF,
  RouterFacade,
  SearchFacade,
  SearchState,
} from 'geonetwork-ui'
import { CatalogRecord } from 'geonetwork-ui/libs/common/domain/src/lib/record'

@Component({
  selector: 'mel-datahub-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit {
  constructor(
    protected searchFacade: SearchFacade,
    private routerFacade: RouterFacade,
    private store: Store<SearchState>
  ) {}

  ngOnInit() {
    this.searchFacade.setFavoritesOnly(true)
    this.searchFacade
      .setConfigRequestFields([...FIELDS_BRIEF, 'createDate', 'changeDate'])
      .setPageSize(10)
      .setSortBy(['desc', 'createDate'])
  }

  onMetadataSelection(metadata: CatalogRecord): void {
    this.routerFacade.goToMetadata(metadata)
  }
}
