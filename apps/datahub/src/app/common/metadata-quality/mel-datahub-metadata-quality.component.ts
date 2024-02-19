import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core'
import { MetadataQualityComponent } from 'geonetwork-ui'
import tippy from 'tippy.js'

@Component({
  selector: 'mel-datahub-mel-datahub-metadata-quality',
  templateUrl: './mel-datahub-metadata-quality.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MelDatahubMetadataQualityComponent
  extends MetadataQualityComponent
  implements AfterViewInit
{
  @ViewChild('metadataQualityIndicator') metadataQualityIndicator: ElementRef
  @ViewChild('metadataQualityDetails') metadataQualityDetails: ElementRef

  ngAfterViewInit(): void {
    tippy(this.metadataQualityIndicator.nativeElement, {
      content: this.metadataQualityDetails.nativeElement.innerHTML,
      appendTo: () => document.body,
      allowHTML: true,
      placement: 'bottom',
      theme: 'data-platform',
    })
  }
}
