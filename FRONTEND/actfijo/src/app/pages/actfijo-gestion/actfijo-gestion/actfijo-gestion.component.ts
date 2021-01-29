import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActfijoGestion } from 'src/app/models/actfijo-gestion';
import { ClasificacionAgd } from 'src/app/models/clasificacion-agd';
import { Marcasactivo } from 'src/app/models/marcasactivo';
import { Modelosactivo } from 'src/app/models/modelosactivo';
import { TipoBienVnr } from 'src/app/models/tipo-bien-vnr';
import { TipoDocumentos } from 'src/app/models/tipo-documentos';
import { Tipoactivo } from 'src/app/models/tipoactivo';
import { ActfijoGestionService } from 'src/app/services/actfijo-gestion.service';
import { ClasficacionAgdService } from 'src/app/services/clasficacion-agd.service';
import { MarcasactivoService } from 'src/app/services/marcasactivo.service';
import { ModelosactivoService } from 'src/app/services/modelosactivo.service';
import { TipoBienVnrService } from 'src/app/services/tipo-bien-vnr.service';
import { TipoDocumentosService } from 'src/app/services/tipo-documentos.service';
import { TipoactivoService } from 'src/app/services/tipoactivo.service';
import notie from 'notie';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-actfijo-gestion',
  templateUrl: './actfijo-gestion.component.html',
  styleUrls: ['./actfijo-gestion.component.scss']
})
export class ActfijoGestionComponent implements OnInit {
  mostrarCardAgregar = false;
  mostrarCardListado = true;
  mostrarCardEditar = false;
  mostrarTablaCarga = false;
  mostrarSkeleton = true;
  mostrarSkeletonTabla = true;
  datosCargados = false;
  validarPPYE = false;
  validarDepartamento = true;
  validarModelo = true;
  altaActivoForm : FormGroup;

  mostrarCardListadoAdmin = false;
  mostrarSkeletonTablaAdmin = false;
  mostrarTablaCargaAdmin = false;

  objTipoActivosTbl : Tipoactivo[];
  objTipoBienVNR : TipoBienVnr[];
  objClasificacionAgd : ClasificacionAgd[];
  objMarcasActivosTbl : Marcasactivo[];
  objTipoDocumentosTbl : TipoDocumentos[];
  objModelosActivos : Modelosactivo[];
  objCCostoBien : ActfijoGestion[];
  objBodegas : ActfijoGestion[];
  objProveedores :  ActfijoGestion[];
  objTipoPartida : ActfijoGestion[];
  objDepartamentos : ActfijoGestion[];
  objMunicipios : ActfijoGestion[];
  objTipoActivoPPYE : ActfijoGestion[];
  objUbicacionFisica : ActfijoGestion[];


  listOfData: ReadonlyArray<ActfijoGestion> = [];
  listOfCurrentPageData: ReadonlyArray<ActfijoGestion> = [];

  listOfDataAdmin: ReadonlyArray<ActfijoGestion> = [];
  listOfCurrentPageDataAdmin: ReadonlyArray<ActfijoGestion> = [];

  user: Usuario = new Usuario();

