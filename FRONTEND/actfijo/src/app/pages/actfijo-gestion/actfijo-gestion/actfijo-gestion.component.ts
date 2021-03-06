import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { UsuariosService } from 'src/app/services/usuarios.service';
import { GlobalService } from 'src/app/services/global.service';
import * as $ from 'jquery';
import { JsonPipe } from '@angular/common';
import { DescripcionActivoService } from 'src/app/services/descripcion-activo.service';
import { DescripcionActivo } from 'src/app/models/descripcion-activo';
import { HttpClient } from '@angular/common/http';
import { UbicacionFisicaService } from 'src/app/services/ubicacion-fisica.service';
import { Ubicacion } from 'src/app/models/ubicacion';
import { UbicacionEspecificaService } from 'src/app/services/ubicacion-especifica.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-actfijo-gestion',
  templateUrl: './actfijo-gestion.component.html',
  styleUrls: ['./actfijo-gestion.component.scss']
})
export class ActfijoGestionComponent implements OnInit {
  btnFinalizarBajas = false;
  btnFinalizarTraslados = false;
  dateFormat = 'dd/MM/yyyy';
  texto: any;
  texto2: any;
  textoUser: any;
  mostrarCardAgregar = false;
  mostrarCardListado = true;
  mostrarCardEditar = false;
  mostrarSkeletonEditar = false;
  datosCargadosEditar = false;
  mostrarTablaCarga = false;
  mostrarSkeleton = true;
  mostrarSkeletonTabla = true;
  datosCargados = false;
  validarPPYE = false;
  validarPPYEdicion = false;
  validarDepartamento = true;
  validarModelo = true;
  altaActivoForm : FormGroup;
  editarActivoForm : FormGroup;
  trasladoActivoForm : FormGroup;

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
  objTipoActivoPPYEdicion : ActfijoGestion[];
  //objUbicacionFisica : ActfijoGestion[];
  objUbicacionFisica: Ubicacion[];
  objUbicacionEspecifica : Ubicacion[];
  descActivos : DescripcionActivo[];


  actFijoOb: ActfijoGestion = new ActfijoGestion();
  
  listOfData: ReadonlyArray<Usuario> = [];
  listOfCurrentPageData: ReadonlyArray<ActfijoGestion> = [];

  listOfDataAdmin: ReadonlyArray<ActfijoGestion> = [];
  listOfCurrentPageDataAdmin: ReadonlyArray<ActfijoGestion> = [];

  listOfCurrentPageDataHistorial: ReadonlyArray<ActfijoGestion> = [];

  modalActivacionVisible = false;
  modalTrasladoVisible = false;
  modalAceptarTrasladoVisible = false;
  modalElegirMismoDocumento = false;
  user: Usuario = new Usuario();
  objUsuarios : Usuario[];
  vista: string;
  modalBajaConfirmacion = false;
  modalFinalizarProcesoBaja = false;
  modalDetallesActivo = false;



  listaConteo : ActfijoGestion[];


  listaAltasUser:  ReadonlyArray<Usuario> = [];
  listaAltasUserObj:  ReadonlyArray<Usuario> = [];

  listaBajasUser:  ReadonlyArray<Usuario> = [];
  listaBajasUserObj: ReadonlyArray<Usuario> = [];

  listaTrasladosUser: ReadonlyArray<Usuario> = [];
  listaTrasladosUserObj: ReadonlyArray<Usuario> = [];


  listaTrasladosHechosUser : ReadonlyArray<Usuario> = [];
  listaTrasladosHechosUserObj : ReadonlyArray<Usuario> = [];

  listaAltasPendienteUser: ReadonlyArray<Usuario> = [];
  listaAltasPendienteUserObj: ReadonlyArray<Usuario> = [];

  listaBajasPendienteUser: ReadonlyArray<Usuario> = [];
  listaBajasPendienteUserObj: ReadonlyArray<Usuario> = [];

  listaTrasladosPendienteUser: ReadonlyArray<Usuario> = [];
  listaTrasladosPendienteUserObj: ReadonlyArray<Usuario> = [];

  listaTrasladosRecibidosPendientesUser: ReadonlyArray<Usuario> = [];
  listaTrasladosRecibidosPendientesUserObj: ReadonlyArray<Usuario> = [];


  listaTrasladosHechosPendientesUser: ReadonlyArray<Usuario> = [];
  listaTrasladosHechosPendientesUserObj: ReadonlyArray<Usuario> = [];


  conteoAltasUser = 0;
  conteoBajasUser = 0;
  conteoTrasladosRecibidosUser = 0;
  conteoTrasladosHechosUser = 0;
  conteoAltasPenUser = 0;
  conteoBajasPenUser = 0;
  conteoTrasladosPenUser = 0;
  conteoTrasladosRecibidosPendientesRecibir = 0;
  conteoTrasladosHechosPendientesRecibir = 0;
  frm_activoBaja : FormGroup;
  frm_activoTraslado : FormGroup;
  bajaActivoForm : FormGroup;
  bajaActivoFormAdmin : FormGroup;

