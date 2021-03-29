<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use DB;
use Session;
use Response;



date_default_timezone_set("America/El_Salvador");

class DescripcionesActivoController extends Controller
{
     //metodo para obtener descripcion de activos
     public function getDescActivos(){

        $getDescActivos = 
        DB::connection('comanda')->select("select * from af_descripciones_activo where estado = 1
        order by id desc");

        return response()->json($getDescActivos);
    }


     //metodo para insertar nueva descripcion de activos
     public function guardarDescActivo(Request $request){
        $nombre = $request["nombre"];

        $insertar =  DB::connection('comanda')->table('af_descripciones_activo')
        ->insert([
            'nombre' => $nombre,
            'estado' => 1,
        ]);

        return response()->json($insertar);
    }


     //metodo para editar descripcion de activos
     public function guardarEdicionDescActivo(Request $request){
        $id = $request["idDesc"];
        $nombre  = $request["nombre"];

        $editar = DB::connection('comanda')->table('af_descripciones_activo')->where('id', $id)
        ->update([
            'nombre' => $nombre,
        ]);

        return response()->json($editar);
    }

    

    //metodo para eliminar descripcion de activos
    public function eliminarDescActivo(Request $request){
        $id = $request["id"];

        $editar = DB::connection('comanda')->table('af_descripciones_activo')->where('id', $id)
        ->update([
            'estado' => 2,
        ]);

        return response()->json($editar);
    }


}


?>