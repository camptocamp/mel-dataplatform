import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { MelCarouselComponent } from '@mel-dataplatform/mel'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { matCloseOutline } from '@ng-icons/material-icons/outline'
import { TranslateDirective } from '@ngx-translate/core'
import { DatasetServiceDistribution, MdViewFacade } from 'geonetwork-ui'
import { Observable } from 'rxjs'
import { MelApiCardComponent } from './api-card/api-card.component'
import { ApiFormComponent } from './api-form/api-form.component'

@Component({
  selector: 'mel-datahub-dataset-apis',
  templateUrl: './dataset-apis.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NgIconComponent,
    TranslateDirective,
    MelCarouselComponent,
    MelApiCardComponent,
    ApiFormComponent,
  ],
  providers: [
    provideIcons({
      matCloseOutline,
    }),
  ],
})
export class DatasetApisComponent implements OnInit {
  public facade = inject(MdViewFacade)

  maxHeight = '0px'
  opacity = 0
  selectedApiLink: DatasetServiceDistribution
  apiLinks$ = this.facade.apiLinks$ as Observable<DatasetServiceDistribution[]>

  ngOnInit(): void {
    this.setStyle(undefined)
    this.selectedApiLink = undefined
  }

  openRecordApiForm(link: DatasetServiceDistribution) {
    this.selectedApiLink = link
    this.setStyle(link)
  }

  closeRecordApiForm() {
    this.selectedApiLink = undefined
    this.setStyle(undefined)
  }

  setStyle(link: DatasetServiceDistribution) {
    this.maxHeight = link === undefined ? '0px' : '750px'
    this.opacity = link === undefined ? 0 : 1
  }
}
