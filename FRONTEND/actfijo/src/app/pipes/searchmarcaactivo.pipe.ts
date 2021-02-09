import { Pipe, PipeTransform } from '@angular/core';
import { Marcasactivo } from '../models/marcasactivo';

@Pipe({
  name: 'searchmarcaactivo'
})
export class SearchmarcaactivoPipe implements PipeTransform {

  transform(arreglo: ReadonlyArray<Marcasactivo>, texto: any): any {
    
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
