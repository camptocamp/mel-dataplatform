/* eslint-disable @nx/enforce-module-boundaries */
import { TranslateLoader } from '@ngx-translate/core'
import { Observable, map, of } from 'rxjs'
import en_MEL from '../../../../resources/translations/en_MEL.json'
import fr_MEL from '../../../../resources/translations/fr_MEL.json'
import en from 'node_modules/geonetwork-ui/translations/en.json'
import fr from 'node_modules/geonetwork-ui/translations/fr.json'
import { dropEmptyTranslations } from 'geonetwork-ui'

export class MelEmbeddedTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<Record<string, string>> {
    const langs = { en: { ...en, ...en_MEL }, fr: { ...fr, ...fr_MEL } }
    const translations = langs[lang.substring(0, 2)]
    return of(translations).pipe(map(dropEmptyTranslations))
  }
}
