import { Pipe, PipeTransform } from '@angular/core';
import { ActfijoGestion } from '../models/actfijo-gestion';

@Pipe({
  name: 'searchactgestionuser'
})
export class SearchactgestionuserPipe implements PipeTransform {

  transform(arreglo: ReadonlyArray<ActfijoGestion>, textoUser: any): any {
    
    if(textoUser) {
      return arreglo.filter(
        item => JSON.stringify(item).toLocaleLowerCase().includes(textoUser)
      );
    }
    else{
      return arreglo;
    }

  }

}
