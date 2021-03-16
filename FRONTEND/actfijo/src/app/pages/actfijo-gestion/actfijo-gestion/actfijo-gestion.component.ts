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
  objUbicacionFisica : ActfijoGestion[];

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

  constructor(private tipoActivo: TipoactivoService, private tipoBienVnr: TipoBienVnrService,
    private clasificacionAgd: ClasficacionAgdService, private marcasActivo: MarcasactivoService,
    private tipodocumentoservice: TipoDocumentosService, private modelosactivo: ModelosactivoService,
    private gestionActFijo: ActfijoGestionService, private usuario: UsuariosService,
    private urlBackEnd: GlobalService, private fbBajasAct: FormBuilder,  private fbTrasladosAct: FormBuilder) {

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
      'codigoContable': new FormControl(''),
      'codigo_ppye' : new FormControl('0',[Validators.required]),
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
      'codigo_marca': new FormControl('0',[Validators.required]),
      'modeloBien': new FormControl('',[Validators.required]),
      'serieBien': new FormControl('',[Validators.required]),
      'otrasEspecificaciones': new FormControl('',[Validators.required]),
      'fechaCompra': new FormControl('',[Validators.required]),
      'proveedor': new FormControl('',[Validators.required]),
      'cod_departamento': new FormControl('0',[Validators.required]),
      'municipio': new FormControl('',[Validators.required]),
      'ubicacionFisica': new FormControl('',[Validators.required]),
      'estadoActivo' : new FormControl('',[Validators.required]),
      'valorSiva': new FormControl('',[Validators.required]),
      'asignadoA': new FormControl('',[Validators.required]),
      'af_valor_vnr_siva': new FormControl(''),
      'af_valor_residual': new FormControl(''),
      'siglas': new FormControl(''),
      'tipo_bien': new FormControl(''),
    });


    this.editarActivoForm = new FormGroup({
      'af_codigo_interno': new FormControl('',[Validators.required]),
      'codigo_tipo_documento': new FormControl('',[Validators.required]),
      'numero_documento': new FormControl('',[Validators.required]),
      'af_codigo_vnr': new FormControl(''),
      'af_codigo_contable': new FormControl(''),
      'codigo_ppye' : new FormControl('0',[Validators.required]),
      'tipo_partida_id': new FormControl('',[Validators.required]),
      'fechaRegistro': new FormControl('',[Validators.required]),
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
      'af_serie': new FormControl('',[Validators.required]),
      'otras_especificaciones': new FormControl('',[Validators.required]),
      'fechaCompra': new FormControl('',[Validators.required]),
      'codigo_proveedor': new FormControl('',[Validators.required]),
      'cod_departamento': new FormControl('0',[Validators.required]),
      'cod_municipio': new FormControl('',[Validators.required]),
      'codigo_sucursal': new FormControl('',[Validators.required]),
      'af_valor_compra_siva': new FormControl('',[Validators.required]),
      'codigo_asignado': new FormControl('',[Validators.required]),
      'asignado': new FormControl('',[Validators.required]),
      'af_valor_residual': new FormControl(''),
      'af_valor_vnr_siva': new FormControl(''),
      'siglas': new FormControl(''),
      'tipo_bien': new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.frm_activoBaja = this.fbBajasAct.group({actSeleccionadosBajas: this.fbBajasAct.array([]),});

    this.frm_activoTraslado = this.fbTrasladosAct.group({actSeleccionadosTraslados: this.fbTrasladosAct.array([]),});

    this.usuario.getUsuarios().subscribe(data => {this.objUsuarios = data;});

    this.user = JSON.parse(localStorage.getItem("usuario"));

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

}

//metodo para mostrar card de edición de activo
editarActFijo(act, vis){

  this.editarActivoForm.reset();


  this.modalDetallesActivo = true;
  this.editarActivoForm.patchValue(act);
  this.datosCargadosEditar = true;

  this.filtrarMunicipiosEdicion();
  this.filtrarModelosEdicion();
  this.getCuentaContablePPYEEdicion();
  this.vista = vis;

  this.gestionActFijo.getHistorialActivo(act).subscribe(
    data => {
      this.listOfCurrentPageDataHistorial = data;
    });
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

}
