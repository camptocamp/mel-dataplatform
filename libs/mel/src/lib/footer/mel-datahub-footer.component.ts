import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'mel-datahub-footer',
  templateUrl: './mel-datahub-footer.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MelDatahubFooterComponent {
  iconsUrl = 'assets/icons/'
}
