import { CommonModule } from '@angular/common'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core'
import { MelExternalViewerButtonComponent } from '@mel-dataplatform/mel'
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
