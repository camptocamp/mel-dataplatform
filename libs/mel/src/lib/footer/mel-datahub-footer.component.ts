import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'

@Component({
  selector: 'mel-datahub-footer',
  templateUrl: './mel-datahub-footer.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateDirective, TranslatePipe],
})
export class MelDatahubFooterComponent {
  iconsUrl = 'assets/icons/'
}
