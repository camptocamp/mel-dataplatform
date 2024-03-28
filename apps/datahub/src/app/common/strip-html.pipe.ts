import { Pipe, PipeTransform } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

@Pipe({ name: 'stripHtml' })
export class StripHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): string {
    const doc = new DOMParser().parseFromString(value, 'text/html')
    return doc.body.textContent || ''
  }
}
