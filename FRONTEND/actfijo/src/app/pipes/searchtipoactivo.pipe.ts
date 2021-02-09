import { Pipe, PipeTransform } from '@angular/core';
import { Tipoactivo } from '../models/tipoactivo';

@Pipe({
  name: 'searchtipoactivo'
})
export class SearchtipoactivoPipe implements PipeTransform {

  transform(arreglo: ReadonlyArray<Tipoactivo>, texto: any): any {
    
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
