import { Pipe, PipeTransform } from '@angular/core';
import { Modelosactivo } from '../models/modelosactivo';

@Pipe({
  name: 'searchmodeloactivo'
})
export class SearchmodeloactivoPipe implements PipeTransform {

  transform(arreglo: ReadonlyArray<Modelosactivo>, texto: any): any {
    
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