  modalListadoActivosBaja = false;
  modalListadoActivosTraslados = false;
  descripcionActivoEdicion :  ActfijoGestion = new ActfijoGestion();
  descripcionActivo :  ActfijoGestion = new ActfijoGestion();
  imagen:  File;
  rutaFile : string;
  actFijoObDoc: string;
 adjuntoVer : SafeResourceUrl;
  extension : string;
 modalVerArchivo = false;

  editObj:  ActfijoGestion = new ActfijoGestion();
  
  constructor(private tipoActivo: TipoactivoService, private tipoBienVnr: TipoBienVnrService,
    private clasificacionAgd: ClasficacionAgdService, private marcasActivo: MarcasactivoService,
    private tipodocumentoservice: TipoDocumentosService, private modelosactivo: ModelosactivoService,
    private gestionActFijo: ActfijoGestionService, private usuario: UsuariosService,
    private urlBackEnd: GlobalService, private fbBajasAct: FormBuilder,  private fbTrasladosAct: FormBuilder,
    private descActivosService : DescripcionActivoService,
    private http: HttpClient, private ubicacionFisicaService: UbicacionFisicaService,
    private ubicacionEspecificaService: UbicacionEspecificaService, public sanitizer: DomSanitizer) {

      this.trasladoActivoForm = new FormGroup({
        'usuarioTrasladoNuevo': new FormControl('',[Validators.required]),
      });

      this.bajaActivoForm = new FormGroup({
        'motivoBajaInput': new FormControl('',[Validators.required]),
      });

     

    this.altaActivoForm = new FormGroup({
      'tipoDocumento': new FormControl('',[Validators.required]),
      'numeroDocumento': new FormControl('',[Validators.required]),
      'codigoVNR': new FormControl(''),
      'imagenDoc': new FormControl(''),
      'codigoContable': new FormControl(''),
      'codigo_ppye' : new FormControl('0',[Validators.required]),
      'fechaRegistro': new FormControl(''),
      'cuentaContable': new FormControl('',[Validators.required]),
      'tasaFiscal': new FormControl('',[Validators.required]),
      'tasaFinanciera': new FormControl('',[Validators.required]),
      'vidaUtil': new FormControl('',[Validators.required]),
      'tipoPartida': new FormControl(''),
      'descripcionBien': new FormControl('',[Validators.required]),
      'tipoActivoVNR': new FormControl('',[Validators.required]),
      'areaUbicacionVNR': new FormControl('',[Validators.required]),
      'ccCostoVnr': new FormControl('',[Validators.required]),
      'tipoAgd': new FormControl(''),
      'bodegaAsignada': new FormControl('',[Validators.required]),
      'codigo_marca': new FormControl('0',[Validators.required]),
      'modeloBien': new FormControl('',[Validators.required]),
      'serieBien': new FormControl(''),
      'otrasEspecificaciones': new FormControl('',[Validators.required]),
      'fechaCompra': new FormControl('',[Validators.required]),
      'proveedor': new FormControl('',[Validators.required]),
      'cod_departamento': new FormControl('0',[Validators.required]),
      'municipio': new FormControl('',[Validators.required]),
      'ubicacionFisica': new FormControl('',[Validators.required]),
      'ubicacionEspecifica': new FormControl('',[Validators.required]),
      'estadoActivo' : new FormControl('',[Validators.required]),
      'valorSiva': new FormControl('',[Validators.required]),
      'asignadoA': new FormControl('',[Validators.required]),
      'af_valor_vnr_siva': new FormControl(''),
      'af_valor_residual': new FormControl(''),
      'siglas': new FormControl(''),
      'tipo_bien': new FormControl(''),
      'vidaUtilFinanciera': new FormControl(''),
    });


    this.editarActivoForm = new FormGroup({
      'af_codigo_interno': new FormControl('',[Validators.required]),
      'codigo_tipo_documento': new FormControl('',[Validators.required]),
      'numero_documento': new FormControl('',[Validators.required]),
      'af_codigo_vnr': new FormControl(''),
      'af_codigo_contable': new FormControl(''),
      'codigo_ppye' : new FormControl('0',[Validators.required]),
      'tipo_partida_id': new FormControl('',[Validators.required]),
      'fechaRegistro': new FormControl(''),
      'cuenta_contable': new FormControl('',[Validators.required]),
      'af_tasa_depreciacion_fiscal': new FormControl('',[Validators.required]),
      'af_tasa_depreciacion_financ': new FormControl('',[Validators.required]),
      'af_vida_util': new FormControl('',[Validators.required]),
      'descripcion_bien': new FormControl('',[Validators.required]),
      'codigo_tipo_bien_vnr': new FormControl('',[Validators.required]),
      'area_del_bien_vnr': new FormControl('',[Validators.required]),
      'ccosto_del_bien_vnr': new FormControl('',[Validators.required]),
      'codigo_agd': new FormControl('',[Validators.required]),
      'bodega_id': new FormControl('',[Validators.required]),
      'codigo_marca': new FormControl('0',[Validators.required]),
      'codigo_modelo': new FormControl('',[Validators.required]),
      'af_serie': new FormControl(''),
      'otras_especificaciones': new FormControl('',[Validators.required]),
      'fechaCompra': new FormControl('',[Validators.required]),
      'codigo_proveedor': new FormControl('',[Validators.required]),
      'cod_departamento': new FormControl('0',[Validators.required]),
      'cod_municipio': new FormControl('',[Validators.required]),
      'ubicacion_fisica': new FormControl(''),
      'ubicacion_especifica': new FormControl(''),
      'codigo_asignado': new FormControl('',[Validators.required]),
      'asignado': new FormControl('',[Validators.required]),
      'compraSivaFormat': new FormControl('',[Validators.required]),
      'valorResidualFormat': new FormControl(''),
      'valorVNRFormat': new FormControl(''),
      'siglas': new FormControl(''),
      'tipo_bien': new FormControl(''),
      'vidaUtilFinanciera': new FormControl(''),
      'tipo_carga': new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.frm_activoBaja = this.fbBajasAct.group({actSeleccionadosBajas: this.fbBajasAct.array([]),});
  this.rutaFile = this.urlBackEnd.getUrlBackEnd()+'descargarArchivo?ruta=';

    this.frm_activoTraslado = this.fbTrasladosAct.group({actSeleccionadosTraslados: this.fbTrasladosAct.array([]),});

    this.usuario.getUsuarios().subscribe(data => {this.objUsuarios = data;});

    this.user = JSON.parse(localStorage.getItem("usuario_af"));

     this.getAltasUser();
     this.conteoUser();

  

    this.tipoActivo.getTipoActivo().subscribe(
      data => {
        this.objTipoActivosTbl = data;
    });

    this.tipoBienVnr.getTiposBienVnr().subscribe(
      data => {
        this.objTipoBienVNR = data;
    });

    this.mostrarSkeleton = false;
        this.datosCargados = true;

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


    this.descActivosService.getDescActivos().subscribe(
      data => {
        this.descActivos = data;
      });
      
   

    this.ubicacionFisicaService.getUbicacionesFisicas().subscribe(
      data => {
        this.objUbicacionFisica = data;
        
      });


      this.ubicacionEspecificaService.getUbicacionesEspecificas().subscribe(
        data => {
          this.objUbicacionEspecifica= data;
          
        });

  }


  actualizarListadoMarcas(){
    this.marcasActivo.getMarcasActivo().subscribe(
      data => {
        this.objMarcasActivosTbl = data;
    });
  
  }
  
  actualizarListadoTipoDocs(){
    this.tipodocumentoservice.getTipoDocumentos().subscribe(
      data => {
        this.objTipoDocumentosTbl = data;
    });

  }

  actualizarListadoTipoActivoPPYE(){
    this.tipoActivo.getTipoActivo().subscribe(
      data => {
        this.objTipoActivosTbl = data;
    });

  }

  actualizarListadoTipoActivoVNR(){
    this.tipoBienVnr.getTiposBienVnr().subscribe(
      data => {
        this.objTipoBienVNR = data;
    });
  }

  actualizarListadoDescripcionBien(){
    this.descActivosService.getDescActivos().subscribe(
      data => {
        this.descActivos = data;
      });
  }
  
  actualizarListadoAGD(){
    this.clasificacionAgd.getClasificacionesAgd().subscribe(
      data => {
        this.objClasificacionAgd = data;
    });

  }

   //metodo para mostrar card para alta de activo

   showCardAgregar() : void{
    this.altaActivoForm.reset();
    this.mostrarCardAgregar = true;
    this.mostrarCardListado = false;
    this.validarPPYE = false;

  }


  //metodo para mostrar card para ver tabla de mis activos
  showCardListado() : void{
    
    this.mostrarTablaCarga = false;
    this.mostrarCardAgregar = false;
    this.mostrarCardListado = true;

    this.mostrarSkeletonTabla = true;


  this.getAltasUser();
  this.conteoUser();


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
            text: 'Proceso de alta registrado con éxito, pendiente de activación',
            stay: false,
            time: 4,
            position: 'top'
          });
        this.modalElegirMismoDocumento = true;
        
        }


    );
}

