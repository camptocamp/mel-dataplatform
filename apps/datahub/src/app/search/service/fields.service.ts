import { Injectable, Injector } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { FieldsService } from 'geonetwork-ui'
import { TranslatedSearchField } from 'geonetwork-ui'

marker('search.filters.categoryKeyword')
@Injectable({
  providedIn: 'root',
})
export class MelFieldsService extends FieldsService {
  override fields = {
    ...this.fields,
    categoryKeyword: new TranslatedSearchField(
      'th_thesaurus_mot_cle_thematique_categories.link',
      this.injector,
      'asc'
    ),
  }

  constructor(override injector: Injector) {
    super(injector)
  }
}
