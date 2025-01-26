import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, maxLength: number = 50): string {
    return value.length > maxLength ? value.slice(0, maxLength) + '...' : value;
  }
}
