import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Marcasactivo } from 'src/app/models/marcasactivo';
import { MarcasactivoService } from 'src/app/services/marcasactivo.service';
import notie from 'notie';

@Component({
  selector: 'app-marcasactivo',
  templateUrl: './marcasactivo.component.html',
  styleUrls: ['./marcasactivo.component.scss']
})
export class MarcasactivoComponent implements OnInit {
  mostrarCardAgregar = false;
  mostrarCardListado = true;
  mostrarCardEditar = false;
  mostrarTablaCarga = false;
  mostrarSkeleton = true;

  objMarcasActivosTbl : Marcasactivo[];
  agregarMarcaActivoForm : FormGroup;
  editarMarcaActivoForm : FormGroup;

  marcaActivoEdit: Marcasactivo = new Marcasactivo();

  constructor(private marcasActivo: MarcasactivoService) { 

    this.agregarMarcaActivoForm = new FormGroup({
      'nombreMarca' : new FormControl(''),
    });


    this.editarMarcaActivoForm = new FormGroup({
      'nombre_marca': new FormControl(''),
      'codigo_marca': new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.marcasActivo.getMarcasActivo().subscribe(
      data => {
        this.objMarcasActivosTbl = data;
        this.mostrarTablaCarga = true;
        this.mostrarSkeleton = false;
      });
  }


  //metodo para mostrar card para agregar tipo de activo

  showCardAgregar() : void{
    
    this.mostrarCardAgregar = true;
    this.mostrarCardListado = false;
    this.mostrarCardEditar = false;
    this.agregarMarcaActivoForm.reset();
  }

  //metodo para mostrar card para ver tabla de marcaActivos
  showCardListado() : void{
  this.mostrarTablaCarga = false;
  this.mostrarCardAgregar = false;
  this.mostrarCardListado = true;
  this.mostrarCardEditar = false;

  this.mostrarSkeleton = true;

  this.marcasActivo.getMarcasActivo().subscribe(
    data => {
      this.objMarcasActivosTbl = data;
      this.mostrarCardAgregar = false;
      this.mostrarCardEditar = false;
      this.mostrarSkeleton = false;
      this.mostrarCardListado = true;
      this.mostrarTablaCarga = true;
      
    });
}


 //metodo para guardar marca de activo 

 guardarMarcasActivo(){
  let datosmarcaActivo : Marcasactivo = new Marcasactivo();

  datosmarcaActivo = this.agregarMarcaActivoForm.value;

  this.marcasActivo.guardarMarcasActivo(datosmarcaActivo).subscribe(
    response => {
     
    },
    err => {
      notie.alert({ 
        type: 'error', 
        text: 'Error al guardar datos!',
        stay: false,
        time: 2, 
        position: 'top' 
      });
    },
    () => {
     
        notie.alert({ 
          type: 'success', 
          text: 'Marca de activo guardada con éxito',
          stay: false,
          time: 2, 
          position: 'top' 
        });
      this.showCardListado();
      }
     
  
  );
}



 //metodo para despeglar card de edición de marcaActivo
 editarMarcaActivoCard(marcaActivo){
  this.mostrarCardEditar = true;
  this.mostrarCardListado = false;
  this.mostrarCardAgregar = false;
  this.marcaActivoEdit = marcaActivo;
}


 //metodo para cancelar edicion de datos de marcaActivo
 cancelarEdicionMarcaActivo(){
  this.mostrarCardEditar = false;
  this.mostrarCardListado = true;
}

  //metodo para guardar cambios de edición de marcaActivo
  guardarEdicionMarcaActivo(){
    let datosMarcaActivo : Marcasactivo = new Marcasactivo();

    datosMarcaActivo = this.editarMarcaActivoForm.value;

    this.marcasActivo.editarMarcaActivo(datosMarcaActivo).subscribe(
      response => {
       
      },
      err => {
        notie.alert({ 
          type: 'error', 
          text: 'Error al guardar datos!',
          stay: false,
          time: 2, 
          position: 'top' 
        });
      },
      () => {
       
          notie.alert({ 
            type: 'success', 
            text: 'Datos modificados con éxito',
            stay: false,
            time: 2, 
            position: 'top' 
          });
        this.showCardListado();
        }
       
    
    );
  }


   //metodo para eliminar marca de actvio 

   eliminarMarcaActivo(marcaActivo){
    this.mostrarTablaCarga = false;
    this.mostrarSkeleton = true;
    this.marcasActivo.eliminarMarcaActivo(marcaActivo).subscribe(
      response => {
       
      },
      err => {
        notie.alert({ 
          type: 'error', 
          text: 'Error al eliminar datos!',
          stay: false,
          time: 2, 
          position: 'top' 
        });
      },
      () => {
       
          notie.alert({ 
            type: 'success', 
            text: 'Marca de activo eliminada con éxito',
            stay: false,
            time: 2, 
            position: 'top' 
          });

          this.marcasActivo.getMarcasActivo().subscribe(
            data => {
              this.objMarcasActivosTbl = data;
              this.mostrarTablaCarga = true;
              this.mostrarSkeleton = false;
            });
        }
       
    
    );
  }


}