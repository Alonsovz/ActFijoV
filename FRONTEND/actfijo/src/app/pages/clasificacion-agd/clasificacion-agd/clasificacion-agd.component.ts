import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClasificacionAgd } from 'src/app/models/clasificacion-agd';
import { ClasficacionAgdService } from 'src/app/services/clasficacion-agd.service';
import notie from 'notie';

@Component({
  selector: 'app-clasificacion-agd',
  templateUrl: './clasificacion-agd.component.html',
  styleUrls: ['./clasificacion-agd.component.scss']
})
export class ClasificacionAgdComponent implements OnInit {
  mostrarCardAgregar = false;
  mostrarCardListado = true;
  mostrarCardEditar = false;
  mostrarTablaCarga = false;
  mostrarSkeleton = true;


  objClasificacionAgd : ClasificacionAgd[];
  agregarClasificacionAgdForm : FormGroup;
  editarClasificacionAgdForm : FormGroup;

  clasificacionAgdEdit: ClasificacionAgd = new ClasificacionAgd();

  constructor(private clasificacionAgd: ClasficacionAgdService) {
    this.agregarClasificacionAgdForm = new FormGroup({
      'nombre' : new FormControl('',[Validators.required]),
    });


    this.editarClasificacionAgdForm = new FormGroup({
      'codigo_agd' : new FormControl('',[Validators.required]),
      'descripcion_agd' : new FormControl('',[Validators.required]),
    });
   }

  ngOnInit(): void {
    this.clasificacionAgd.getClasificacionesAgd().subscribe(
      data => {
        this.objClasificacionAgd = data;
        this.mostrarTablaCarga = true;
        this.mostrarSkeleton = false;
      });
  }



  
    //metodo para mostrar card para agregar Clasificacion AGD

    showCardAgregar() : void{
    
      this.mostrarCardAgregar = true;
      this.mostrarCardListado = false;
      this.mostrarCardEditar = false;
      this.agregarClasificacionAgdForm.reset();
    }
  
    //metodo para mostrar card para ver tabla de Clasificacion AGD
    showCardListado() : void{
      this.mostrarTablaCarga = false;
      this.mostrarCardAgregar = false;
      this.mostrarCardListado = true;
      this.mostrarCardEditar = false;
    
      this.mostrarSkeleton = true;
    
    this.clasificacionAgd.getClasificacionesAgd().subscribe(
        data => {
          this.objClasificacionAgd = data;
          this.mostrarCardAgregar = false;
          this.mostrarCardEditar = false;
          this.mostrarSkeleton = false;
          this.mostrarCardListado = true;
          this.mostrarTablaCarga = true;
        });
  
  }


   //metodo para guardar Clasificacion AGD 

   guardarClasificacionAgd(){
    let datosClasificacionAgd : ClasificacionAgd = new ClasificacionAgd();

    datosClasificacionAgd = this.agregarClasificacionAgdForm.value;

    this.clasificacionAgd.guardarClasificacionAgd(datosClasificacionAgd).subscribe(
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
            text: 'Clasificación AGD guardada con éxito',
            stay: false,
            time: 2, 
            position: 'top' 
          });
        this.showCardListado();
        }
      
    
    );
}


 //metodo para despeglar card de edición de Clasificacion AGD
 editarClasificacionAgdCard(tipo){
  this.mostrarCardEditar = true;
  this.mostrarCardListado = false;
  this.mostrarCardAgregar = false;
  this.clasificacionAgdEdit = tipo;
}


 //metodo para cancelar edicion de datos de Clasificacion AGD
 cancelarEdicionClasificacionAgd(){
  this.mostrarCardEditar = false;
  this.mostrarCardListado = true;
}


 //metodo para guardar cambios de edición de Clasificacion AGD
 guardarEdicionClasificacionAgd(){
  let datosClasificacionAgd : ClasificacionAgd = new ClasificacionAgd();

  datosClasificacionAgd = this.editarClasificacionAgdForm.value;

  this.clasificacionAgd.editarClasificacionAgd(datosClasificacionAgd).subscribe(
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


 //metodo para eliminar Clasificacion AGD

 eliminarClasificacionAgd(clasificacion){
  this.mostrarTablaCarga = false;
  this.mostrarSkeleton = true;
  this.clasificacionAgd.eliminarClasificacionAgd(clasificacion).subscribe(
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
          text: 'Clasificación AGD eliminada con éxito',
          stay: false,
          time: 2, 
          position: 'top' 
        });

        this.clasificacionAgd.getClasificacionesAgd().subscribe(
          data => {
            this.objClasificacionAgd = data;
            this.mostrarTablaCarga = true;
            this.mostrarSkeleton = false;
          });
      }
     
  
  );
}


}
