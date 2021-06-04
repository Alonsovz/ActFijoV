import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActfijoGestion } from 'src/app/models/actfijo-gestion';
import { ClasificacionAgd } from 'src/app/models/clasificacion-agd';
import { Marcasactivo } from 'src/app/models/marcasactivo';
import { Modelosactivo } from 'src/app/models/modelosactivo';
import { TipoBienVnr } from 'src/app/models/tipo-bien-vnr';
import { TipoDocumentos } from 'src/app/models/tipo-documentos';
import { Tipoactivo } from 'src/app/models/tipoactivo';
import { Usuario } from 'src/app/models/usuario';
import { ActfijoGestionService } from 'src/app/services/actfijo-gestion.service';
import { ClasficacionAgdService } from 'src/app/services/clasficacion-agd.service';
import { GlobalService } from 'src/app/services/global.service';
import { MarcasactivoService } from 'src/app/services/marcasactivo.service';
import { ModelosactivoService } from 'src/app/services/modelosactivo.service';
import { TipoBienVnrService } from 'src/app/services/tipo-bien-vnr.service';
import { TipoDocumentosService } from 'src/app/services/tipo-documentos.service';
import { TipoactivoService } from 'src/app/services/tipoactivo.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import notie from 'notie';
import * as $ from 'jquery';
import { DescripcionActivo } from 'src/app/models/descripcion-activo';
import { DescripcionActivoService } from 'src/app/services/descripcion-activo.service';
import { HttpClient } from '@angular/common/http';
import { UbicacionFisicaService } from 'src/app/services/ubicacion-fisica.service';
import { UbicacionEspecificaService } from 'src/app/services/ubicacion-especifica.service';
import { Ubicacion } from 'src/app/models/ubicacion';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-activos-admin',
  templateUrl: './activos-admin.component.html',
  styleUrls: ['./activos-admin.component.scss']
})
export class ActivosAdminComponent implements OnInit {
  actFijoOb: ActfijoGestion = new ActfijoGestion();
  mostrarSkeleton = true;
  datosCargados = false;
  mostrarCardListadoAdmin = false;
  mostrarSkeletonTablaAdmin = false;
  mostrarTablaCargaAdmin = false;
  mostrarCardAgregar = false;
  frm_activoBaja : FormGroup;
  frm_activoTraslado : FormGroup;
  objUsuarios : Usuario[];
  user: Usuario = new Usuario();
  texto: any;
  texto2: any;
  objTipoActivosTbl : Tipoactivo[];
  objTipoBienVNR : TipoBienVnr[];
  objClasificacionAgd : ClasificacionAgd[];
  objMarcasActivosTbl : Marcasactivo[];
  objTipoDocumentosTbl : TipoDocumentos[];
  objCuentasHijas : ActfijoGestion[];
  objCuentasHijasEdicion: ActfijoGestion[];
  objModelosActivos : Modelosactivo[];
  objCCostoBien : ActfijoGestion[];
  objBodegas : ActfijoGestion[];
  objProveedores :  ActfijoGestion[];
  objTipoPartida : ActfijoGestion[];
  objDepartamentos : ActfijoGestion[];
  objMunicipios : ActfijoGestion[];
  objTipoActivoPPYE : ActfijoGestion[];
  objTipoActivoPPYEdicion : ActfijoGestion[];
  objUbicacionFisica: Ubicacion[];
  objUbicacionEspecifica : Ubicacion[];
  conteoAltas = 0;
  conteoBajas = 0;
  conteoTraslados = 0;
  conteoAltasPen = 0;
  conteoBajasPen = 0;
  conteoTrasladosPen = 0;
  conteoAltasVNR = 0;
  conteoBajasVNR = 0;
  conteoTrasladosVNR = 0;
  listaAltasAdminObj: ReadonlyArray<ActfijoGestion> = [];
  listaAltasAdmin: ReadonlyArray<ActfijoGestion> = [];
  listaTrasladosAdminObj: ReadonlyArray<ActfijoGestion> = [];
  listaTrasladosAdmin: ReadonlyArray<ActfijoGestion> = [];
  listaBajasAdmin: ReadonlyArray<ActfijoGestion> = [];
  listaBajasAdminObj: ReadonlyArray<ActfijoGestion> = [];
  listaAltasPendienteAdmin : ReadonlyArray<ActfijoGestion> = [];
  listaAltasPendienteAdminObj :ReadonlyArray<ActfijoGestion> = [];
  listaTrasladosPendienteAdmin :ReadonlyArray<ActfijoGestion> = [];
  listaTrasladosPendienteAdminObj: ReadonlyArray<ActfijoGestion> = [];
  listaBajasPendienteAdminObj: ReadonlyArray<ActfijoGestion> = [];
  listaBajasPendienteAdmin: ReadonlyArray<ActfijoGestion> = [];
  listaConteo : ActfijoGestion[];
  btnFinalizarBajasAdmin = false;
  btnFinalizarTrasladosAdmin = false;
  descActivos : DescripcionActivo[];
  modalDetallesActivo = false;
 
