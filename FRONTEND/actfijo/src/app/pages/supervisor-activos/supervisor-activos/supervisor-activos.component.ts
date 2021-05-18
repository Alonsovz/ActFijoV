import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
import { MarcasactivoService } from 'src/app/services/marcasactivo.service';
import { ModelosactivoService } from 'src/app/services/modelosactivo.service';
import { SupervisorActivosService } from 'src/app/services/supervisor-activos.service';
import { TipoBienVnrService } from 'src/app/services/tipo-bien-vnr.service';
import { TipoDocumentosService } from 'src/app/services/tipo-documentos.service';
import { TipoactivoService } from 'src/app/services/tipoactivo.service';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-supervisor-activos',
  templateUrl: './supervisor-activos.component.html',
  styleUrls: ['./supervisor-activos.component.scss']
})
export class SupervisorActivosComponent implements OnInit {
  mostrarCardBodegas = false;
  mostrarCardActivos = true;

  user : Usuario = new Usuario();
  listaAltasSupervisor: ReadonlyArray<ActfijoGestion> = [];
  listaTrasladosSupervisor: ReadonlyArray<ActfijoGestion> = [];
  listaBajasSupervisor: ReadonlyArray<ActfijoGestion> = [];


  listaAltasSupervisorActivos: ReadonlyArray<ActfijoGestion> = [];
  listaTrasladosSupervisorActivos: ReadonlyArray<ActfijoGestion> = [];
  listaBajasSupervisorActivos: ReadonlyArray<ActfijoGestion> = [];

  mostrarTablaCarga = false;
  mostrarSkeletonTabla = false;
  editarActivoForm : FormGroup;

  listaAltasSupervisorPag:  ReadonlyArray<ActfijoGestion> = [];
  listaTrasladosSupervisorPag:  ReadonlyArray<ActfijoGestion> = [];
  listaBajasSupervisorPag : ReadonlyArray<ActfijoGestion> = [];
  listOfCurrentPageDataHistorial : ReadonlyArray<ActfijoGestion> = [];


  listaAltasSupervisorPagActivos:  ReadonlyArray<ActfijoGestion> = [];
  listaTrasladosSupervisorPagActivos:  ReadonlyArray<ActfijoGestion> = [];
  listaBajasSupervisorPagActivos : ReadonlyArray<ActfijoGestion> = [];


  modalDetallesActivo = false;
  datosCargadosEditar = false;
  objMunicipios : ActfijoGestion[];
  validarDepartamento = true;
  objModelosActivos : Modelosactivo[];
  validarModelo = true;
  objTipoActivoPPYEdicion : ActfijoGestion[];
  validarPPYEdicion = false;
  objDepartamentos : ActfijoGestion[];
  objTipoActivosTbl : Tipoactivo[];
  objTipoBienVNR : TipoBienVnr[];
  objClasificacionAgd : ClasificacionAgd[];
  objMarcasActivosTbl : Marcasactivo[];
  objTipoDocumentosTbl : TipoDocumentos[];
  objCCostoBien : ActfijoGestion[];
  objBodegas : ActfijoGestion[];
  objProveedores :  ActfijoGestion[];
  objTipoPartida : ActfijoGestion[];
  objUbicacionFisica : ActfijoGestion[];
  texto: any;

  conteoAltas = 0;
  conteoBajas = 0;
  conteoTraslados = 0;
  listaConteo : ActfijoGestion[];


  conteoAltasActivos = 0;
  conteoBajasActivos = 0;
  conteoTrasladosActivos = 0;
  listaConteoActivos : ActfijoGestion[];


  constructor(private activosSupervisorService: SupervisorActivosService,
    private tipoActivo: TipoactivoService, private tipoBienVnr: TipoBienVnrService,
    private clasificacionAgd: ClasficacionAgdService, private marcasActivo: MarcasactivoService,
    private tipodocumentoservice: TipoDocumentosService, private modelosactivo: ModelosactivoService,
    private gestionActFijo: ActfijoGestionService) { 

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
    this.user = JSON.parse(localStorage.getItem("usuario"));
 
    this.getAltasSupervisorActivos();
    this.conteoSupervisorActivos();

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
    });
  }

  showCardBodegas(){
    this.mostrarCardActivos = false;
    this.mostrarCardBodegas = true;
    this.mostrarSkeletonTabla = true;
    this.mostrarTablaCarga = false;

    this.getAltasSupervisor();
  }

  
  showCardActivos(){
    this.mostrarCardActivos = true;
    this.mostrarCardBodegas = false;
    this.mostrarSkeletonTabla = true;
    this.mostrarTablaCarga = false;

    this.getAltasSupervisorActivos();
  }

  getAltasSupervisor(){
    this.conteoSupervisor();
    this.mostrarTablaCarga = false;
    this.mostrarSkeletonTabla = true;


    let datos : Usuario = new Usuario();
    datos = this.user;


    this.activosSupervisorService.getAltasSupervisor(datos).subscribe(
      data => {
        this.listaAltasSupervisor = data;
        this.mostrarTablaCarga = true;
        this.mostrarSkeletonTabla = false;
      });
  }


  getTrasladosSupervisor(){
    this.conteoSupervisor();
    this.mostrarTablaCarga = false;
    this.mostrarSkeletonTabla = true;

    let datos : Usuario = new Usuario();
    datos = this.user;


    this.activosSupervisorService.getTrasladosSupervisor(datos).subscribe(
      data => {
        this.listaTrasladosSupervisor = data;

        this.mostrarTablaCarga = true;
        this.mostrarSkeletonTabla = false;
      });
  }

  getBajasSupervisor(){
    this.conteoSupervisor();
    this.mostrarTablaCarga = false;
    this.mostrarSkeletonTabla = true;

    let datos : Usuario = new Usuario();
    datos = this.user;


    this.activosSupervisorService.getBajasSupervisor(datos).subscribe(
      data => {
        this.listaBajasSupervisor = data;
        this.mostrarTablaCarga = true;
        this.mostrarSkeletonTabla = false;
      });
  }


  //metodo para paginación de tabla de ALTAS de supervisor
  paginacionTablaAltasSupervisor (listaAltasSupervisorPag: ReadonlyArray<ActfijoGestion>) {
  this.listaAltasSupervisorPag  = listaAltasSupervisorPag;

}

  //metodo para paginación de tabla de traslados de supervisor
  paginacionTablaTrasladosSupervisor (listaTrasladosSupervisorPag: ReadonlyArray<ActfijoGestion>) {
    this.listaTrasladosSupervisorPag  = listaTrasladosSupervisorPag;
  }

   //metodo para paginación de tabla de bajas de supervisor
   paginacionTablaBajasSupervisor (listaBajasSupervisorPag: ReadonlyArray<ActfijoGestion>) {
    this.listaBajasSupervisorPag  = listaBajasSupervisorPag;
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

  this.gestionActFijo.getHistorialActivo(act).subscribe(
    data => {
      this.listOfCurrentPageDataHistorial = data;
    });
}