//metodo para paginación de tabla de mis activos
onCurrentPageDataChange(listOfCurrentPageData: ReadonlyArray<ActfijoGestion>) {
  this.listOfCurrentPageData  = listOfCurrentPageData;

}

//metodo para paginación de tabla de todos los activos
onCurrentPageDataChangeAdmin(listOfCurrentPageDataAdmin: ReadonlyArray<ActfijoGestion>) {
  this.listOfCurrentPageDataAdmin  = listOfCurrentPageDataAdmin;

}



//metodo para filtrar municipios por departarmento en edición
public filtrarMunicipiosEdicion(){
  let datosmarcaActivo : Marcasactivo = new Marcasactivo();

  datosmarcaActivo = this.editarActivoForm.value;

this.gestionActFijo.getMunicipios(datosmarcaActivo).subscribe(
  data => {
    this.objMunicipios = data;
    this.validarDepartamento = false;
  });

}

//metodo para filtrar modelos por marca en edición
public filtrarModelosEdicion(){
  let datosmarcaActivo : Marcasactivo = new Marcasactivo();

  datosmarcaActivo = this.editarActivoForm.value;

this.modelosactivo.getModelosByMarca(datosmarcaActivo).subscribe(
  data => {
    this.objModelosActivos = data;
    this.validarModelo = false;
  });

}

