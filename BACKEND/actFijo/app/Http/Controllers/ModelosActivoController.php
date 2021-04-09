<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;


date_default_timezone_set("America/El_Salvador");

class ModelosActivoController extends Controller
{

    //metodo para obtener listado de roles para mostrar en select de vista de marcas de activo
    //también funciona para obtener objeto de tabla en vista de marcas de activo
    public function getModelosActivo(){
        $ModelosActivo = 
        DB::connection('comanda')->select("SELECT af.*, am.nombre_marca as marca from af_modelos af
        inner join af_marcas am on am.codigo_marca = af.codigo_marca
        where af.estado = 1 order by 2 asc");

        return response()->json($ModelosActivo);
    }

    //metodo para insertar nuevo modelos de activo en base de datos COMANDA
    public function guardarModelosActivo(Request $request){
        $nombre = $request["nombreModelo"];
        $idMarca = $request["idMarca"];

        $insertar =  DB::connection('comanda')->table('af_modelos')
        ->insert([
            'codigo_marca' => $idMarca,
            'nombre_modelo' => $nombre,
            'estado'=> 1,
        ]);

        return response()->json($insertar);
    }

     //metodo para editar ModelosActivo
     public function editarModelosActivo(Request $request){
        $idMarca = $request["codigo_marca"];
        $nombre  = $request["nombre_modelo"];
        $id  = $request["codigo_modelo"];

        $editar = DB::connection('comanda')->table('af_modelos')->where('codigo_modelo', $id)
        ->update([
            'nombre_modelo' => $nombre ,
            'codigo_marca' => $idMarca ,
        ]);

        return response()->json($editar);
    }


     //metodo para eliminar ModelosActivo
     public function eliminarModelosActivo(Request $request){
        $id = $request["codigo_modelo"];

        $editar = DB::connection('comanda')->table('af_modelos')->where('codigo_modelo', $id)
        ->update(['estado' => 2 , 
        ]);

        return response()->json($editar);
    }


      //metodo para obtener modelos por marcas
      public function getModelosByMarca(Request $request){
        $idMarca = $request["codigo_marca"];

        $ModelosActivo = 
        DB::connection('comanda')->select("select * from af_modelos where codigo_marca = ".$idMarca."
        and estado = 1");

        return response()->json($ModelosActivo);
    }
    


}

?>