  editarActivoForm : FormGroup;
  datosCargadosEditar = false;
  validarPPYE = false;
  validarPPYEdicion = false;
  validarDepartamento = true;
  validarModelo = true;
  listOfCurrentPageDataHistorial: ReadonlyArray<ActfijoGestion> = [];
  vista: string;
  modalListadoActivosBaja = false;
  modalListadoActivosTraslados = false;
  trasladoActivoForm : FormGroup;
  modalActivacionVisible = false;
  altaActivoForm : FormGroup;

  modalElegirMismoDocumento = false;
  modalFinalizarProcesoBaja = false;
  bajaActivoFormAdmin : FormGroup;

  mostrarCardListadoAdminVNR = false;
  mostrarSkeletonTablaAdminVNR = false;
  mostrarTablaCargaAdminVNR = false;
  listaAltasAdminObjVNR : ReadonlyArray<ActfijoGestion> = [];
  listaTrasladosAdminObjVNR: ReadonlyArray<ActfijoGestion> = [];
  listaBajasAdminObjVNR: ReadonlyArray<ActfijoGestion> = [];

  editObj:  ActfijoGestion = new ActfijoGestion();
  descripcionActivo :  ActfijoGestion = new ActfijoGestion();
  descripcionActivoEdicion :  ActfijoGestion = new ActfijoGestion();
  imagen:  File;
  rutaFile : string;
  actFijoObDoc: string;
 adjuntoVer : SafeResourceUrl;
  extension : string;
 modalVerArchivo = false;

