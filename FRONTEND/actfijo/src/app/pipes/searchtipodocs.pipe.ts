import { Pipe, PipeTransform } from '@angular/core';
import { TipoDocumentos } from '../models/tipo-documentos';

@Pipe({
  name: 'searchtipodocs'
})
export class SearchtipodocsPipe implements PipeTransform {

  transform(arreglo: ReadonlyArray<TipoDocumentos>, texto: any): any {
    
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