//metodo para filtrar cuentas contables en edición
public getCuentaContablePPYEEdicion(){
  let datosmarcaActivo : Marcasactivo = new Marcasactivo();

  datosmarcaActivo = this.editarActivoForm.value;

this.gestionActFijo.getCuentaContablePPYE(datosmarcaActivo).subscribe(
  data => {
  this.objTipoActivoPPYEdicion = data;
  this.validarPPYEdicion = true;
  });
 // this.getActivoNameEdicion();
}


getActivoName(){
  let datos : ActfijoGestion = new ActfijoGestion();

  datos = this.altaActivoForm.value;

  this.gestionActFijo.getNameActFijo(datos).subscribe(
    data => {
    this.descripcionActivo = data;
    
    });
}


getActivoNameEdicion(){
  let datos : ActfijoGestion = new ActfijoGestion();

  datos = this.editarActivoForm.value;

  this.gestionActFijo.getNameActFijo(datos).subscribe(
    data => {
    this.descripcionActivoEdicion = data;
    
    });
}

//metodo para mostrar card de edición de activo
editarActFijo(act, vis, archivo){

   this.editObj = act;
  this.editarActivoForm.reset();


  this.modalDetallesActivo = true;
  this.editarActivoForm.patchValue(act);
  this.datosCargadosEditar = true;

  this.filtrarMunicipiosEdicion();
  this.filtrarModelosEdicion();
  this.getCuentaContablePPYEEdicion();
  this.vista = vis;
 if(archivo === null){
  this.actFijoObDoc = null; 
  }else{
  this.actFijoObDoc = this.rutaFile+archivo; 
  }

  this.gestionActFijo.getHistorialActivo(act).subscribe(
    data => {
      this.listOfCurrentPageDataHistorial = data;
    });
}




//método que obtiene la URL del archivo a ver y valida el tipo de extension
  public verArchivo(archivo){

    var url = this.urlBackEnd.getUrlBackEnd()+'documents/'+archivo+'';
  
    this.adjuntoVer =  this.sanitizer.bypassSecurityTrustResourceUrl(url);

    var ext = archivo.substr(-3);

    this.extension = ext;

    this.modalVerArchivo = true;
    this.modalDetallesActivo = false;
   

  }

  //metodo para cancelar activación de artículo
cerrarModalVerArchivo(){
  this.modalVerArchivo = false;
  this.modalDetallesActivo = true;
}




//metodo para cerrar edición de activo ser
cerrarCardEditar(){
  this.modalDetallesActivo = false;
}


//metodo para paginación de tabla de todos los activos
onCurrentPageDataChangeHistorial(listOfCurrentPageDataHistorial: ReadonlyArray<ActfijoGestion>) {
  this.listOfCurrentPageDataHistorial  = listOfCurrentPageDataHistorial;

}

cerrarModalBajaConfirmacion() {
  this.modalBajaConfirmacion = false;
}

// mostrar modal de inicio de baja para activo
mostrarModalInicioBaja(obj) {
  this.modalBajaConfirmacion = true;
  this.actFijoOb = obj;
}

// iniciar baja
iniciarBaja(id) {
  let datosActivo : ActfijoGestion = new ActfijoGestion();
  datosActivo = Object.assign(this.bajaActivoForm.value,this.actFijoOb, this.user);


 this.gestionActFijo.iniciarBaja(datosActivo).subscribe(
    response => {
      console.log(response);
    },
    err => {
      notie.alert({
        type: 'error',
        text: 'Error al iniciar proceso de baja',
        stay: false,
        time: 4,
        position: 'top'
      });
    },
    () => {
      notie.alert({
        type: 'success',
        text: 'Proceso de baja iniciado con éxito, pendiente de aprobación',
        stay: false,
        time: 4,
        position: 'top'
      });

    this.getBajasUser();
    this.getAltasUser();
    this.getTrasladosRecibidosUser();
    this.getBajasPendientesUser();
    
    this.modalBajaConfirmacion = false;
    this.generarHojaActivoBaja();
    this.conteoUser();
    }
  );



}



//metodo para desplegar modal de traslado de activo

trasladarActivo(actFijo){
this.modalTrasladoVisible = true;
this.actFijoOb = actFijo;
}

//metodo para cancelar traslado de artículo
cerrarModalTraslado(){
  this.modalTrasladoVisible = false;
}

//metodo para guardar traslado de artículo
guardarTraslado(){

  let datosActivo : ActfijoGestion = new ActfijoGestion();

  datosActivo = Object.assign(this.trasladoActivoForm.value,this.actFijoOb);

  this.gestionActFijo.guardarTraslado(datosActivo).subscribe(
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
          text: 'Traslado guardado con éxito, pendiente de aprobación',
          stay: false,
          time: 4,
          position: 'top'
        });

      this.getAltasUser();
      this.getTrasladosRecibidosUser();
      this.conteoUser();
      this.modalTrasladoVisible = false;

      // generar traslado de activo
      this.generarHojaTrasladoActivo();
      }


  );

}

