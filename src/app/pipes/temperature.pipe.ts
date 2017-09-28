import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temp'
})
export class TemperaturePipe implements PipeTransform {

  transform(val: number): number {
      return Math.round((val - 32) * 5/9)
  }
}
