<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;


date_default_timezone_set("America/El_Salvador");

class ClasificacionAgdController extends Controller
{

    //obtener objeto de tabla en vista de clasificacion AGD
    public function getClasificacionesAgd(){
        $clasficacionesAgd = 
        DB::connection('comanda')->select("SELECT * from af_agd where estado = 1 order by 2 asc");

        return response()->json($clasficacionesAgd);
    }

    //metodo para insertar nuevo clasificacion AGD base de datos COMANDA
    public function guardarClasificacionAgd(Request $request){
        $nombre = $request["nombre"];

        $insertar =  DB::connection('comanda')->table('af_agd')
        ->insert([
            'descripcion_agd' => $nombre,
            'estado'=> 1,
        ]);

        return response()->json($insertar);
    }

     //metodo para editar ClasficacionAgd
     public function editarClasificacionAgd(Request $request){
        $nombre  = $request["descripcion_agd"];
        $id  = $request["codigo_agd"];

        $editar = DB::connection('comanda')->table('af_agd')->where('codigo_agd', $id)
        ->update([
            'descripcion_agd' => $nombre ,
        ]);

        return response()->json($editar);
    }


     //metodo para eliminar ClasficacionAgd
     public function eliminarClasificacionAgd(Request $request){
        $id = $request["codigo_agd"];

        $editar = DB::connection('comanda')->table('af_agd')->where('codigo_agd', $id)
        ->update(['estado' => 2 , 
        ]);

        return response()->json($editar);
    }


}

?>