//metodo para desplegar modal de aceptación de traslado
confimarTraslado(actFijo){
  this.modalAceptarTrasladoVisible = true;
this.actFijoOb = actFijo;
}

//metodo para cerrar modal de aceptación de traslado
cerrarModalAceptarTraslado(){
  this.modalAceptarTrasladoVisible = false;
}


cerrarModalActivacion(){
  this.modalBajaConfirmacion = false;
}




// cerrar modal para el proceso de finalizacion del activo
cerrarModalFinalizarProcesoBaja(){
  this.modalFinalizarProcesoBaja = false;
}



// mostrar modal para aceptacion de la finalizacion del proceso de baja
mostrarModalFinalizarProcesoBaja(obj) {
  this.modalFinalizarProcesoBaja = true;
  this.actFijoOb = obj;
}


//metodo para paginación de tabla de ALTAS por usuario
paginacionTablaAltasUser (listaAltasUser: ReadonlyArray<Usuario>) {
  this.listaAltasUser  = listaAltasUser;

}


//metodo para obtener listado de altas por usuario
getAltasUser(){
  this.mostrarTablaCarga = false;
  this.mostrarSkeletonTabla = true;

  let datosUsuario : Usuario = new Usuario();

  datosUsuario = this.user;

  this.gestionActFijo.getAltasUser(datosUsuario).subscribe(
    data => {
      this.listaAltasUserObj = data;
      this.mostrarTablaCarga = true;
      this.mostrarSkeletonTabla = false;
    });

    
 this.conteoUser();
}



//metodo para paginación de tabla de bajas por usuario
paginacionTablaBajasUser(listaBajasUser: ReadonlyArray<Usuario>) {
  this.listaBajasUser  = listaBajasUser;

}

//metodo para obtener listado de bajas por usuario
getBajasUser(){
  this.mostrarTablaCarga = false;
  this.mostrarSkeletonTabla = true;

  let datosUsuario : Usuario = new Usuario();

  datosUsuario = this.user;

  this.gestionActFijo.getBajasUser(datosUsuario).subscribe(
    data => {
      this.listaBajasUserObj = data;
      this.mostrarTablaCarga = true;
      this.mostrarSkeletonTabla = false;
    });

    this.conteoUser();
}


//metodo para paginación de tabla de traslados recibido por usuario
paginacionTablaTrasladosRecbididosUser(listaTrasladosUser: ReadonlyArray<Usuario>) {
  this.listaTrasladosUser  = listaTrasladosUser;

}

//metodo para obtener listado de traslados recibidos por usuario
getTrasladosRecibidosUser(){
  this.mostrarTablaCarga = false;
  this.mostrarSkeletonTabla = true;

  let datosUsuario : Usuario = new Usuario();

  datosUsuario = this.user;

  this.gestionActFijo.getTrasladosRecibidosUser(datosUsuario).subscribe(
    data => {
      this.listaTrasladosUserObj = data;
      this.mostrarTablaCarga = true;
      this.mostrarSkeletonTabla = false;
    });

    
    this.conteoUser();
}



//metodo para paginación de tabla de traslados hechos por usuario
paginacionTablaTrasladosRecibidosUser(listaTrasladosHechosUser: ReadonlyArray<Usuario>) {
  this.listaTrasladosHechosUser  = listaTrasladosHechosUser;

}

//metodo para obtener listado de traslados hechos por usuario
getTrasladosHechosUser(){
  this.mostrarTablaCarga = false;
  this.mostrarSkeletonTabla = true;

  let datosUsuario : Usuario = new Usuario();

  datosUsuario = this.user;

  this.gestionActFijo.getTrasladosHechosUser(datosUsuario).subscribe(
    data => {
      this.listaTrasladosHechosUserObj = data;
      this.mostrarTablaCarga = true;
      this.mostrarSkeletonTabla = false;
    });

    this.conteoUser();
}


//metodo para paginación de tabla de traslados recibidos pedientes de recibir por usuario
paginacionTablaTrasladosRecibidosPendientesUser(listaTrasladosRecibidosPendientesUser: ReadonlyArray<Usuario>) {
  this.listaTrasladosRecibidosPendientesUser  = listaTrasladosRecibidosPendientesUser;

}

//metodo para obtener listado de tabla de traslados recibidos pedientes de recibir por usuario
getTrasladosRecibidosPendientesUser(){
  this.mostrarTablaCarga = false;
  this.mostrarSkeletonTabla = true;

  let datosUsuario : Usuario = new Usuario();

  datosUsuario = this.user;

  this.gestionActFijo.getTrasladosRecibidosPendientesUser(datosUsuario).subscribe(
    data => {
      this.listaTrasladosRecibidosPendientesUserObj = data;
      this.mostrarTablaCarga = true;
      this.mostrarSkeletonTabla = false;
    });

    this.conteoUser();
}


