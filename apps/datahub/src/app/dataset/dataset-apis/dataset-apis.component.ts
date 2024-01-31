import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core'
import { MdViewFacade } from 'geonetwork-ui'
import { DatasetServiceDistribution } from 'geonetwork-ui/libs/common/domain/src/lib/model/record'
import { Observable } from 'rxjs'

@Component({
  selector: 'mel-datahub-dataset-apis',
  templateUrl: './dataset-apis.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatasetApisComponent implements OnInit {
  maxHeight = '0px'
  opacity = 0
  selectedApiLink: DatasetServiceDistribution
  apiLinks$ = this.facade.apiLinks$ as Observable<DatasetServiceDistribution[]>
  constructor(public facade: MdViewFacade) {}

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
    this.maxHeight = link === undefined ? '0px' : '500px'
    this.opacity = link === undefined ? 0 : 1
  }
}
