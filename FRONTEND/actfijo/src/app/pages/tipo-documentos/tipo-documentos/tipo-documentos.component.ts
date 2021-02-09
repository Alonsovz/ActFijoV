import { TipoDocumentosService } from './../../../services/tipo-documentos.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import notie from 'notie';
import { TipoDocumentos } from 'src/app/models/tipo-documentos';
@Component({
  selector: 'app-tipo-documentos',
  templateUrl: './tipo-documentos.component.html',
  styleUrls: ['./tipo-documentos.component.scss']
})
export class TipoDocumentosComponent implements OnInit {
  texto:any;
  mostrarCardAgregar = false;
  mostrarCardListado = true;
  mostrarCardEditar = false;
  mostrarTablaCarga = false;
  mostrarSkeleton = true;


  agregarTipoDocumento : FormGroup;
  editarTipoDocumento: FormGroup;
  objTipoDocumentosTbl : TipoDocumentos[];
  tipodocumentoedit: TipoDocumentos = new TipoDocumentos();

  listOfData: ReadonlyArray<TipoDocumentos> = [];
  listOfCurrentPageData: ReadonlyArray<TipoDocumentos> = [];

  constructor(private tipodocumentoservice: TipoDocumentosService) {

    this.agregarTipoDocumento = new FormGroup({
      'descripcion_tipo_documento' : new FormControl('',[Validators.required]),
      'siglas': new FormControl('', Validators.required)
    });

    this.editarTipoDocumento = new FormGroup({
      'descripcion_tipo_documento' : new FormControl('',[Validators.required]),
      'siglas': new FormControl('', Validators.required),
      'codigo_tipo_documento': new FormControl('', Validators.required)
    });


  }

  ngOnInit(): void {
    // llamada al metodo de mostrar tipos de documentos
    this.mostrarTipoDocumentos();
  }


  //metodo para mostrar card para agregar marcaActivos

  showCardAgregar() : void{

    this.mostrarCardAgregar = true;
    this.mostrarCardListado = false;
    this.mostrarCardEditar = false;
    this.agregarTipoDocumento.reset();
  }

  //metodo para mostrar card para ver tabla de marcaActivos
  showCardListado() : void{
  this.mostrarTablaCarga = false;
  this.mostrarCardAgregar = false;
  this.mostrarCardListado = true;
  this.mostrarCardEditar = false;

  this.mostrarSkeleton = true;

  this.mostrarTipoDocumentos();


}



// obtener los tipos de documentos
mostrarTipoDocumentos() {
  this.tipodocumentoservice.getTipoDocumentos().subscribe(
    response => {this.listOfData = response;
      this.mostrarCardAgregar = false;
      this.mostrarCardEditar = false;
      this.mostrarSkeleton = false;
      this.mostrarCardListado = true;
      this.mostrarTablaCarga = true;
    },
    err => {

    },
    () => {

    }
  );
}




 //metodo para guardar marca de activo

 guardarTipoDocumento(){

  // llamada al metodo del servicio para poder guardar un nuevo tipo de documento
  this.tipodocumentoservice.saveTipoDocumento(this.agregarTipoDocumento.value).subscribe(
    response => {
      console.log(response);
    },
    err => {
      notie.alert({
        type: 'error',
        text: 'Error al guardar datos',
        stay: false,
        time: 2,
        position: 'top'
      });
    },
    () => {
      notie.alert({
        type: 'success',
        text: 'Tipo de documento guardado con exito',
        stay: false,
        time: 2,
        position: 'top'
      });

      this.showCardListado();
    }

  )


}


editarMarcaActivoCard(tipodocumento) {
  this.mostrarCardEditar = true;
  this.mostrarCardListado = false;
  this.mostrarCardAgregar = false;
  this.mostrarCardEditar = true;
  this.tipodocumentoedit = tipodocumento;
}

eliminarTipoActivo(tipodocumento: TipoDocumentos) {
  console.log(tipodocumento)
  this.tipodocumentoservice.eliminarTipoDocumento(tipodocumento).subscribe(
    response => {

    },
    err => {
      notie.alert({
        type: 'error',
        text: 'Error al eliminar datos',
        stay: false,
        time: 2,
        position: 'top'
      });
    },
    () => {
      notie.alert({
        type: 'success',
        text: 'Tipo de documento eliminado con exito',
        stay: false,
        time: 2,
        position: 'top'
      });
      this.showCardListado();
    }
  )
}

cancelarEdicionTipoDocumento() {
  this.mostrarCardEditar = false;
  this.mostrarCardListado = true;
}

guardarEdicionTipoDocumento() {
  console.log(this.editarTipoDocumento.value);
  this.tipodocumentoservice.editarTipoDocumento(this.editarTipoDocumento.value).subscribe(
    response => {
      console.log(response);
    },
    err => {
      notie.alert({
        type: 'error',
        text: 'Error al editar datos',
        stay: false,
        time: 2,
        position: 'top'
      });
    },
    () => {
      notie.alert({
        type: 'success',
        text: 'Tipo de documento editado con exito',
        stay: false,
        time: 2,
        position: 'top'
      });

      this.showCardListado();
    }
  )
}



onCurrentPageDataChange(listOfCurrentPageData: ReadonlyArray<TipoDocumentos>) {
  this.listOfCurrentPageData  = listOfCurrentPageData;

}

_texto:string;
ConvertToLower(evt) {
    this.texto = evt.toLowerCase();
}


}
