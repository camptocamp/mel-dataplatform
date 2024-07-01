import { Injectable, Injector } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { FieldsService, SimpleSearchField } from 'geonetwork-ui'
import { TranslatedSearchField } from 'geonetwork-ui'

marker('search.filters.categoryKeyword')
marker('search.filters.qualityScore')
marker('search.filters.territories')
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
    revisionYear: new SimpleSearchField(
      'revisionYearForResource',
      this.injector,
      'desc'
    ),
    qualityScore: new SimpleSearchField('qualityScore', this.injector, 'desc'),
    territories: new TranslatedSearchField('th_mel.link', this.injector, 'asc'),
  }

  constructor(override injector: Injector) {
    super(injector)
  }
}
