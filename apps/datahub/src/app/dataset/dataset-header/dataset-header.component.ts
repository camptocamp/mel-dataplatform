import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core'
import { Router } from '@angular/router'
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
} from 'geonetwork-ui'
import { DatasetInformationComponent } from '../dataset-information/dataset-information.component'
import { Location } from '@angular/common'

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
  private router = inject(Router)
  private location = inject(Location)

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

  back(): void {
    if (this.router.lastSuccessfulNavigation?.previousNavigation) {
      this.location.back()
    } else {
      this.router.navigateByUrl('/search')
    }
  }
}
