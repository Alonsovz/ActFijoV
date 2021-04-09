<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;


date_default_timezone_set("America/El_Salvador");

class MarcasActivoController extends Controller
{

    //metodo para obtener listado de roles para mostrar en select de vista de modelos de activo
    //también funciona para obtener objeto de tabla en vista de marcas de activo
    public function getMarcasActivo(){
        $MarcasActivo = 
        DB::connection('comanda')->select("SELECT *
        from af_marcas where estado = 1 order by 2 asc");

        return response()->json($MarcasActivo);
    }

    //metodo para insertar nuevo tipo de activo en base de datos COMANDA
    public function guardarMarcasActivo(Request $request){
        $nombre = $request["nombreMarca"];

        $insertar =  DB::connection('comanda')->table('af_marcas')
        ->insert([
            'nombre_marca' => $nombre,
            'estado'=> 1,
        ]);

        return response()->json($insertar);
    }

     //metodo para editar MarcasActivo
     public function editarMarcaActivo(Request $request){
        $id = $request["codigo_marca"];
        $nombre  = $request["nombre_marca"];

        $editar = DB::connection('comanda')->table('af_marcas')->where('codigo_marca', $id)
        ->update([
            'nombre_marca' => $nombre ,
        ]);

        return response()->json($editar);
    }


     //metodo para eliminar MarcasActivo
     public function eliminarMarcaActivo(Request $request){
        $id = $request["codigo_marca"];

        $editar = DB::connection('comanda')->table('af_marcas')->where('codigo_marca', $id)
        ->update(['estado' => 2 , 
        ]);

        return response()->json($editar);
    }


}

?>