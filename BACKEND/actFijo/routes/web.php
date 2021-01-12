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