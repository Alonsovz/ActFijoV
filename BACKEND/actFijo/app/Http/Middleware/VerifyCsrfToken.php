<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;

class VerifyCsrfToken extends BaseVerifier
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        'validarCredenciales',
        'getUsuarios',
        'getRoles',
        'getUsuariosTbl',
        'guardarUsuario',
        'eliminarUsuario',
        'editarUsuario',
        'guardarRol',
        'eliminarRol',
        'editarRol',
        'guardarTipoActivo',
        'getTipoActivo',
        'editarTipoActivo',
        'eliminarTipoActivo',
        'getMarcasActivo',
        'guardarMarcasActivo',
        'editarMarcaActivo',
        'eliminarMarcaActivo',
        'getModelosActivo',
        'guardarModelosActivo',
        'editarModelosActivo',
        'eliminarModelosActivo',
        'getCuentas',
        'getTipoBienVNR',
        'guardarTipoBienVNR',
        'editarTipoBienVNR',
        'eliminarTipoBienVNR',
        'getClasificacionesAgd',
        'guardarClasificacionAgd',
        'editarClasificacionAgd',
        'eliminarClasificacionAgd',
        'guardarTipoDocumento',
        'getTipoDocumentos',
        'editarTipoDocumento',
        'eliminartipodocumento',
        'getModelosByMarca',
        'getCCostoBien',
        'getBodegas',
        'getProveedores',
        'getTipoPartida',
        'getDepartamentos',
        'getMunicipios',
        'getCuentaContablePPYE',
        'getUbicacionFisica',
        'guardarAltaActivo',
        'getMisActivos',
        'getActivosAdmin',
        'guardarActivacionActivo',
        'getHistorialActivo',
        'guardarEdicionActivo',
        'iniciarbajaactivo',
        'guardarTraslado',
        'guardarAceptacionTraslado',
        'finalizacionprocesobaja',
        'getAltasAdmin',
        'getBajasAdmin',
        'getTrasladosAdmin',
        'getAltasPendientesAdmin',
        'getBajasPendientesAdmin',
        'getTrasladosPendientesAdmin',
        'getConteoAdmin',
        'getAltasUser',
        'getBajasUser',
        'getTrasladosRecibidosUser',
        'getTrasladosHechosUser',
        'getAltasPendientesUser',
        'getTrasladosPendientesUser',
        'getBajasPendientesUser',
        'getConteoUser',
        'getTrasladosRecibidosPendientesUser',
        'getTrasladosHechosPendientesUser',
        'generarHojaTrasladoActivo',
        'getBodegasSupervisor',
        'guardarSupervisorBodega',
        'getCuadroDepreciacionFinancieraMensual',
        'getCuadroDepreciacionFiscalMensual',
        'getBajasSupervisor',
        'getTrasladosSupervisor',
        'getAltasSupervisor',
        'getConteoSupervisor',
        'getAltasAdminVNR',
        'getBajasAdminVNR',
        'getTrasladosAdminVNR',
        'getConteoAdminVNR',
        'guardarAltaActivoAdmin',
        'guardarEdicionActivoAdmin',
        'getNameActFijo',
        'generarReporteAGD',
        'getDescActivos',
        'guardarDescActivo',
        'guardarEdicionDescActivo',
        'eliminarDescActivo',
        'getCuentasHijas',
        'getCuentasHijasPPYE',
        'reporte_agd_excel',
        'moveDoc',
        'descargarArchivo',
        'getUbicacionesFisicas',
        'guardarUbicacionFisica',
        'editarUbicacionFisica',
        'eliminarUbicacionFisica',
        'getUbicacionesEspecificas',
        'guardarUbicacionEspecifica',
        'editarUbicacionEspecifica',
        'eliminarUbicacionEspecifica',
        'getAltasSupervisorActivos',
        'getTrasladosSupervisorActivos',
        'getBajasSupervisorActivos',
        'getConteoSupervisorActivos'
    ];
}
