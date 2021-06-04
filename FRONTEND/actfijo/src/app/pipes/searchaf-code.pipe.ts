import { Pipe, PipeTransform } from '@angular/core';
import { ActfijoGestion } from '../models/actfijo-gestion';

@Pipe({
  name: 'searchafCode'
})
export class SearchafCodePipe implements PipeTransform {

  transform(arreglo: ReadonlyArray<ActfijoGestion>, texto: any): any {
    
    if(texto) {
      return arreglo.filter(
        item => JSON.stringify(item.af_codigo_interno).toLocaleLowerCase().includes(texto),
      );
     
    }
    else{
      return arreglo;
    }

  }

}
