<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use DB;
use Session;
use Response;



date_default_timezone_set("America/El_Salvador");

class BodegasController extends Controller
{

      //metodo para obtener las bodegas
      public function getBodegasSupervisor(){
        $getBodegas = 
        DB::connection('comanda')->select("select b.bodega_id as idBodega, b.codigo as codigo, b.descripcion as nombre,
        u.alias as supervisor, u.id as idUsuario from saf_2011.dbo.inv_bodegas b
        left join users u on u.id = b.supervisor_id");

        return response()->json($getBodegas);
    }


     //metodo para asignar supervisor
     public function guardarSupervisorBodega(Request $request){
        $id = $request["idBodega"];
        $user = $request["idUsuario"];

        $editar = DB::connection('comanda')->table('saf_2011.dbo.inv_bodegas')->where('bodega_id', $id)
        ->update(['supervisor_id' => $user , 
        ]);

        return response()->json($editar);
    }

    
}

?>