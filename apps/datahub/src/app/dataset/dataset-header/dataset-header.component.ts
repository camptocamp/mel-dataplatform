import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core'
import {
  FavoriteHeartComponent,
  MelButtonComponent,
  TextExpandComponent,
} from '@mel-dataplatform/mel'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import {
  CatalogRecord,
  ContentGhostComponent,
  MarkdownParserComponent,
  RouterFacade,
  SearchService,
} from 'geonetwork-ui'
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
  protected routerFacade = inject(RouterFacade)
  private searchService = inject(SearchService)

  @Input() record: Partial<CatalogRecord>

  @Input() incomplete: boolean

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
