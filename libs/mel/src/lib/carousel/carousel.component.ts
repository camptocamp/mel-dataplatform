import { CommonModule } from '@angular/common'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core'
import { CarouselComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-carousel',
  templateUrl: './carousel.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class MelCarouselComponent
  extends CarouselComponent
  implements AfterViewInit
{
  override ngAfterViewInit(): void {
    super.ngAfterViewInit()
    this.emblaApi.reInit({ align: 'start' })
  }
}
