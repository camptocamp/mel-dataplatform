import { TranslateLoader } from '@ngx-translate/core'
import { Observable, map, of } from 'rxjs'
import en_MEL from '../../assets/i18n/en_MEL.json'
import fr_MEL from '../../assets/i18n/fr_MEL.json'
import en from 'node_modules/geonetwork-ui/translations/en.json'
import fr from 'node_modules/geonetwork-ui/translations/fr.json'

//TODO: export and use function from gn-ui
function dropEmptyTranslations(translations: any) {
  // filter out empty keys: this should let us fallback on the default lang or
  // untranslated key, instead of having a blank space
  return Object.keys(translations).reduce(
    (prev, curr) =>
      translations[curr].trim().length
        ? { ...prev, [curr]: translations[curr] }
        : prev,
    {}
  )
}

export class MelEmbeddedTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    const langs = { en: { ...en, ...en_MEL }, fr: { ...fr, ...fr_MEL } }
    const translations = langs[lang.substring(0, 2)]
    return of(translations).pipe(map(dropEmptyTranslations))
  }
}
