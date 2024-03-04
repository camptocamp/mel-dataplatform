import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RecordApiFormComponent } from 'geonetwork-ui'

@Component({
  selector: 'mel-datahub-api-form',
  templateUrl: './api-form.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiFormComponent extends RecordApiFormComponent {
  override setFormat(evt: unknown): void {
    this.format$.next(String(evt))
  }
}
