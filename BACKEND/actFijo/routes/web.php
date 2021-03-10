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

//rutas para reportes
Route::post('getCuadroDepreciacionFinancieraMensual', 'ReportesController@getCuadroDepreciacionFinancieraMensual');
Route::post('getCuadroDepreciacionFiscalMensual', 'ReportesController@getCuadroDepreciacionFiscalMensual');
