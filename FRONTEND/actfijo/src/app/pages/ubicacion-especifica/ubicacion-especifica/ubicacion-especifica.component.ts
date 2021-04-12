import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ubicacion } from 'src/app/models/ubicacion';
import notie from 'notie';
import { UbicacionEspecificaService } from 'src/app/services/ubicacion-especifica.service';

@Component({
  selector: 'app-ubicacion-especifica',
  templateUrl: './ubicacion-especifica.component.html',
  styleUrls: ['./ubicacion-especifica.component.scss']
})
export class UbicacionEspecificaComponent implements OnInit {

  agregarUbicacionEspecificaForm : FormGroup;
  editarUbicacionEspecificaForm: FormGroup;

  mostrarCardAgregar = false;
  mostrarCardListado = true;
  mostrarCardEditar = false;
  mostrarTablaCarga = false;
  mostrarSkeleton = true;
  listOfData : ReadonlyArray<Ubicacion> = [];
  ubicacion: Ubicacion = new Ubicacion();
  listOfCurrentPageData: ReadonlyArray<Ubicacion> = [];
  texto: any;
  
  
  constructor(private ubicacionService: UbicacionEspecificaService) {
    this.agregarUbicacionEspecificaForm = new FormGroup({
      'ubicacion' : new FormControl('',[Validators.required]),
    });

    this.editarUbicacionEspecificaForm = new FormGroup({
      'id' : new FormControl('',[Validators.required]),
      'ubicacion' : new FormControl('',[Validators.required]),
    });
   }
  

  ngOnInit(): void {
    this.ubicacionService.getUbicacionesEspecificas().subscribe(
      data => {
        this.listOfData = data;
        this.mostrarCardAgregar = false;
        this.mostrarCardEditar = false;
        this.mostrarSkeleton = false;
        this.mostrarCardListado = true;
        this.mostrarTablaCarga = true;
        
      });
  }


    //metodo para mostrar card para agregar ubicación

    showCardAgregar() : void{
    
      this.mostrarCardAgregar = true;
      this.mostrarCardListado = false;
      this.mostrarCardEditar = false;
      this.agregarUbicacionEspecificaForm.reset();
    }
  
      //metodo para mostrar card para ver tabla de ubicaciones
      showCardListado() : void{
        this.mostrarTablaCarga = false;
        this.mostrarCardAgregar = false;
        this.mostrarCardListado = true;
        this.mostrarCardEditar = false;
    
        this.mostrarSkeleton = true;
  
  
        this.ubicacionService.getUbicacionesEspecificas().subscribe(
          data => {
            this.listOfData = data;
            this.mostrarCardAgregar = false;
            this.mostrarCardEditar = false;
            this.mostrarSkeleton = false;
            this.mostrarCardListado = true;
            this.mostrarTablaCarga = true;
            
          });
    
      }




      guardarUbicacionEspecifica(){
        let datos : Ubicacion = new Ubicacion();
  
        datos = this.agregarUbicacionEspecificaForm.value;
    
        this.ubicacionService.guardarUbicacionEspecifica(datos).subscribe(
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
                text: 'Tipo activo guardado con éxito',
                stay: false,
                time: 2, 
                position: 'top' 
              });
            this.showCardListado();
            }
           
        
        );
      }
  
  
       //metodo para despeglar card de edición de ubicacion fisica
  editarUbicacionEspecificaCard(ob){
    this.mostrarCardEditar = true;
    this.mostrarCardListado = false;
    this.mostrarCardAgregar = false;
    this.ubicacion = ob;
  }
  
  
   //metodo para cancelar edicion de datos de ubicacion fisica
   cancelarUbicacionFisica(){
    this.mostrarCardEditar = false;
    this.mostrarCardListado = true;
  }
  
  
  //metodo para guardar cambios de edición de ubicacion fisica
  guardarEditarUbicacionFisica(){
    let datos : Ubicacion = new Ubicacion();
  
    datos = this.editarUbicacionEspecificaForm.value;
  
    this.ubicacionService.editarUbicacionEspecifica(datos).subscribe(
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
  
  
   //metodo para eliminar ubicacion fisica
  
   eliminarUbicacionEspecifica(marcaActivo){
    this.mostrarTablaCarga = false;
    this.mostrarSkeleton = true;
    this.ubicacionService.eliminarUbicacionEspecifica(marcaActivo).subscribe(
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
            text: 'Ubicación física eliminada con éxito',
            stay: false,
            time: 2, 
            position: 'top' 
          });
  
          this.ubicacionService.getUbicacionesEspecificas().subscribe(
            data => {
              this.listOfData = data;
              this.mostrarTablaCarga = true;
              this.mostrarSkeleton = false;
            });
        }
       
    
    );
  }
  
  
  onCurrentPageDataChange(listOfCurrentPageData: ReadonlyArray<Ubicacion>) {
    this.listOfCurrentPageData  = listOfCurrentPageData;
  
  }
  
  _texto:string;
  ConvertToLower(evt) {
    this.texto = evt.toLowerCase();
  }
  

}