//metodo para paginación de tabla de traslados hechos pedientes de aceptación
paginacionTablaTrasladosHechosPendientesUser(listaTrasladosHechosPendientesUser: ReadonlyArray<Usuario>) {
  this.listaTrasladosHechosPendientesUser  = listaTrasladosHechosPendientesUser;

}
//metodo para obtener objeto de traslados hechos pendientes de aceptación
getTrasladosHechosPendientesUser(){
  this.mostrarTablaCarga = false;
  this.mostrarSkeletonTabla = true;

  let datosUsuario : Usuario = new Usuario();

  datosUsuario = this.user;

  this.gestionActFijo.getTrasladosHechosPendientesUser(datosUsuario).subscribe(
    data => {
      this.listaTrasladosHechosPendientesUserObj = data;
      this.mostrarTablaCarga = true;
      this.mostrarSkeletonTabla = false;
    });

    this.conteoUser();
}

//metodo para paginación de tabla de altas por usuario
paginacionTablaAltasPendientesUser(listaAltasPendienteUser: ReadonlyArray<Usuario>) {
  this.listaAltasPendienteUser  = listaAltasPendienteUser;

}

//metodo para obtener listado de altas pendientes por usuario
getAltasPendientesUser(){
  this.mostrarTablaCarga = false;
  this.mostrarSkeletonTabla = true;

  let datosUsuario : Usuario = new Usuario();

  datosUsuario = this.user;

  this.gestionActFijo.getAltasPendientesUser(datosUsuario).subscribe(
    data => {
      this.listaAltasPendienteUserObj = data;
      this.mostrarTablaCarga = true;
      this.mostrarSkeletonTabla = false;
    });

    this.conteoUser();
}



//metodo para paginación de tabla de bajas pendientes por usuario
paginacionTablaBajasPendientesUser(listaBajasPendienteUser: ReadonlyArray<Usuario>) {
  this.listaBajasPendienteUser  = listaBajasPendienteUser;

}

//metodo para obtener listado de bajas pendientes por usuario
getBajasPendientesUser(){
  this.mostrarTablaCarga = false;
  this.mostrarSkeletonTabla = true;

  let datosUsuario : Usuario = new Usuario();

  datosUsuario = this.user;

  this.gestionActFijo.getBajasPendientesUser(datosUsuario).subscribe(
    data => {
      this.listaBajasPendienteUserObj = data;
      this.mostrarTablaCarga = true;
      this.mostrarSkeletonTabla = false;
    });

    this.conteoUser();
}


//metodo para paginación de tabla de traslados pendiente por usuario
paginacionTablaTrasladosPendientesUser(listaTrasladosPendienteUser: ReadonlyArray<Usuario>) {
  this.listaTrasladosPendienteUser  = listaTrasladosPendienteUser;

}

//metodo para obtener listado de traslados por usuario
getTrasladosPendientesUser(){
  this.mostrarTablaCarga = false;
  this.mostrarSkeletonTabla = true;

  let datosUsuario : Usuario = new Usuario();

  datosUsuario = this.user;

  this.gestionActFijo.getTrasladosPendientesUser(datosUsuario).subscribe(
    data => {
      this.listaTrasladosPendienteUserObj = data;
      this.mostrarTablaCarga = true;
      this.mostrarSkeletonTabla = false;
    });

    this.conteoUser();
}



//metodo para obtener conteo de badges usuario
conteoUser(){
  let datosUsuario : Usuario = new Usuario();

  datosUsuario = this.user;

  this.gestionActFijo.getConteoUser(datosUsuario).subscribe(
    data => {
      data.forEach(element => {
      this.conteoAltasUser = Number(element["conteoAltas"]);
      this.conteoBajasUser = Number(element["conteoBajas"]);
      this.conteoTrasladosRecibidosUser = Number(element["conteoTrasladosRecibidos"]);
      this.conteoTrasladosHechosUser = Number(element["conteoTrasladosHechos"]);
      this.conteoAltasPenUser = Number(element["conteoAltasPen"]);
      this.conteoTrasladosPenUser = Number(element["conteoTrasladosPen"]);
      this.conteoBajasPenUser = Number(element["conteoBajasPen"]);
      this.conteoTrasladosRecibidosPendientesRecibir = Number(element["conteoTrasladosRecibidosPendientesRecibir"]);
      this.conteoTrasladosHechosPendientesRecibir = Number(element["conteoTrasladosHechosPendientesRecibir"]);
    });
  });


  this.btnFinalizarTraslados = false;
  this.btnFinalizarBajas = false;

}



//función para no ingresar otro activo sobre el mismo documento

finalizarSoloUno(){
  this.generarHojaActivo();
  this.showCardListado();
  this.modalElegirMismoDocumento = false;
 
}


//función para generar otro activo sobre el mismo documento