//metodo para paginación de tabla de todos los activos
onCurrentPageDataChangeHistorial(listOfCurrentPageDataHistorial: ReadonlyArray<ActfijoGestion>) {
  this.listOfCurrentPageDataHistorial  = listOfCurrentPageDataHistorial;

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

//metodo para cerrar edición de activo ser
cerrarCardEditar(){
  this.modalDetallesActivo = false;
}

_texto:string;
ConvertToLower(evt) {
    this.texto = evt.toLowerCase();
}


//metodo para obtener conteo de badges administrador
conteoSupervisor(){
  let datos : Usuario = new Usuario();
  datos = this.user;
  this.activosSupervisorService.getConteoSupervisor(datos).subscribe(
    data => {
      this.listaConteo = data;

      data.forEach(element => {
        this.conteoAltas = Number(element["conteoAltas"]);
        this.conteoBajas = Number(element["conteoBajas"]);
        this.conteoTraslados = Number(element["conteoTraslados"]);
      });
  });

}



//metodo para obtener conteo de badges administrador
conteoSupervisorActivos(){
  let datos : Usuario = new Usuario();
  datos = this.user;
  this.activosSupervisorService.getConteoSupervisorActivos(datos).subscribe(
    data => {
      this.listaConteoActivos = data;

      data.forEach(element => {
        this.conteoAltasActivos = Number(element["conteoAltas"]);
        this.conteoBajasActivos = Number(element["conteoBajas"]);
        this.conteoTrasladosActivos = Number(element["conteoTraslados"]);
      });
  });

}

getAltasSupervisorActivos(){
  this.conteoSupervisorActivos();
  this.mostrarTablaCarga = false;
  this.mostrarSkeletonTabla = true;


  let datos : Usuario = new Usuario();
  datos = this.user;


  this.activosSupervisorService.getAltasSupervisorActivos(datos).subscribe(
    data => {
      this.listaAltasSupervisorActivos = data;
      this.mostrarTablaCarga = true;
      this.mostrarSkeletonTabla = false;
    });
}

getTrasladosSupervisorActivos(){
  this.conteoSupervisor();
  this.mostrarTablaCarga = false;
  this.mostrarSkeletonTabla = true;

  let datos : Usuario = new Usuario();
  datos = this.user;


  this.activosSupervisorService.getTrasladosSupervisorActivos(datos).subscribe(
    data => {
      this.listaTrasladosSupervisorActivos = data;

      this.mostrarTablaCarga = true;
      this.mostrarSkeletonTabla = false;
    });
}

getBajasSupervisorActivos(){
  this.conteoSupervisor();
  this.mostrarTablaCarga = false;
  this.mostrarSkeletonTabla = true;

  let datos : Usuario = new Usuario();
  datos = this.user;


  this.activosSupervisorService.getBajasSupervisorActivos(datos).subscribe(
    data => {
      this.listaBajasSupervisorActivos = data;
      this.mostrarTablaCarga = true;
      this.mostrarSkeletonTabla = false;
    });
}


  //metodo para paginación de tabla de ALTAS de supervisor
  paginacionTablaAltasSupervisorActivos (listaAltasSupervisorPag: ReadonlyArray<ActfijoGestion>) {
    this.listaAltasSupervisorPagActivos  = listaAltasSupervisorPag;
  
  }
  
    //metodo para paginación de tabla de traslados de supervisor
    paginacionTablaTrasladosSupervisorActivos (listaTrasladosSupervisorPag: ReadonlyArray<ActfijoGestion>) {
      this.listaTrasladosSupervisorPagActivos  = listaTrasladosSupervisorPag;
    }
  
     //metodo para paginación de tabla de bajas de supervisor
     paginacionTablaBajasSupervisorActivos (listaBajasSupervisorPag: ReadonlyArray<ActfijoGestion>) {
      this.listaBajasSupervisorPagActivos  = listaBajasSupervisorPag;
    }
}
