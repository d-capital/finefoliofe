import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbreviateNumber',
  standalone: true // so you can directly import in components
})
export class AbbreviateNumberPipe implements PipeTransform {
  transform(value: number | string, locale: string = 'en-US'): string {
    if (value == null) return '';
    const num = Number(value);
    if (isNaN(num)) return String(value);

    return new Intl.NumberFormat(locale, {
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 1
    }).format(num);
  }
}
