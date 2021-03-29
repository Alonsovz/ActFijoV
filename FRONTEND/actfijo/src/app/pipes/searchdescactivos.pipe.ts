import { Pipe, PipeTransform } from '@angular/core';
import { DescripcionActivo } from '../models/descripcion-activo';

@Pipe({
  name: 'searchdescactivos'
})
export class SearchdescactivosPipe implements PipeTransform {

  transform(arreglo: ReadonlyArray<DescripcionActivo>, texto: any): any {
    
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