ingresarOtroActivoMismoDoc(){
  this.modalElegirMismoDocumento = false;
  this.altaActivoForm.controls["codigoVNR"].setValue('');
  this.altaActivoForm.controls["codigoContable"].setValue('');
  this.altaActivoForm.controls["tipoPartida"].setValue('');
  this.altaActivoForm.controls["descripcionBien"].setValue('');
  this.altaActivoForm.controls["tipoActivoVNR"].setValue('');
  this.altaActivoForm.controls["areaUbicacionVNR"].setValue('');
  this.altaActivoForm.controls["ccCostoVnr"].setValue('');
  this.altaActivoForm.controls["tipoAgd"].setValue('');
  this.altaActivoForm.controls["bodegaAsignada"].setValue('');
  this.altaActivoForm.controls["codigo_marca"].setValue(0);
  this.altaActivoForm.controls["modeloBien"].setValue(0);
  this.altaActivoForm.controls["serieBien"].setValue('');
  this.altaActivoForm.controls["otrasEspecificaciones"].setValue('');
  this.altaActivoForm.controls["ubicacionFisica"].setValue(0);
  this.altaActivoForm.controls["estadoActivo"].setValue('');
  this.altaActivoForm.controls["valorSiva"].setValue('');

}


_texto:string;
ConvertToLower(evt) {
    this.texto = evt.toLowerCase();
}


_textoUser:string;
ConvertToLowerUser(evt) {
    this.textoUser = evt.toLowerCase();
}


_texto2:string;
ConvertToLower2(evt) {
    this.texto2 = evt.toLowerCase();
}

// generar hoja de activo
generarHojaActivo() {
  var doc = this.altaActivoForm.controls["numeroDocumento"].value;

  const ur =  this.urlBackEnd.getUrlBackEnd() + 'generarHojaActivo?doc=' + doc;
  window.open(ur, '_blank');

}



//arreglo de activos para baja
get actSeleccionadosBajas(){
  return this.frm_activoBaja.get('actSeleccionadosBajas') as FormArray;
}


//seleccionar caso para baja 
seleccionarActBaja(event, obj){
  this.actFijoOb= obj;
  if(event === true){
    this.actSeleccionadosBajas.push(
      this.fbBajasAct.group({
        idActivo:this.actFijoOb.af_codigo_interno,
        descripcion : this.actFijoOb.descripcion_bien,
        motivoBaja: '',
        marca: this.actFijoOb.marcaAf,
        modelo: this.actFijoOb.modeloAf,
        asignado: this.actFijoOb.asignado,
      })
    );
  }else{
    
   $("#btnEliminarActBaja"+this.actFijoOb.af_codigo_interno).click();
  }

  if(this.actSeleccionadosBajas.length > 0){
    this.btnFinalizarBajas = true;
  }else{
    this.btnFinalizarBajas = false;
  }
}

//eliminar elemento del arreglo de los activos para dar de baja
public eliminarActBaja(i){
  this.actSeleccionadosBajas.removeAt(i);
}

//metodo para abrir modal de listado de activos para baja
finalizarListadoBajas(){
  this.modalListadoActivosBaja = true;
}

//metodo para cerrar modal de listado de activos para baja
cerrarModalListaActivoBajas(){
  this.modalListadoActivosBaja = false;
}



// generar hoja de activo
generarHojaActivoBaja() {
  let datosActivo : ActfijoGestion = new ActfijoGestion();
  datosActivo = this.actSeleccionadosBajas.value;

  const ur =  this.urlBackEnd.getUrlBackEnd() + 'getHojaBaja?activo=' + JSON.stringify(datosActivo);
  window.open(ur, '_blank');

  this.frm_activoBaja = this.fbBajasAct.group({actSeleccionadosBajas: this.fbBajasAct.array([]),});
  this.frm_activoTraslado = this.fbTrasladosAct.group({actSeleccionadosTraslados: this.fbTrasladosAct.array([]),});
}

// iniciar baja
iniciarProcesoBajaListado(id) {
  let datosActivo : ActfijoGestion = new ActfijoGestion();
  datosActivo = this.frm_activoBaja.value;



 this.gestionActFijo.iniciarBaja(datosActivo).subscribe(
    response => {
      console.log(response);
    },
    err => {
      notie.alert({
        type: 'error',
        text: 'Error al iniciar proceso de baja',
        stay: false,
        time: 4,
        position: 'top'
      });
    },
    () => {
      notie.alert({
        type: 'success',
        text: 'Proceso de baja iniciado con éxito, pendiente de aprobación',
        stay: false,
        time: 4,
        position: 'top'
      });

    this.getBajasUser();
    this.getAltasUser();
    this.getTrasladosRecibidosUser();
    this.getBajasPendientesUser();
    this.conteoUser();
    this.modalListadoActivosBaja = false;
    this.generarHojaActivoBaja();
    }
  );
}


// finalizar baja admin
finalizarProcesoBajaListado(id) {
  let datosActivo : ActfijoGestion = new ActfijoGestion();

  datosActivo = Object.assign(this.frm_activoBaja.value, this.actFijoOb, this.user);

 

 this.gestionActFijo.finalizarProcesoBaja(datosActivo).subscribe(
    response => {
      console.log(response);
    },
    err => {
      notie.alert({
        type: 'error',
        text: 'Error al iniciar proceso de baja',
        stay: false,
        time: 4,
        position: 'top'
      });
    },
    () => {
      notie.alert({
        type: 'success',
        text: 'Bajas guardadas con éxito',
        stay: false,
        time: 4,
        position: 'top'
      });

    this.getBajasUser();
    this.getAltasUser();
    this.getTrasladosRecibidosUser();
    this.getBajasPendientesUser();
    this.conteoUser();
    this.modalListadoActivosBaja = false;
    this.generarHojaActivoBaja();
    }
  );
}



