import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AutocompleteComponent } from 'geonetwork-ui'
import { take } from 'rxjs'

@Component({
  selector: 'mel-datahub-autocomplete',
  templateUrl: './autocomplete.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MelAutocompleteComponent extends AutocompleteComponent {
  override clear(): void {
    this.inputRef.nativeElement.value = ''
    // this.inputCleared.emit()
    this.selectionSubject
      .pipe(take(1))
      .subscribe((selection) => selection && selection.option.deselect())
    this.inputRef.nativeElement.focus()
    this.triggerRef.closePanel()
  }
  handleEnterFromEvent(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value
    this.handleEnter(inputValue)
  }
}
