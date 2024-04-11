import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
} from '@angular/core'
import { CarouselComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-custom-carousel',
  templateUrl: './custom-carousel.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomCarouselComponent
  extends CarouselComponent
  implements AfterViewInit
{
  override ngAfterViewInit(): void {
    super.ngAfterViewInit()
    this.emblaApi.reInit({ align: 'start' })
  }
}
