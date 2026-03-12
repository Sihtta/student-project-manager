import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urgentProject'
})
export class UrgentProjectPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
