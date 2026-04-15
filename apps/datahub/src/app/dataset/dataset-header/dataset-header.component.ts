import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import {
  CatalogRecord,
  ContentGhostComponent,
  MarkdownParserComponent,
  RouterFacade,
  SearchService,
} from 'geonetwork-ui'
import { MelButtonComponent } from 'libs/mel/src/lib/button/button.component'
import { FavoriteHeartComponent } from 'libs/mel/src/lib/favorites/favorite-heart/favorite-heart.component'
import { TextExpandComponent } from 'libs/mel/src/lib/text-expand/text-expand.component'
import { DatasetInformationComponent } from '../dataset-information/dataset-information.component'

@Component({
  selector: 'mel-datahub-dataset-header',
  templateUrl: './dataset-header.component.html',
  styles: `
    :host ::ng-deep .markdown-body {
      line-height: 1.2 !important;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ContentGhostComponent,
    TranslateDirective,
    TranslatePipe,
    MarkdownParserComponent,
    MelButtonComponent,
    FavoriteHeartComponent,
    TextExpandComponent,
    DatasetInformationComponent,
  ],
})
export class DatasetHeaderComponent {
  @Input() record: Partial<CatalogRecord>

  @Input() incomplete: boolean

  constructor(
    protected routerFacade: RouterFacade,
    private searchService: SearchService
  ) {}

  fieldReady(propName: string) {
    return !this.incomplete || propName in this.record
  }

  getScrollElement(id: string) {
    return !!document.getElementById(id)
  }

  scrollTo(id: string) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
  }

  back() {
    this.searchService.updateFilters({})
  }
}
