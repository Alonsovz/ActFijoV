import { Pipe, PipeTransform } from '@angular/core';
import { TipoBienVnr } from '../models/tipo-bien-vnr';

@Pipe({
  name: 'searchtipobienvnr'
})
export class SearchtipobienvnrPipe implements PipeTransform {

  transform(arreglo: ReadonlyArray<TipoBienVnr>, texto: any): any {
    
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
