import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Marcasactivo } from 'src/app/models/marcasactivo';
import { Modelosactivo } from 'src/app/models/modelosactivo';
import { MarcasactivoService } from 'src/app/services/marcasactivo.service';
import { ModelosactivoService } from 'src/app/services/modelosactivo.service';
import notie from 'notie';

@Component({
  selector: 'app-modelosactivo',
  templateUrl: './modelosactivo.component.html',
  styleUrls: ['./modelosactivo.component.scss']
})
export class ModelosactivoComponent implements OnInit {
  mostrarCardAgregar = false;
  mostrarCardListado = true;
  mostrarCardEditar = false;
  mostrarTablaCarga = false;
  mostrarSkeleton = true;


  objModelosActivos : Modelosactivo[];
  agregarModelosActivoForm : FormGroup;
  editarModelosActivoForm : FormGroup;

  modeloActivoEdit: Modelosactivo = new Modelosactivo();
  objMarcasActivosTbl : Marcasactivo[];
  objModelosActivosTbl : Modelosactivo[];
  
  constructor(private modelosactivo: ModelosactivoService, private marcasActivo: MarcasactivoService) { 

    this.agregarModelosActivoForm = new FormGroup({
      'nombreModelo' : new FormControl('',[Validators.required]),
      'idMarca' : new FormControl('',[Validators.required]),
    });


    this.editarModelosActivoForm = new FormGroup({
      'nombre_modelo' : new FormControl('',[Validators.required]),
      'codigo_marca' : new FormControl('',[Validators.required]),
      'codigo_modelo' : new FormControl('',[Validators.required]),
    });
  }

  ngOnInit(): void {

    this.modelosactivo.getModelosActivo().subscribe(
      data => {
        this.objModelosActivosTbl = data;
        this.mostrarTablaCarga = true;
        this.mostrarSkeleton = false;
      });

    this.marcasActivo.getMarcasActivo().subscribe(
      data => {
        this.objMarcasActivosTbl = data;
      });
  }


   //metodo para mostrar card para agregar tipo de activo

   showCardAgregar() : void{
    
    this.mostrarCardAgregar = true;
    this.mostrarCardListado = false;
    this.mostrarCardEditar = false;
    this.agregarModelosActivoForm.reset();
  }

  //metodo para mostrar card para ver tabla de marcaActivos
  showCardListado() : void{
  this.mostrarTablaCarga = false;
  this.mostrarCardAgregar = false;
  this.mostrarCardListado = true;
  this.mostrarCardEditar = false;

  this.mostrarSkeleton = true;

  this.modelosactivo.getModelosActivo().subscribe(
    data => {
      this.objModelosActivosTbl = data;
      this.mostrarCardAgregar = false;
      this.mostrarCardEditar = false;
      this.mostrarSkeleton = false;
      this.mostrarCardListado = true;
      this.mostrarTablaCarga = true;
    });

}



 //metodo para guardar modelo de activo 

 guardarModelosActivo(){
  let datosModelosActivo : Modelosactivo = new Modelosactivo();

  datosModelosActivo = this.agregarModelosActivoForm.value;

  this.modelosactivo.guardarModelosActivo(datosModelosActivo).subscribe(
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



 //metodo para despeglar card de edición de modelos de activo
 editarModeloActivoCard(modeloActivo){
  this.mostrarCardEditar = true;
  this.mostrarCardListado = false;
  this.mostrarCardAgregar = false;
  this.modeloActivoEdit = modeloActivo;
}


 //metodo para cancelar edicion de datos de modelos de activo
 cancelarEdicionModeloActivo(){
  this.mostrarCardEditar = false;
  this.mostrarCardListado = true;
}

  //metodo para guardar cambios de edición de modelos de activo
  guardarEdicionModeloActivo(){
    let datosModeloActivo : Modelosactivo = new Modelosactivo();

    datosModeloActivo = this.editarModelosActivoForm.value;

    this.modelosactivo.editarModeloActivo(datosModeloActivo).subscribe(
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


   //metodo para eliminar modelo de actvio 

   eliminarModeloActivo(modeloActivo){
    this.mostrarTablaCarga = false;
    this.mostrarSkeleton = true;
    this.modelosactivo.eliminarModeloActivo(modeloActivo).subscribe(
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
            text: 'Modelo de activo eliminado con éxito',
            stay: false,
            time: 2, 
            position: 'top' 
          });

          this.modelosactivo.getModelosActivo().subscribe(
            data => {
              this.objModelosActivosTbl = data;
              this.mostrarTablaCarga = true;
              this.mostrarSkeleton = false;
            });
        }
       
    
    );
  }

}
