import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoBienVnr } from 'src/app/models/tipo-bien-vnr';
import { TipoBienVnrService } from 'src/app/services/tipo-bien-vnr.service';
import notie from 'notie';
@Component({
  selector: 'app-tipo-bien-vnr',
  templateUrl: './tipo-bien-vnr.component.html',
  styleUrls: ['./tipo-bien-vnr.component.scss']
})
export class TipoBienVnrComponent implements OnInit {
  mostrarCardAgregar = false;
  mostrarCardListado = true;
  mostrarCardEditar = false;
  mostrarTablaCarga = false;
  mostrarSkeleton = true;


  objTipoBienVNR : TipoBienVnr[];
  agregarTipoBienVNRForm : FormGroup;
  editarTipoBienVnrForm : FormGroup;

  tipoBienVnrEdit: TipoBienVnr = new TipoBienVnr();
  objTipoBienVNRTbl : TipoBienVnr[];


  listOfData: ReadonlyArray<TipoBienVnr> = [];
  listOfCurrentPageData: ReadonlyArray<TipoBienVnr> = [];

  constructor(private tipoBienVnr: TipoBienVnrService) { 
    this.agregarTipoBienVNRForm = new FormGroup({
      'nombre' : new FormControl('',[Validators.required]),
    });


    this.editarTipoBienVnrForm = new FormGroup({
      'codigo_tipo_bien_vnr' : new FormControl('',[Validators.required]),
      'nombre_tipo_bien' : new FormControl('',[Validators.required]),
    });
  }

  ngOnInit(): void {
    this.tipoBienVnr.getTiposBienVnr().subscribe(
      data => {
        this.listOfData = data;
        this.mostrarTablaCarga = true;
        this.mostrarSkeleton = false;
      });
  }



    //metodo para mostrar card para agregar tipo de bien VNR

    showCardAgregar() : void{
    
      this.mostrarCardAgregar = true;
      this.mostrarCardListado = false;
      this.mostrarCardEditar = false;
      this.agregarTipoBienVNRForm.reset();
    }
  
    //metodo para mostrar card para ver tabla de tipo de bien VNR
    showCardListado() : void{
    this.mostrarTablaCarga = false;
    this.mostrarCardAgregar = false;
    this.mostrarCardListado = true;
    this.mostrarCardEditar = false;
  
    this.mostrarSkeleton = true;
  
   this.tipoBienVnr.getTiposBienVnr().subscribe(
      data => {
        this.listOfData = data;
        this.mostrarCardAgregar = false;
        this.mostrarCardEditar = false;
        this.mostrarSkeleton = false;
        this.mostrarCardListado = true;
        this.mostrarTablaCarga = true;
      });
  
  }


   //metodo para guardar tipo de bien VNR 

   guardarTipoBienVNR(){
  let datosTipoBienVNR : TipoBienVnr = new TipoBienVnr();

  datosTipoBienVNR = this.agregarTipoBienVNRForm.value;

  this.tipoBienVnr.guardarTipoBienVnr(datosTipoBienVNR).subscribe(
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
          text: 'Tipo bien VNR guardado con éxito',
          stay: false,
          time: 2, 
          position: 'top' 
        });
      this.showCardListado();
      }
     
  
  );
}


 //metodo para despeglar card de edición de tipo de bien VNR
 editarTipoBienVnrCard(tipo){
  this.mostrarCardEditar = true;
  this.mostrarCardListado = false;
  this.mostrarCardAgregar = false;
  this.tipoBienVnrEdit = tipo;
}


 //metodo para cancelar edicion de datos de tipo de bien VNR
 cancelarEdicionTipoBienVnr(){
  this.mostrarCardEditar = false;
  this.mostrarCardListado = true;
}


 //metodo para guardar cambios de edición de tipo de bien VNR
 guardarEdicionTipoBienVnr(){
  let datosTipoBienVNR : TipoBienVnr = new TipoBienVnr();

  datosTipoBienVNR = this.editarTipoBienVnrForm.value;

  this.tipoBienVnr.editarTipoBienVnr(datosTipoBienVNR).subscribe(
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


 //metodo para eliminar tipo de bien VNR

 eliminarTipoBienVnr(tipo){
  this.mostrarTablaCarga = false;
  this.mostrarSkeleton = true;
  this.tipoBienVnr.eliminarTipoBienVnr(tipo).subscribe(
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
          text: 'Tipo bien VNR eliminado con éxito',
          stay: false,
          time: 2, 
          position: 'top' 
        });

        this.tipoBienVnr.getTiposBienVnr().subscribe(
          data => {
            this.listOfData = data;
            this.mostrarTablaCarga = true;
            this.mostrarSkeleton = false;
          });
      }
     
  
  );
}


onCurrentPageDataChange(listOfCurrentPageData: ReadonlyArray<TipoBienVnr>) {
  this.listOfCurrentPageData  = listOfCurrentPageData;

}
}