  constructor(private tipoActivo: TipoactivoService, private tipoBienVnr: TipoBienVnrService,
    private clasificacionAgd: ClasficacionAgdService, private marcasActivo: MarcasactivoService,
    private tipodocumentoservice: TipoDocumentosService, private modelosactivo: ModelosactivoService,
    private gestionActFijo: ActfijoGestionService, private usuario: UsuariosService,
    private urlBackEnd: GlobalService, private fbBajasAct: FormBuilder,  private fbTrasladosAct: FormBuilder,
    private descActivosService : DescripcionActivoService,  private http: HttpClient,
    private ubicacionFisicaService: UbicacionFisicaService,
    private ubicacionEspecificaService: UbicacionEspecificaService,  public sanitizer: DomSanitizer) {
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
        'cuenta_hija' : new FormControl(''),
        'compraSivaFormat': new FormControl('',[Validators.required]),
        'valorResidualFormat': new FormControl(''),
        'valorVNRFormat': new FormControl(''),
        'siglas': new FormControl(''),
        'tipo_bien': new FormControl(''),
        'solo_vnr': new FormControl(''),
        'aplica_contabilidad': new FormControl(''),
        'vidaUtilFinanciera': new FormControl(''),
        'tipo_carga': new FormControl(''),
      });

      this.trasladoActivoForm = new FormGroup({
        'usuarioTrasladoNuevo': new FormControl('',[Validators.required]),
      });

      this.altaActivoForm = new FormGroup({
        'tipoDocumento': new FormControl('',[Validators.required]),
        'numeroDocumento': new FormControl('',[Validators.required]),
        'codigoVNR': new FormControl(''),
        imagenDoc: new FormControl(''),
        'codigoContable': new FormControl(''),
        'codigo_ppye' : new FormControl('0',[Validators.required]),
        'fechaRegistro': new FormControl(''),
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
        'codigo_asignado': new FormControl('',[Validators.required]),
        'cuentaHija' : new FormControl(''),
        'vidaUtilFinanciera': new FormControl(''),
      });
  
      this.bajaActivoFormAdmin = new FormGroup({
        'motivoBajaInput': new FormControl('',[Validators.required]),
      });

     }

  ngOnInit(): void {
    this.frm_activoBaja = this.fbBajasAct.group({actSeleccionadosBajas: this.fbBajasAct.array([]),});
    this.rutaFile = this.urlBackEnd.getUrlBackEnd()+'descargarArchivo?ruta=';

    this.frm_activoTraslado = this.fbTrasladosAct.group({actSeleccionadosTraslados: this.fbTrasladosAct.array([]),});

    this.usuario.getUsuarios().subscribe(data => {this.objUsuarios = data;});

    this.user = JSON.parse(localStorage.getItem("usuario_af"));

    this.showCardListadoAdminActivos();
    
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

    this.mostrarSkeleton = false;
    this.datosCargados = true;

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

  //metodo para paginación de tabla de altas de activo para administador
paginacionTablaAltasAdmin(listaAltasAdmin: ReadonlyArray<ActfijoGestion>) {
  this.listaAltasAdmin  = listaAltasAdmin;
}


//metodo para obtener listado de altas para usuario administrador
getAltasAdmin(){
  this.mostrarTablaCargaAdmin = false;
      this.mostrarSkeletonTablaAdmin = true;
  this.gestionActFijo.getAltasAdmin().subscribe(
    data => {
      this.listaAltasAdminObj = data;
      this.mostrarTablaCargaAdmin = true;
      this.mostrarSkeletonTablaAdmin = false;
    });
    this.conteoAdmin();
}



//metodo para obtener listado de traslados para usuario administrador
getTrasladosAdmin(){
  this.mostrarTablaCargaAdmin = false;
      this.mostrarSkeletonTablaAdmin = true;

  this.gestionActFijo.getTrasladosAdmin().subscribe(
    data => {
      this.listaTrasladosAdminObj = data;
      this.mostrarTablaCargaAdmin = true;
      this.mostrarSkeletonTablaAdmin = false;
    });
    this.conteoAdmin();
}

//metodo para paginación de tabla de traslados de activo para administador
paginacionTablaTrasladoAdmin(listaTrasladosAdmin: ReadonlyArray<ActfijoGestion>) {
  this.listaTrasladosAdmin  = listaTrasladosAdmin;

}



//metodo para paginación de tabla de abajas de activo para administador
paginacionTablaBajasAdmin(listaBajasAdmin: ReadonlyArray<ActfijoGestion>) {
  this.listaBajasAdmin  = listaBajasAdmin;

}

//metodo para obtener listado de bajas para usuario administrador

getBajasAdmin(){
  this.mostrarTablaCargaAdmin = false;
      this.mostrarSkeletonTablaAdmin = true;

  this.gestionActFijo.getBajasAdmin().subscribe(
    data => {
      this.listaBajasAdminObj = data;
      this.mostrarTablaCargaAdmin = true;
      this.mostrarSkeletonTablaAdmin = false;
    });
    this.conteoAdmin();
}


//metodo para paginación de tabla de altas pendientes de activo para administador
paginacionTablaAltasPendientesAdmin(listaAltasPendienteAdmin: ReadonlyArray<ActfijoGestion>) {
  this.listaAltasPendienteAdmin  = listaAltasPendienteAdmin;

}

//metodo para obtener listado de altas pendientes para usuario administrador

getAltasPendientesAdmin(){
  this.mostrarTablaCargaAdmin = false;
      this.mostrarSkeletonTablaAdmin = true;
  this.gestionActFijo.getAltasPendientesAdmin().subscribe(
    data => {
      this.listaAltasPendienteAdminObj = data;
      this.mostrarTablaCargaAdmin = true;
      this.mostrarSkeletonTablaAdmin = false;
    });
    this.conteoAdmin();
}


//metodo para paginación de tabla de traslados pendientes de activo para administador
paginacionTablaTrasladoPendienteAdmin(listaTrasladosPendienteAdmin: ReadonlyArray<ActfijoGestion>) {
  this.listaTrasladosPendienteAdmin  = listaTrasladosPendienteAdmin;

}

//metodo para obtener listado de traslados pendiente para usuario administrador
getTrasladosPendientesAdmin(){
  this.mostrarTablaCargaAdmin = false;
      this.mostrarSkeletonTablaAdmin = true;

  this.gestionActFijo.getTrasladosPendientesAdmin().subscribe(
    data => {
      this.listaTrasladosPendienteAdminObj = data;
      this.mostrarTablaCargaAdmin = true;
      this.mostrarSkeletonTablaAdmin = false;
    });
    this.conteoAdmin();
}


//metodo para paginación de tabla de bajas pendientes de activo para administador
paginacionTablaBajasPendienteAdmin(listaBajasPendienteAdmin: ReadonlyArray<ActfijoGestion>) {
  this.listaBajasPendienteAdmin  = listaBajasPendienteAdmin;

}

//metodo para obtener listado de bajas pendientes para usuario administrador

getBajasPendientesAdmin(){
  this.mostrarTablaCargaAdmin = false;
      this.mostrarSkeletonTablaAdmin = true;

  this.gestionActFijo.getBajasPendientesAdmin().subscribe(
    data => {
      this.listaBajasPendienteAdminObj = data;
      this.mostrarTablaCargaAdmin = true;
      this.mostrarSkeletonTablaAdmin = false;
    });
    this.conteoAdmin();
}



//metodo para obtener conteo de badges administrador
conteoAdmin(){
  this.gestionActFijo.getConteoAdmin().subscribe(
    data => {
      this.listaConteo = data;

      data.forEach(element => {
        this.conteoAltas = Number(element["conteoAltas"]);
        this.conteoBajas = Number(element["conteoBajas"]);
        this.conteoTraslados = Number(element["conteoTraslados"]);
        this.conteoAltasPen = Number(element["conteoAltasPen"]);
        this.conteoBajasPen = Number(element["conteoBajasPen"]);
        this.conteoTrasladosPen = Number(element["conteoTrasladosPen"]);
      });
  });

  

  this.btnFinalizarTrasladosAdmin = false;
  this.btnFinalizarBajasAdmin = false;
}

   //metodo para mostrar card para ver tabla de mis activos
showCardListadoAdminActivos() : void{
  this.mostrarCardAgregar = false;
  this.validarPPYE = false;
  this.mostrarSkeletonTablaAdmin = true;
  this.mostrarCardListadoAdmin = true;
  this.mostrarCardListadoAdminVNR = false;
  this.getAltasAdmin();
  this.conteoAdmin();

}

 //metodo para mostrar card para alta de activo

 showCardAgregar() : void{
  this.altaActivoForm.reset();
  this.mostrarCardListadoAdminVNR = false;
  this.mostrarCardAgregar = true;
  this.validarPPYE = false;
  this.mostrarSkeletonTablaAdmin = false;
  this.mostrarCardListadoAdmin = false;
  this.mostrarTablaCargaAdmin = false;
}


//arreglo de activos para traslado
get actSeleccionadosTraslados(){
  return this.frm_activoTraslado.get('actSeleccionadosTraslados') as FormArray;
}

//arreglo de activos para baja
get actSeleccionadosBajas(){
  return this.frm_activoBaja.get('actSeleccionadosBajas') as FormArray;
}


  
//metodo para mostrar card de edición de activo
editarActFijo(act, vis ,archivo){
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


    this.gestionActFijo.getCuentasHijas(act).subscribe(
      data => {
        this.objCuentasHijas = data;
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

 //metodo para obtener cuenta contable por codigo_PPYE

 public getCuentaContablePPYE(){
  let datosmarcaActivo : Marcasactivo = new Marcasactivo();

  datosmarcaActivo = this.altaActivoForm.value;

this.gestionActFijo.getCuentaContablePPYE(datosmarcaActivo).subscribe(
  data => {
  this.objTipoActivoPPYE = data;
  this.validarPPYE = true;
  });

  this.gestionActFijo.getCuentasHijasPPYE(datosmarcaActivo).subscribe(
    data => {
      this.objCuentasHijas = data;
    });

  //this.getActivoName();
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

  this.gestionActFijo.getCuentasHijasPPYE(datosmarcaActivo).subscribe(
    data => {
      this.objCuentasHijasEdicion = data;
    });

this.gestionActFijo.getCuentaContablePPYE(datosmarcaActivo).subscribe(
  data => {
  this.objTipoActivoPPYEdicion = data;
  this.validarPPYEdicion = true;
  });



  //this.getActivoNameEdicion();
}


//metodo para paginación de tabla de todos los activos
onCurrentPageDataChangeHistorial(listOfCurrentPageDataHistorial: ReadonlyArray<ActfijoGestion>) {
  this.listOfCurrentPageDataHistorial  = listOfCurrentPageDataHistorial;

}
//metodo para cerrar edición de activo ser
cerrarCardEditar(){
  this.modalDetallesActivo = false;
}


 //metodo para guardar edición de activo

 guardarEdicionActivo(){
  let datosActivo : ActfijoGestion = new ActfijoGestion();
  var soloVNR = '';
  var soloConta = '';


  datosActivo = Object.assign(this.editarActivoForm.value, this.user);

  this.gestionActFijo.guardarEdicionActivoAdmin(datosActivo).subscribe(
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

        this.conteoAdmin();
        this.getBajasPendientesAdmin();
        this.getBajasPendientesAdmin();
        this.getTrasladosAdmin();
        this.getTrasladosPendientesAdmin();
        this.getAltasAdmin();
        this.getAltasPendientesAdmin();
        this.conteoAdminVNR();
        this.getAltasAdminVNR();
        this.getTrasladosAdminVNR();
        this.getBajasAdminVNR();
      }


  );
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
    this.btnFinalizarBajasAdmin = true;
  }else{
    this.btnFinalizarBajasAdmin = false;
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

      this.conteoAdmin();
      this.getTrasladosAdmin();
      this.getAltasAdmin();
    this.modalListadoActivosBaja = false;
    this.generarHojaActivoBaja();
    }
  );
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
    this.btnFinalizarTrasladosAdmin = true;
  }else{
    this.btnFinalizarTrasladosAdmin = false;
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



//metodo para enviar listado de traslados
guardarTrasladoListado(){
  let datosActivo : ActfijoGestion = new ActfijoGestion();

  datosActivo = Object.assign(this.frm_activoTraslado.value, this.user, this.trasladoActivoForm.value);

  console.log(datosActivo);
  
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
        this.conteoAdmin();
        this.getTrasladosAdmin();
        this.getAltasAdmin();
      this.modalListadoActivosTraslados = false;
      this.generarHojaTrasladoActivo();
      }


  );
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

      this.conteoAdmin();
      this.getTrasladosAdmin();
      this.getAltasAdmin();
    this.modalListadoActivosTraslados = false;
    this.generarHojaTrasladoActivo();
    }
  );
}



