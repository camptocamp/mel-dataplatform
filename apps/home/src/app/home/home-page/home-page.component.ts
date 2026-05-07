import { ChangeDetectionStrategy, Component } from '@angular/core'
import { HomeHeaderComponent } from '../home-header/home-header.component'

@Component({
  selector: 'mel-datahub-home-page',
  templateUrl: './home-page.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HomeHeaderComponent],
})
export class HomePageComponent {}
