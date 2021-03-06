<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


//rutas para usuarios
Route::post('validarCredenciales', 'UsuarioController@validarCredenciales');
Route::any('getUsuarios', 'UsuarioController@getUsuarios');
Route::any('getUsuariosTbl', 'UsuarioController@getUsuariosTbl');
Route::post('guardarUsuario', 'UsuarioController@guardarUsuario');
Route::post('eliminarUsuario', 'UsuarioController@eliminarUsuario');
Route::post('editarUsuario', 'UsuarioController@editarUsuario');

//rutas para roles
Route::any('getRoles', 'RolesController@getRoles');
Route::post('guardarRol', 'RolesController@guardarRol');
Route::post('eliminarRol', 'RolesController@eliminarRol');
Route::post('editarRol', 'RolesController@editarRol');

//rutas para tipo de activo
Route::any('getTipoActivo', 'TipoActivoController@getTipoActivo');
Route::post('guardarTipoActivo', 'TipoActivoController@guardarTipoActivo');
Route::post('editarTipoActivo', 'TipoActivoController@editarTipoActivo');
Route::post('eliminarTipoActivo', 'TipoActivoController@eliminarTipoActivo');
Route::any('getCuentas', 'TipoActivoController@getCuentas');

//rutas para marcas de activo
Route::any('getMarcasActivo', 'MarcasActivoController@getMarcasActivo');
Route::post('guardarMarcasActivo', 'MarcasActivoController@guardarMarcasActivo');
Route::post('editarMarcaActivo', 'MarcasActivoController@editarMarcaActivo');
Route::post('eliminarMarcaActivo', 'MarcasActivoController@eliminarMarcaActivo');


//rutas para modelos de activo
Route::any('getModelosActivo', 'ModelosActivoController@getModelosActivo');
Route::post('guardarModelosActivo', 'ModelosActivoController@guardarModelosActivo');
Route::post('editarModelosActivo', 'ModelosActivoController@editarModelosActivo');
Route::post('eliminarModelosActivo', 'ModelosActivoController@eliminarModelosActivo');
Route::post('editarModelosActivo', 'ModelosActivoController@editarModelosActivo');
Route::post('getModelosByMarca', 'ModelosActivoController@getModelosByMarca');


//rutas para tipo de Bien VNR
Route::any('getTipoBienVNR', 'TipoBienVnrController@getTipoBienVNR');
Route::post('guardarTipoBienVNR', 'TipoBienVnrController@guardarTipoBienVNR');
Route::post('editarTipoBienVNR', 'TipoBienVnrController@editarTipoBienVNR');
Route::post('eliminarTipoBienVNR', 'TipoBienVnrController@eliminarTipoBienVNR');


//rutas para clasificacion AGD
Route::any('getClasificacionesAgd', 'ClasificacionAgdController@getClasificacionesAgd');
Route::post('guardarClasificacionAgd', 'ClasificacionAgdController@guardarClasificacionAgd');
Route::post('editarClasificacionAgd', 'ClasificacionAgdController@editarClasificacionAgd');
Route::post('eliminarClasificacionAgd', 'ClasificacionAgdController@eliminarClasificacionAgd');


//rutas para tipos de documentos
Route::post('guardarTipoDocumento','TipoDocumentosController@store');
Route::get('getTipoDocumentos', 'TipoDocumentosController@index');
Route::post('editarTipoDocumento', 'TipoDocumentosController@edit');
Route::post('eliminartipodocumento', 'TipoDocumentosController@destroy');


//rutas para supervisores de bodegas
Route::get('getBodegasSupervisor', 'BodegasController@getBodegasSupervisor');
Route::post('guardarSupervisorBodega', 'BodegasController@guardarSupervisorBodega');

//rutas para gestión de activos
Route::get('getCCostoBien', 'GestionActivoController@getCCostoBien');
Route::get('getBodegas', 'GestionActivoController@getBodegas');
Route::get('getProveedores', 'GestionActivoController@getProveedores');
Route::get('getTipoPartida', 'GestionActivoController@getTipoPartida');
Route::get('getDepartamentos', 'GestionActivoController@getDepartamentos');
Route::post('getMunicipios', 'GestionActivoController@getMunicipios');
Route::post('getCuentaContablePPYE', 'GestionActivoController@getCuentaContablePPYE');
Route::get('getUbicacionFisica', 'GestionActivoController@getUbicacionFisica');
Route::post('guardarAltaActivo', 'GestionActivoController@guardarAltaActivo');
Route::post('getMisActivos', 'GestionActivoController@getMisActivos');
Route::get('getActivosAdmin', 'GestionActivoController@getActivosAdmin');
Route::post('guardarActivacionActivo', 'GestionActivoController@guardarActivacionActivo');
Route::post('getHistorialActivo', 'GestionActivoController@getHistorialActivo');
Route::post('guardarEdicionActivo', 'GestionActivoController@guardarEdicionActivo');
Route::post('iniciarbajaactivo', 'GestionActivoController@iniciarBaja');
Route::post('guardarTraslado', 'GestionActivoController@guardarTraslado');
Route::post('guardarAceptacionTraslado', 'GestionActivoController@guardarAceptacionTraslado');
Route::post('finalizacionprocesobaja', 'GestionActivoController@finalizarProcesoBaja');
Route::post('getCuentasHijas', 'GestionActivoController@getCuentasHijas');
Route::post('getCuentasHijasPPYE', 'GestionActivoController@getCuentasHijasPPYE');


