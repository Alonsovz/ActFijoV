import { Pipe, PipeTransform } from '@angular/core';
import { ClasificacionAgd } from '../models/clasificacion-agd';

@Pipe({
  name: 'searchclasificacionagd'
})
export class SearchclasificacionagdPipe implements PipeTransform {

  transform(arreglo: ReadonlyArray<ClasificacionAgd>, texto: any): any {
    
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
