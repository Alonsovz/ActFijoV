import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reportes'
})
export class ReportesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
