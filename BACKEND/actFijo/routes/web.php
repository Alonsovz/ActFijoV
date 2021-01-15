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
