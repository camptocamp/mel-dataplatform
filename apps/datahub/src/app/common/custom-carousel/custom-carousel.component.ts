import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
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
  implements OnInit
{
  @Input() numberOfDisplayedCards: number

  outerWidth: string
  innerWidth: string

  ngOnInit(): void {
    this.outerWidth = `${this.numberOfDisplayedCards * 383}px`
    this.innerWidth = `${this.numberOfDisplayedCards * 342}px`
  }
}