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
        'getCuentas'
    ];
}
