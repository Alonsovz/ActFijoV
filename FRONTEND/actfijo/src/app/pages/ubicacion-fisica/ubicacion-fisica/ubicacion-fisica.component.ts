import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ubicacion } from 'src/app/models/ubicacion';

@Component({
  selector: 'app-ubicacion-fisica',
  templateUrl: './ubicacion-fisica.component.html',
  styleUrls: ['./ubicacion-fisica.component.scss']
})
export class UbicacionFisicaComponent implements OnInit {

  agregarUbicacionFisicaForm : FormGroup;
  mostrarCardAgregar = false;
  mostrarCardListado = true;
  mostrarCardEditar = false;
  mostrarTablaCarga = true;
  mostrarSkeleton = true;
  listOfData : ReadonlyArray<Ubicacion> = [];
  constructor() { 
    this.agregarUbicacionFisicaForm = new FormGroup({
      'ubicacion' : new FormControl('',[Validators.required]),
    });

  } 

  ngOnInit(): void {
  }

  //metodo para mostrar card para agregar ubicación

  showCardAgregar() : void{
    
    this.mostrarCardAgregar = true;
    this.mostrarCardListado = false;
    this.mostrarCardEditar = false;
    this.agregarUbicacionFisicaForm.reset();
  }

    //metodo para mostrar card para ver tabla de ubicaciones
    showCardListado() : void{
      this.mostrarTablaCarga = false;
      this.mostrarCardAgregar = false;
      this.mostrarCardListado = true;
      this.mostrarCardEditar = false;
  
      this.mostrarSkeleton = true;
  
    }


}
