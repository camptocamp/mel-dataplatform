import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { matOpenInNew } from '@ng-icons/material-icons/baseline'
import { TranslateDirective } from '@ngx-translate/core'
import {
  CopyTextButtonComponent,
  DropdownSelectorComponent,
  RecordApiFormComponent,
  TextInputComponent,
} from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-api-form',
  templateUrl: './api-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NgIconComponent,
    TranslateDirective,
    TextInputComponent,
    DropdownSelectorComponent,
    CopyTextButtonComponent,
  ],
  providers: [
    provideIcons({
      matOpenInNew,
    }),
  ],
})
export class ApiFormComponent extends RecordApiFormComponent {
  get swaggerUrl() {
    return `${window.location.origin}/data/swagger-ui/index.html`
  }
}
