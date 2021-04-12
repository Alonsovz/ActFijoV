import { Pipe, PipeTransform } from '@angular/core';
import { Ubicacion } from '../models/ubicacion';

@Pipe({
  name: 'searchubicacion'
})
export class SearchubicacionPipe implements PipeTransform {

  transform(arreglo: ReadonlyArray<Ubicacion>, texto: any): any {
    
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
