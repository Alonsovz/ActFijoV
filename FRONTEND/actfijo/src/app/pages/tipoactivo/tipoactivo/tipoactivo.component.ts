import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tipoactivo } from 'src/app/models/tipoactivo';
import notie from 'notie';
import { TipoactivoService } from 'src/app/services/tipoactivo.service';

@Component({
  selector: 'app-tipoactivo',
  templateUrl: './tipoactivo.component.html',
  styleUrls: ['./tipoactivo.component.scss']
})



export class TipoactivoComponent implements OnInit {
  agregarTipoActivoForm : FormGroup;
  editarTipoActivoForm : FormGroup;
  mostrarCardAgregar = false;
  mostrarCardListado = true;
  mostrarCardEditar = false;
  mostrarTablaCarga = false;
  mostrarSkeleton = true;
  objTipoActivosTbl : Tipoactivo[];
  tipoActivoEdit: Tipoactivo = new Tipoactivo();
  objCuentas: Tipoactivo[];

  constructor(private tipoActivo: TipoactivoService) {  
    this.agregarTipoActivoForm = new FormGroup({
      'descPPYE' : new FormControl('',[Validators.required]),
      'cuentaContable' : new FormControl('',[Validators.required]),
      'tasaFiscal' : new FormControl('',[Validators.required]),
      'tasaFinanciera' : new FormControl('',[Validators.required]),
      'siglas' : new FormControl('',[Validators.required]),
    });


    this.editarTipoActivoForm = new FormGroup({
      'cod_ppye': new FormControl('',[Validators.required]),
      'descripcion_ppye' : new FormControl('',[Validators.required]),
      'cuenta_contable' : new FormControl('',[Validators.required]),
      'tasa_fiscal' : new FormControl('',[Validators.required]),
      'tasa_financ' : new FormControl('',[Validators.required]),
      'siglas' : new FormControl('',[Validators.required]),
    });

  }

  ngOnInit(): void {
   
    this.tipoActivo.getTipoActivo().subscribe(
      data => {
        this.objTipoActivosTbl = data;
        this.mostrarTablaCarga = true;
        this.mostrarSkeleton = false;
      });


      this.tipoActivo.getCuentas().subscribe(
        data => {
          this.objCuentas = data;
        });
  }


    //metodo para mostrar card para agregar tipo de activo

    showCardAgregar() : void{
    
      this.mostrarCardAgregar = true;
      this.mostrarCardListado = false;
      this.mostrarCardEditar = false;
      this.agregarTipoActivoForm.reset();
    }
  
    //metodo para mostrar card para ver tabla de tipoActivos
    showCardListado() : void{
    this.mostrarTablaCarga = false;
    this.mostrarCardAgregar = false;
    this.mostrarCardListado = true;
    this.mostrarCardEditar = false;

    this.mostrarSkeleton = true;

    this.tipoActivo.getTipoActivo().subscribe(
      data => {
        this.objTipoActivosTbl = data;
        this.mostrarCardAgregar = false;
        this.mostrarCardEditar = false;
        this.mostrarSkeleton = false;
        this.mostrarCardListado = true;
        this.mostrarTablaCarga = true;
        
      });
  }


  //metodo para guardar tipo de activo 

  guardarTipoActivo(){
    let datosTipoActivo : Tipoactivo = new Tipoactivo();

    datosTipoActivo = this.agregarTipoActivoForm.value;

    this.tipoActivo.guardarTipoActivo(datosTipoActivo).subscribe(
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

  //metodo para despeglar card de edición de tipoActivo
  editarTipoActivoCard(tipoActivo){
    this.mostrarCardEditar = true;
    this.mostrarCardListado = false;
    this.mostrarCardAgregar = false;
    this.tipoActivoEdit = tipoActivo;
  }


   //metodo para cancelar edicion de datos de tipoActivo
   cancelarEdicionTipoActivo(){
    this.mostrarCardEditar = false;
    this.mostrarCardListado = true;
  }

    //metodo para guardar cambios de edición de tipoActivo
    guardarEdicionTipoActivo(){
      let datosTipoActivo : Tipoactivo = new Tipoactivo();
  
      datosTipoActivo = this.editarTipoActivoForm.value;
  
      this.tipoActivo.editarTipoActivo(datosTipoActivo).subscribe(
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


    //metodo para eliminar tipoActivo 

  eliminarTipoActivo(tipoActivo){
    this.mostrarTablaCarga = false;
    this.mostrarSkeleton = true;
    this.tipoActivo.eliminarTipoActivo(tipoActivo).subscribe(
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
            text: 'Tipo de activo eliminado con éxito',
            stay: false,
            time: 2, 
            position: 'top' 
          });

          this.tipoActivo.getTipoActivo().subscribe(
            data => {
              this.objTipoActivosTbl = data;
              this.mostrarTablaCarga = true;
              this.mostrarSkeleton = false;
            });
        }
       
    
    );
  }
}
