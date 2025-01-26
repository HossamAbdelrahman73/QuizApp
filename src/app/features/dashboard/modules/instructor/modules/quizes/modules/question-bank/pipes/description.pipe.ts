import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'description',
})
export class DescriptionPipe implements PipeTransform {
  transform(value: string): string {
    if (value.length > 20) {
      return value.slice(0, 10) + '...';
    } else {
      return value;
    }
  }
}
