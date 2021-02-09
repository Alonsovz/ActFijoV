import { Pipe, PipeTransform } from '@angular/core';
import { Rol } from '../models/rol';

@Pipe({
  name: 'searchroles'
})
export class SearchrolesPipe implements PipeTransform {



    transform(arreglo: ReadonlyArray<Rol>, texto: any): any {
    
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
