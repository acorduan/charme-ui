import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'aiqSafeHtml'
})
export class AiqSafeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(html: string | any): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