Route::get('getAltasAdmin', 'GestionActivoController@getAltasAdmin');
Route::get('getBajasAdmin', 'GestionActivoController@getBajasAdmin');
Route::get('getTrasladosAdmin', 'GestionActivoController@getTrasladosAdmin');
Route::get('getAltasPendientesAdmin', 'GestionActivoController@getAltasPendientesAdmin');
Route::get('getBajasPendientesAdmin', 'GestionActivoController@getBajasPendientesAdmin');
Route::get('getTrasladosPendientesAdmin', 'GestionActivoController@getTrasladosPendientesAdmin');
Route::get('getConteoAdmin', 'GestionActivoController@getConteoAdmin');
Route::post('getAltasUser', 'GestionActivoController@getAltasUser');
Route::post('getBajasUser', 'GestionActivoController@getBajasUser');
Route::post('getTrasladosRecibidosUser', 'GestionActivoController@getTrasladosRecibidosUser');
Route::post('getTrasladosHechosUser', 'GestionActivoController@getTrasladosHechosUser');
Route::post('getAltasPendientesUser', 'GestionActivoController@getAltasPendientesUser');
Route::post('getBajasPendientesUser', 'GestionActivoController@getBajasPendientesUser');
Route::post('getTrasladosPendientesUser', 'GestionActivoController@getTrasladosPendientesUser');
Route::post('getConteoUser', 'GestionActivoController@getConteoUser');

Route::post('getTrasladosRecibidosPendientesUser', 'GestionActivoController@getTrasladosRecibidosPendientesUser');
Route::post('getTrasladosHechosPendientesUser', 'GestionActivoController@getTrasladosHechosPendientesUser');

Route::any('getHojaBaja', 'GestionActivoController@getHojaBaja');
Route::any('generarHojaActivo', 'GestionActivoController@generarHojaActivo');
Route::any('generarHojaTrasladoActivo', 'GestionActivoController@generarHojaTraslado');
Route::post('moveDoc', 'GestionActivoController@moveDoc');
Route::any('descargarArchivo', 'GestionActivoController@descargarArchivo');

//rutas para reportes
Route::post('getCuadroDepreciacionFinancieraMensual', 'ReportesController@getCuadroDepreciacionFinancieraMensual');
Route::post('getCuadroDepreciacionFiscalMensual', 'ReportesController@getCuadroDepreciacionFiscalMensual');
Route::any('getDatosCuadroFiscal', 'ReportesController@getDatosCuadroFiscal');
Route::post('generarReporteAGD', 'ReportesController@generarReporteAGD');
Route::any('reporte_agd_excel', 'ReportesController@reporte_agd_excel');
Route::any('exportar_excel_fiscal', 'ReportesController@exportar_excel_fiscal');
Route::any('exportar_excel_financiera', 'ReportesController@exportar_excel_financiera');





//rutas para supervisor de activos
Route::post('getAltasSupervisor', 'SupervisorActivosController@getAltasSupervisor');
Route::post('getTrasladosSupervisor', 'SupervisorActivosController@getTrasladosSupervisor');
Route::post('getBajasSupervisor', 'SupervisorActivosController@getBajasSupervisor');
Route::post('getConteoSupervisor', 'SupervisorActivosController@getConteoSupervisor');



Route::post('getAltasSupervisorActivos', 'SupervisorActivosController@getAltasSupervisorActivos');
Route::post('getTrasladosSupervisorActivos', 'SupervisorActivosController@getTrasladosSupervisorActivos');
Route::post('getBajasSupervisorActivos', 'SupervisorActivosController@getBajasSupervisorActivos');
Route::post('getConteoSupervisorActivos', 'SupervisorActivosController@getConteoSupervisorActivos');

//rutas para administrador de activos VNR 

Route::get('getAltasAdminVNR', 'AdministradorActivosVNRController@getAltasAdmin');
Route::get('getBajasAdminVNR', 'AdministradorActivosVNRController@getBajasAdmin');
Route::get('getTrasladosAdminVNR', 'AdministradorActivosVNRController@getTrasladosAdmin');
Route::get('getConteoAdminVNR', 'AdministradorActivosVNRController@getConteoAdmin');
Route::post('guardarAltaActivoAdmin', 'GestionActivoController@guardarAltaActivoAdmin');
Route::post('guardarEdicionActivoAdmin', 'GestionActivoController@guardarEdicionActivoAdmin');
Route::post('getNameActFijo', 'GestionActivoController@getNameActFijo');


//rutas para descripciones de activos
Route::get('getDescActivos', 'DescripcionesActivoController@getDescActivos');
Route::post('guardarDescActivo', 'DescripcionesActivoController@guardarDescActivo');
Route::post('guardarEdicionDescActivo', 'DescripcionesActivoController@guardarEdicionDescActivo');
Route::post('eliminarDescActivo', 'DescripcionesActivoController@eliminarDescActivo');


//rutas para ubicaciones 

Route::get('getUbicacionesFisicas', 'UbicacionesController@getUbicacionesFisicas');
Route::post('guardarUbicacionFisica', 'UbicacionesController@guardarUbicacionFisica');
Route::post('editarUbicacionFisica', 'UbicacionesController@editarUbicacionFisica');
Route::post('eliminarUbicacionFisica', 'UbicacionesController@eliminarUbicacionFisica');

Route::get('getUbicacionesEspecificas', 'UbicacionesController@getUbicacionesEspecificas');
Route::post('guardarUbicacionEspecifica', 'UbicacionesController@guardarUbicacionEspecifica');
Route::post('editarUbicacionEspecifica', 'UbicacionesController@editarUbicacionEspecifica');
Route::post('eliminarUbicacionEspecifica', 'UbicacionesController@eliminarUbicacionEspecifica');
