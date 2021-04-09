<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;


date_default_timezone_set("America/El_Salvador");

class TipoBienVnrController extends Controller
{

    //obtener objeto de tabla en vista de tipos de bien VNR
    public function getTipoBienVNR(){
        $tiposBienVnr = 
        DB::connection('comanda')->select("SELECT * from af_tipo_bien_vnr where estado = 1 order by 2 asc");

        return response()->json($tiposBienVnr);
    }

    //metodo para insertar nuevo tipos de bien VNR en base de datos COMANDA
    public function guardarTipoBienVNR(Request $request){
        $nombre = $request["nombre"];

        $insertar =  DB::connection('comanda')->table('af_tipo_bien_vnr')
        ->insert([
            'nombre_tipo_bien' => $nombre,
            'estado'=> 1,
        ]);

        return response()->json($insertar);
    }

     //metodo para editar TipoBienVNR
     public function editarTipoBienVNR(Request $request){
        $nombre  = $request["nombre_tipo_bien"];
        $id  = $request["codigo_tipo_bien_vnr"];

        $editar = DB::connection('comanda')->table('af_tipo_bien_vnr')->where('codigo_tipo_bien_vnr', $id)
        ->update([
            'nombre_tipo_bien' => $nombre ,
        ]);

        return response()->json($editar);
    }


     //metodo para eliminar TipoBienVNR
     public function eliminarTipoBienVNR(Request $request){
        $id = $request["codigo_tipo_bien_vnr"];

        $editar = DB::connection('comanda')->table('af_tipo_bien_vnr')->where('codigo_tipo_bien_vnr', $id)
        ->update(['estado' => 2 , 
        ]);

        return response()->json($editar);
    }


}

?>