//arreglo de activos para traslado
get actSeleccionadosTraslados(){
  return this.frm_activoTraslado.get('actSeleccionadosTraslados') as FormArray;
}




//seleccionar caso para baja 
seleccionarActTraslado(event, obj){
  this.actFijoOb= obj;

  if(event === true){
    this.actSeleccionadosTraslados.push(
      this.fbTrasladosAct.group({
        idActivo:this.actFijoOb.af_codigo_interno,
        descripcion : this.actFijoOb.descripcion_bien,
        marca: this.actFijoOb.marcaAf,
        modelo: this.actFijoOb.modeloAf,
        usuarioAnterior: this.actFijoOb.asignado,
      })
    );
  }else{
   $("#btnEliminarActTraslado"+this.actFijoOb.af_codigo_interno).click();
  }

  if(this.actSeleccionadosTraslados.length > 0){
    this.btnFinalizarTraslados = true;
  }else{
    this.btnFinalizarTraslados = false;
  }
}

//eliminar elemento del arreglo de los activos para traslado
public eliminarActTraslado(i){
  this.actSeleccionadosTraslados.removeAt(i);
}

//metodo para abrir modal de listado de activos para traslado
finalizarListadoTraslados(){
  this.modalListadoActivosTraslados = true;
}

cerrarModalListaActivoTraslados(){
  this.modalListadoActivosTraslados = false;
}




// generar hoja de traslado de activo
generarHojaTrasladoActivo() {
  let activo: ActfijoGestion = new ActfijoGestion();
  activo = this.actSeleccionadosTraslados.value;

  var userNuevo = document.getElementById("usuarioTrasladoNuevo").textContent;

  //console.log();
  const ur = this.urlBackEnd.getUrlBackEnd() + 'generarHojaTrasladoActivo?activo=' + JSON.stringify(activo)+'&usuarioNuevo='+userNuevo;

  window.open(ur, '_blank');

  this.frm_activoBaja = this.fbBajasAct.group({actSeleccionadosBajas: this.fbBajasAct.array([]),});
  this.frm_activoTraslado = this.fbTrasladosAct.group({actSeleccionadosTraslados: this.fbTrasladosAct.array([]),});
}



// iniciar proceso de traslado
iniciarProcesoTrasaladoListado(id) {
  let datosActivo : ActfijoGestion = new ActfijoGestion();
  datosActivo =Object.assign(this.trasladoActivoForm.value, this.frm_activoTraslado.value);


  

 this.gestionActFijo.guardarTraslado(datosActivo).subscribe(
    response => {
      console.log(response);
    },
    err => {
      notie.alert({
        type: 'error',
        text: 'Error al iniciar proceso de traslado',
        stay: false,
        time: 4,
        position: 'top'
      });
    },
    () => {
      notie.alert({
        type: 'success',
        text: 'Proceso de traslado iniciado con éxito, pendiente de aprobación',
        stay: false,
        time: 4,
        position: 'top'
      });

    this.getBajasUser();
    this.getAltasUser();
    this.getTrasladosRecibidosUser();
    this.getBajasPendientesUser();
    
    this.modalListadoActivosTraslados = false;
    this.generarHojaTrasladoActivo();
    }
  );
}



//metodo para enviar listado de traslados
guardarTrasladoListado(){
  let datosActivo : ActfijoGestion = new ActfijoGestion();

  datosActivo = Object.assign(this.frm_activoTraslado.value, this.user, this.trasladoActivoForm.value);

  
  this.gestionActFijo.guardarAceptacionTraslado(datosActivo).subscribe(
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
          text: 'Artículo trasladado con éxito',
          stay: false,
          time: 2,
          position: 'top'
        });
      this.getTrasladosRecibidosPendientesUser();
      this.getAltasUser();
      this.modalListadoActivosTraslados = false;
      this.generarHojaTrasladoActivo();
      this.conteoUser();
      }


  );
}



//metodo para aceptar traslado de artículo
guardarAceptacionTraslado(){
  let datosActivo : ActfijoGestion = new ActfijoGestion();

  datosActivo = Object.assign(this.actFijoOb, this.user);

  this.gestionActFijo.guardarAceptacionTraslado(datosActivo).subscribe(
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
          text: 'Artículo trasladado con éxito',
          stay: false,
          time: 2,
          position: 'top'
        });
      this.getTrasladosRecibidosPendientesUser();
      this.getAltasUser();
      this.conteoUser();
      this.modalAceptarTrasladoVisible = false;
      }


  );
}

//validacion del archivo seleccionado
asignarImagen(fileInput: any) {
  this.imagen = <File>fileInput.target.files[0];
  this.subirImagen();
}

subirImagen(){


  const formData = new FormData();
  formData.append('file', this.imagen);

  console.log(formData);

  this.http.post(this.urlBackEnd.getUrlBackEnd() +'moveDoc', formData, {
    reportProgress: true,
    observe: 'events'   
  })
  .subscribe(
    response => {

    },
    err => {
    },
    () => {
    
    });
      


}

}
