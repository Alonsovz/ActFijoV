import { Pipe, PipeTransform } from '@angular/core';
import { ActfijoGestion } from '../models/actfijo-gestion';

@Pipe({
  name: 'searchactgestion'
})
export class SearchactgestionPipe implements PipeTransform {

  transform(arreglo: ReadonlyArray<ActfijoGestion>, texto: any): any {
    
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
