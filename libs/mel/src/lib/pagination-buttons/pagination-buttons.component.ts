import { ChangeDetectionStrategy, Component } from '@angular/core'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import {
  matChevronLeft,
  matChevronRight,
} from '@ng-icons/material-icons/baseline'
import { TranslateDirective } from '@ngx-translate/core'
import { ButtonComponent, PaginationButtonsComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-pagination-buttons',
  templateUrl: './pagination-buttons.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIconComponent, TranslateDirective, ButtonComponent],
  providers: [
    provideIcons({
      matChevronLeft,
      matChevronRight,
    }),
  ],
})
export class MelPaginationButtonsComponent extends PaginationButtonsComponent {}
