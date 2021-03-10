import { Pipe, PipeTransform } from '@angular/core';
import { Reportes } from '../models/reportes';

@Pipe({
  name: 'searchreportes'
})
export class SearchreportesPipe implements PipeTransform {

  transform(arreglo: ReadonlyArray<Reportes>, texto: any): any {
    
    if(texto) {
      return arreglo.filter(
        item => JSON.stringify(item).toLocaleLowerCase().includes(texto)
      );
    }
    else{
      return arreglo;
    }

  
}

}
