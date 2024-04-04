import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core'
import { FavoriteStarComponent } from 'geonetwork-ui'
import { HeartToggleComponent } from '../heart-toggle/heart-toggle.component'

@Component({
  selector: 'mel-datahub-favorite-heart',
  templateUrl: './favorite-heart.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteHeartComponent extends FavoriteStarComponent {
  @ViewChild(HeartToggleComponent, { read: ElementRef })
  override starToggleRef: ElementRef

  @Input() buttonClass?: string
  @Input() imageClass?: string
  @Input() label?: string
  @Input() iconSuffix? = ''
}
