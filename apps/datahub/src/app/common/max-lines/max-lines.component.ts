import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core'

@Component({
  selector: 'mel-datahub-max-lines',
  templateUrl: './max-lines.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaxLinesComponent implements AfterViewInit, OnDestroy {
  @Input() maxLines = 3

  isExpanded = false
  maxHeight = ''
  showToggleButton = false
  observer: ResizeObserver

  @ViewChild('container') container!: ElementRef

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.calculateMaxHeight()

    this.observer = new ResizeObserver((mutations) => {
      mutations.forEach(() => {
        this.calculateMaxHeight()
      })
    })

    this.observer.observe(this.container.nativeElement.children[0])
  }

  toggleDisplay() {
    this.isExpanded = !this.isExpanded
    this.calculateMaxHeight()
  }

  calculateMaxHeight() {
    const containerElement = this.container.nativeElement
    const contentElement = containerElement.children[0]
    const contentHeight = contentElement.getBoundingClientRect().height

    if (contentHeight) {
      if (contentHeight > this.maxLines * this.getLineHeight(contentElement)) {
        this.showToggleButton = true

        this.maxHeight = this.isExpanded
          ? `${contentHeight}px`
          : `${this.maxLines * this.getLineHeight(contentElement)}px`
      } else {
        this.showToggleButton = false
        this.maxHeight = `${contentHeight}px`
      }
      containerElement.setAttribute(
        'style',
        `max-height: ${this.maxHeight}; overflow: hidden`
      )

      this.cdr.detectChanges()
    }
  }

  getLineHeight(element: HTMLElement): number {
    const computedStyle = window.getComputedStyle(element)
    const lineHeight = parseFloat(computedStyle.lineHeight)
    const fontSize = parseFloat(computedStyle.fontSize || '14')
    const result = isNaN(lineHeight) ? fontSize * 1.2 : lineHeight // Use a default if line height is not specified
    return result
  }

  ngOnDestroy(): void {
    this.observer.unobserve(this.container.nativeElement.children[0])
  }
}