  constructor(private tipoActivo: TipoactivoService, private tipoBienVnr: TipoBienVnrService,
    private clasificacionAgd: ClasficacionAgdService, private marcasActivo: MarcasactivoService,
    private tipodocumentoservice: TipoDocumentosService, private modelosactivo: ModelosactivoService,
    private gestionActFijo: ActfijoGestionService) { 

    this.altaActivoForm = new FormGroup({
      'tipoDocumento': new FormControl('',[Validators.required]),
      'numeroDocumento': new FormControl('',[Validators.required]),
      'codigoVNR': new FormControl('',[Validators.required]),
      'codigoContable': new FormControl('',[Validators.required]),
      'tipoActivoPPYE' : new FormControl('0',[Validators.required]),
      'fechaRegistro': new FormControl('',[Validators.required]),
      'cuentaContable': new FormControl('',[Validators.required]),
      'tasaFiscal': new FormControl('',[Validators.required]),
      'tasaFinanciera': new FormControl('',[Validators.required]),
      'vidaUtil': new FormControl('',[Validators.required]),
      'tipoPartida': new FormControl('',[Validators.required]),
      'descripcionBien': new FormControl('',[Validators.required]),
      'tipoActivoVNR': new FormControl('',[Validators.required]),
      'areaUbicacionVNR': new FormControl('',[Validators.required]),
      'ccCostoVnr': new FormControl('',[Validators.required]),
      'tipoAgd': new FormControl('',[Validators.required]),
      'bodegaAsignada': new FormControl('',[Validators.required]),
      'marcaBien': new FormControl('0',[Validators.required]),
      'modeloBien': new FormControl('',[Validators.required]),
      'serieBien': new FormControl('',[Validators.required]),
      'otrasEspecificaciones': new FormControl('',[Validators.required]),
      'fechaCompra': new FormControl('',[Validators.required]),
      'proveedor': new FormControl('',[Validators.required]),
      'departamento': new FormControl('0',[Validators.required]),
      'municipio': new FormControl('',[Validators.required]),
      'ubicacionFisica': new FormControl('',[Validators.required]),
      'estadoActivo' : new FormControl('',[Validators.required]),
      'valorSiva': new FormControl('',[Validators.required]),
      'asignadoA': new FormControl('',[Validators.required]),
    });
  }

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem("usuario"));

      let datosUsuario : Usuario = new Usuario();
    
      datosUsuario = this.user;

      this.gestionActFijo.getMisActivos(datosUsuario).subscribe(
        data => {
          this.listOfData = data;
          this.mostrarTablaCarga = true;
          this.mostrarSkeletonTabla = false;
        });
    

    this.tipoActivo.getTipoActivo().subscribe(
      data => {
        this.objTipoActivosTbl = data;
    });

    this.tipoBienVnr.getTiposBienVnr().subscribe(
      data => {
        this.objTipoBienVNR = data;
    });


    this.clasificacionAgd.getClasificacionesAgd().subscribe(
      data => {
        this.objClasificacionAgd = data;
    });


    this.marcasActivo.getMarcasActivo().subscribe(
      data => {
        this.objMarcasActivosTbl = data;
    });

    this.tipodocumentoservice.getTipoDocumentos().subscribe(
      data => {
        this.objTipoDocumentosTbl = data; 
    });

    this.gestionActFijo.getCCostoBien().subscribe(
      data => {
        this.objCCostoBien = data;
    });


    this.gestionActFijo.getBodegas().subscribe(
      data => {
        this.objBodegas = data;
    });
      
    this.gestionActFijo.getProveedores().subscribe(
      data => {
        this.objProveedores = data;
    });

    this.gestionActFijo.getTipoPartida().subscribe(
      data => {
        this.objTipoPartida = data;
    });


    this.gestionActFijo.getDepartamentos().subscribe(
      data => {
        this.objDepartamentos = data;
    });

    
    this.gestionActFijo.getUbicacionFisica().subscribe(
      data => {
        this.objUbicacionFisica = data;

        this.mostrarSkeleton = false;
        this.datosCargados = true;
    });
  }




   //metodo para mostrar card para alta de activo

   showCardAgregar() : void{
    
    this.mostrarCardAgregar = true;
    this.mostrarCardListado = false;
    this.mostrarCardEditar = false;
    this.validarPPYE = false;

    this.mostrarSkeletonTablaAdmin = false;
    this.mostrarCardListadoAdmin = false; 
    this.mostrarTablaCargaAdmin = false;
    //this.agregarClasificacionAgdForm.reset();
  }


  //metodo para mostrar card para ver tabla de mis activos
  showCardListado() : void{
    this.mostrarSkeletonTablaAdmin = false;
    this.mostrarCardListadoAdmin = false; 
    this.mostrarTablaCargaAdmin = false;
    this.mostrarTablaCarga = false;
    this.mostrarCardAgregar = false;
    this.mostrarCardListado = true;
    this.mostrarCardEditar = false;
  
    this.mostrarSkeletonTabla = true;
  

      let datosUsuario : Usuario = new Usuario();
    
      datosUsuario = this.user;

      this.gestionActFijo.getMisActivos(datosUsuario).subscribe(
        data => {
          this.listOfData = data;
          this.mostrarTablaCarga = true;
          this.mostrarSkeletonTabla = false;
        });

   
  
  }

   //metodo para mostrar card para ver tabla de mis activos
   showCardListadoAdminActivos() : void{
    this.mostrarTablaCarga = false;
    this.mostrarCardAgregar = false;
    this.mostrarCardEditar = false;
    this.mostrarCardListado = false;
    this.mostrarCardEditar = false;
    this.validarPPYE = false;
  
    this.mostrarTablaCargaAdmin = false;
    this.mostrarSkeletonTablaAdmin = true;
    this.mostrarCardListadoAdmin = true; 

    this.gestionActFijo.getActivosAdmin().subscribe(
      data => {
        this.listOfDataAdmin = data;
        this.mostrarTablaCargaAdmin = true;
        this.mostrarSkeletonTablaAdmin = false;
      });
  
  }

  //metodo para filtrar modelos por marca seleccionada

  public filtrarModelos(){
    let datosmarcaActivo : Marcasactivo = new Marcasactivo();

    datosmarcaActivo = this.altaActivoForm.value;
  
  this.modelosactivo.getModelosByMarca(datosmarcaActivo).subscribe(
    data => {
      this.objModelosActivos = data;
      this.validarModelo = false;
    });

  }


    //metodo para filtrar municipios por departamento seleccionado

    public filtrarMunicipios(){
      let datosmarcaActivo : Marcasactivo = new Marcasactivo();
  
      datosmarcaActivo = this.altaActivoForm.value;
    
    this.gestionActFijo.getMunicipios(datosmarcaActivo).subscribe(
      data => {
        this.objMunicipios = data;
        this.validarDepartamento = false;
      });
  
    }


      //metodo para obtener cuenta contable por codigo_PPYE

      public getCuentaContablePPYE(){
        let datosmarcaActivo : Marcasactivo = new Marcasactivo();
    
        datosmarcaActivo = this.altaActivoForm.value;
      
      this.gestionActFijo.getCuentaContablePPYE(datosmarcaActivo).subscribe(
        data => {
        this.objTipoActivoPPYE = data;
        this.validarPPYE = true;
        });
    
      }

      //metodo para limpiar formulario de altas
      public limpiarFormularioAlta(){
        this.altaActivoForm.reset();
        this.altaActivoForm.controls["departamento"].setValue("0");
        this.altaActivoForm.controls["tipoActivoPPYE"].setValue("0");
        this.altaActivoForm.controls["marcaModelo"].setValue("0");
        this.objTipoActivoPPYE = [];
        this.validarPPYE = false;
      }



  //metodo para guardar alta de activo 

   guardarAltaActivo(){
    let datosActivo : ActfijoGestion = new ActfijoGestion();

    datosActivo = this.altaActivoForm.value;

    this.gestionActFijo.guardarAltaActivo(datosActivo).subscribe(
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
            text: 'Alta registrada con éxito',
            stay: false,
            time: 2, 
            position: 'top' 
          });
        this.showCardListado();
        }
      
    
    );
}


onCurrentPageDataChange(listOfCurrentPageData: ReadonlyArray<ActfijoGestion>) {
  this.listOfCurrentPageData  = listOfCurrentPageData;

}


onCurrentPageDataChangeAdmin(listOfCurrentPageDataAdmin: ReadonlyArray<ActfijoGestion>) {
  this.listOfCurrentPageDataAdmin  = listOfCurrentPageDataAdmin;

}

}
