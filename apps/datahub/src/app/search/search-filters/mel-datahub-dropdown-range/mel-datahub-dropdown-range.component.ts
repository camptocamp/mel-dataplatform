import {
  CdkOverlayOrigin,
  ConnectedPosition,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay'
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core'
import { Choice, propagateToDocumentOnly } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-dropdown-range',
  templateUrl: './mel-datahub-dropdown-range.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MelDatahubDropdownRangeComponent {
  lowValue = ''
  highValue = ''
  @Input() choices: Choice[]
  @Input() title: string
  @Input() selected: unknown[] = []
  @Output() selectValues = new EventEmitter<unknown[]>()
  @ViewChild('overlayOrigin') overlayOrigin: CdkOverlayOrigin
  @ViewChild('overlayContainer', { read: ElementRef })
  overlayContainer: ElementRef
  overlayPositions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 8,
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: -8,
    },
  ]
  scrollStrategy = this.scrollStrategies.reposition()
  overlayOpen = false
  overlayWidth = 'auto'
  overlayMaxHeight = 'none'
  id = `dropdown-range-${Math.floor(Math.random() * 10000)}`

  get hasSelectedChoices() {
    return this.selected.length > 0
  }

  constructor(private scrollStrategies: ScrollStrategyOptions) {}

  openOverlay() {
    this.overlayWidth =
      this.overlayOrigin.elementRef.nativeElement.getBoundingClientRect()
        .width + 'px'
    this.overlayOpen = true
  }

  closeOverlay() {
    this.overlayOpen = false
  }

  clearSelection(event: Event) {
    this.selectValues.emit([])
    this.highValue = ''
    this.lowValue = ''
    this.selected = []
    propagateToDocumentOnly(event)
  }

  onValidate() {
    const lowValue = Number(this.lowValue) * 10
    const highValue = Number(this.highValue) * 10
    this.selected = this.choices
      .filter((choice) => {
        const choiceNb = Number(choice.value)
        if (lowValue && highValue) {
          return choiceNb >= lowValue && choiceNb <= highValue
        } else if (lowValue) {
          return choiceNb >= lowValue
        } else if (highValue) {
          return choiceNb <= highValue
        }
        return true
      })
      .map((choice) => choice.value)
    this.selectValues.emit(this.selected)
  }
}
