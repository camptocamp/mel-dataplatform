import { CommonModule } from '@angular/common'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { matClose } from '@ng-icons/material-icons/baseline'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import {
  DropdownSelectorComponent,
  FeatureDetailComponent,
  LoadingMaskComponent,
  MapContainerComponent,
  MapViewComponent,
  PopupAlertComponent,
} from 'geonetwork-ui'
import { MelExternalViewerButtonComponent } from 'libs/mel/src/lib/external-viewer-button/external-viewer-button.component'

@Component({
  selector: 'mel-datahub-map-view',
  templateUrl: './map-view.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NgIconComponent,
    TranslateDirective,
    TranslatePipe,
    DropdownSelectorComponent,
    MapContainerComponent,
    FeatureDetailComponent,
    LoadingMaskComponent,
    PopupAlertComponent,
    MelExternalViewerButtonComponent,
  ],
  providers: [
    provideIcons({
      matClose,
    }),
  ],
})
export class MelMapViewComponent
  extends MapViewComponent
  implements AfterViewInit
{
  override selectLinkToDisplay(link: unknown): void {
    super.selectLinkToDisplay(String(link))
  }
}
