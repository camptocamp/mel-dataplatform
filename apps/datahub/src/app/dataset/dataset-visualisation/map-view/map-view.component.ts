import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { MapViewComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-map-view',
  templateUrl: './map-view.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MelMapViewComponent extends MapViewComponent implements OnInit {
  override selectLinkToDisplay(link: unknown): void {
    this.selectedLinkIndex$.next(Number(link))
  }
}
