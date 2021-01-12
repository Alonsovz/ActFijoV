<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;


date_default_timezone_set("America/El_Salvador");

class RolesController extends Controller
{
    //metodo para obtener listado de roles para mostrar en select de vista de usuarios
    //también funciona para obtener objeto de tabla en vista de roles
    public function getRoles(){
        $roles = 
        DB::connection('comanda')->select("SELECT * from af_roles_sistema where estado = 1");

        return response()->json($roles);
    }

     //metodo para guardar rol
     public function guardarRol(Request $request){
        
        $rol = $request["nombreRol"];

        $insertar =  DB::connection('comanda')->table('af_roles_sistema')
        ->insert([
            'rol' => $rol,
            'estado'=> 1,
        ]);

        return response()->json($insertar);
    }


     //metodo para eliminar rol
     public function eliminarRol(Request $request){
        $id = $request["id"];

        $editar = DB::connection('comanda')->table('af_roles_sistema')->where('id', $id)
        ->update(['estado' => 2 , 
        ]);

        return response()->json($editar);
    }

    //metodo para editar rol
    public function editarRol(Request $request){
        $id = $request["id"];
        $rol = $request["rol"];

        $editar = DB::connection('comanda')->table('af_roles_sistema')->where('id', $id)
        ->update(['rol' => $rol , 
        ]);

        return response()->json($editar);
    }
    
}

?>