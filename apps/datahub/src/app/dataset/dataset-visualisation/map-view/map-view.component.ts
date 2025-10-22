import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core'
import { MapViewComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-map-view',
  templateUrl: './map-view.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MelMapViewComponent
  extends MapViewComponent
  implements AfterViewInit
{
  override selectLinkToDisplay(link: unknown): void {
    super.selectLinkToDisplay(String(link))
  }
}
