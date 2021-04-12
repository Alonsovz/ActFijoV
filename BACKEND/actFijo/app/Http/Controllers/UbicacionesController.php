<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;


date_default_timezone_set("America/El_Salvador");

class UbicacionesController extends Controller
{

      //obtener objeto de tabla ubicaciones fisicas
      public function getUbicacionesFisicas(){
        $obj = 
        DB::connection('comanda')->select("SELECT * from af_ubicacion_fisica where estado = 1 order by 2 asc");

        return response()->json($obj);
    }


        //metodo para insertar nueva ubicacion fisica
    public function guardarUbicacionFisica(Request $request){
            $ubicacion = $request["ubicacion"];
    
            $insertar =  DB::connection('comanda')->table('af_ubicacion_fisica')
            ->insert([
                'ubicacion' => $ubicacion,
                'estado'=> 1,
            ]);
    
            return response()->json($insertar);
    }


      //metodo para editar ubicaciones fisicas
      public function editarUbicacionFisica(Request $request){
        $id = $request["id"];
        $ubicacion  = $request["ubicacion"];

        $editar = DB::connection('comanda')->table('af_ubicacion_fisica')->where('id', $id)
        ->update([
            'ubicacion' => $ubicacion ,
        ]);

        return response()->json($editar);
    }


     //metodo para eliminar ubicaciones fisicas
     public function eliminarUbicacionFisica(Request $request){
        $id = $request["id"];

        $editar = DB::connection('comanda')->table('af_ubicacion_fisica')->where('id', $id)
        ->update(['estado' => 2 , 
        ]);

        return response()->json($editar);
    }



      //obtener objeto de tabla ubicaciones especificas
      public function getUbicacionesEspecificas(){
        $obj = 
        DB::connection('comanda')->select("SELECT * from af_ubicacion_especifica where estado = 1 order by 2 asc");

        return response()->json($obj);
    }


        //metodo para insertar nueva ubicacion especifica
    public function guardarUbicacionEspecifica(Request $request){
            $ubicacion = $request["ubicacion"];
    
            $insertar =  DB::connection('comanda')->table('af_ubicacion_especifica')
            ->insert([
                'ubicacion' => $ubicacion,
                'estado'=> 1,
            ]);
    
            return response()->json($insertar);
    }


      //metodo para editar ubicaciones especifica
      public function editarUbicacionEspecifica(Request $request){
        $id = $request["id"];
        $ubicacion  = $request["ubicacion"];

        $editar = DB::connection('comanda')->table('af_ubicacion_especifica')->where('id', $id)
        ->update([
            'ubicacion' => $ubicacion ,
        ]);

        return response()->json($editar);
    }


     //metodo para eliminar ubicaciones especifica
     public function eliminarUbicacionEspecifica(Request $request){
        $id = $request["id"];

        $editar = DB::connection('comanda')->table('af_ubicacion_especifica')->where('id', $id)
        ->update(['estado' => 2 , 
        ]);

        return response()->json($editar);
    }

}