//metodo para mostrar modal de confirmación para activar artículo
confimarActivacion(actFijo) : void{
  this.modalActivacionVisible = true;

  this.actFijoOb = actFijo;
}


//metodo para cancelar activación de artículo
cerrarModalActivacion(){
  this.modalActivacionVisible = false;
}


//metodo para guardar activación de artículo
guardarActivacion(){

  let datosActivo : ActfijoGestion = new ActfijoGestion();

  datosActivo = Object.assign(this.actFijoOb, this.user);

  this.gestionActFijo.guardarActivacionActivo(datosActivo).subscribe(
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
          text: 'Artículo activo con éxito',
          stay: false,
          time: 2,
          position: 'top'
        });
      this.getAltasPendientesAdmin();
      this.conteoAdmin();
      this.modalActivacionVisible = false;
      }


  );

}



  //metodo para guardar alta de activo

  guardarAltaActivo(){
    let datosActivo : ActfijoGestion = new ActfijoGestion();

    datosActivo = this.altaActivoForm.value;

    this.gestionActFijo.guardarAltaActivoAdmin(datosActivo).subscribe(
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


// generar hoja de activo
// generar hoja de activo
generarHojaActivo() {
  var doc = this.altaActivoForm.controls["numeroDocumento"].value;

  const ur =  this.urlBackEnd.getUrlBackEnd() + 'generarHojaActivo?doc=' + doc;
  this.altaActivoForm.reset();
  window.open(ur, '_blank');

}

//función para no ingresar otro activo sobre el mismo documento

finalizarSoloUno(){
  this.generarHojaActivo();
  this.showCardListadoAdminActivos();
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


// mostrar modal para aceptacion de la finalizacion del proceso de baja
mostrarModalFinalizarProcesoBaja(obj) {
  this.modalFinalizarProcesoBaja = true;
  this.actFijoOb = obj;
}


// cerrar modal para el proceso de finalizacion del activo
cerrarModalFinalizarProcesoBaja(){
  this.modalFinalizarProcesoBaja = false;
}


// finalizar proceso de baja por parte del administrador
finalizarProcesoBaja() {

  let datosActivo : ActfijoGestion = new ActfijoGestion();
  datosActivo = Object.assign(this.bajaActivoFormAdmin.value, this.actFijoOb, this.user);

  this.gestionActFijo.finalizarProcesoBaja(datosActivo).subscribe(
    response =>{},
    err => {
      notie.alert({
        type: 'error',
        text: 'Error al finalizar proceso de baja',
        stay: false,
        time: 4,
        position: 'top'
      });
    },
    () => {
      notie.alert({
        type: 'success',
        text: 'Proceso de baja finalizado con exito',
        stay: false,
        time: 4,
        position: 'top'
      });
      this.conteoAdmin();
      this.getBajasPendientesAdmin();

      this.modalFinalizarProcesoBaja = false;
    }
  )

}

_texto:string;
ConvertToLower(evt) {
    this.texto = evt.toLowerCase();
}


_texto2:string;
ConvertToLower2(evt) {
    this.texto2 = evt.toLowerCase();
}


showCardListadoAdminActivosVNR(){
  this.mostrarCardListadoAdminVNR = true;

  this.mostrarCardAgregar = false;
  this.validarPPYE = false;
  this.mostrarSkeletonTablaAdmin = false;
  this.mostrarCardListadoAdmin = false;
  this.getAltasAdminVNR();
}


getAltasAdminVNR(){
  this.mostrarTablaCargaAdminVNR = false;
  this.mostrarSkeletonTablaAdminVNR = true;
this.gestionActFijo.getAltasAdminVNR().subscribe(
data => {
  this.listaAltasAdminObjVNR = data;
  this.mostrarTablaCargaAdminVNR = true;
  this.mostrarSkeletonTablaAdminVNR = false;
});
this.conteoAdminVNR();
}


//metodo para obtener conteo de badges administrador
conteoAdminVNR(){
  this.gestionActFijo.getConteoAdminVNR().subscribe(
    data => {
      this.listaConteo = data;

      data.forEach(element => {
        this.conteoAltasVNR = Number(element["conteoAltas"]);
        this.conteoBajasVNR = Number(element["conteoBajas"]);
        this.conteoTrasladosVNR = Number(element["conteoTraslados"]);
      });
  });


}


//metodo para obtener listado de traslados para usuario administrador
getTrasladosAdminVNR(){
  this.mostrarTablaCargaAdminVNR = false;
  this.mostrarSkeletonTablaAdminVNR = true;
  this.gestionActFijo.getTrasladosAdminVNR().subscribe(
    data => {
      this.listaTrasladosAdminObjVNR = data;
      this.mostrarTablaCargaAdminVNR = true;
      this.mostrarSkeletonTablaAdminVNR = false;
    });


    this.conteoAdminVNR();
}


getBajasAdminVNR(){
  this.mostrarTablaCargaAdminVNR = false;
  this.mostrarSkeletonTablaAdminVNR = true;
this.gestionActFijo.getBajasAdminVNR().subscribe(
data => {
  this.listaBajasAdminObjVNR = data;
  this.mostrarTablaCargaAdminVNR = true;
  this.mostrarSkeletonTablaAdminVNR = false;
});
this.conteoAdminVNR();
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
