<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;


date_default_timezone_set("America/El_Salvador");

class GestionActivoController extends Controller
{
    //metodo para obtener centro de costos
    public function getCCostoBien(){

        $getCCostoBien = 
        DB::connection('comanda')->select("select * from saf_2011.dbo.estructura11
        where empresa_id = 1");

        return response()->json($getCCostoBien);
    }

    //metodo para obtener las bodegas
    public function getBodegas(){

        $getBodegas = 
        DB::connection('comanda')->select("select * from saf_2011.dbo.inv_bodegas");

        return response()->json($getBodegas);
    }

    //metodo para obtener proveedores
    public function getProveedores(){

        $getProveedores = 
        DB::connection('comanda')->select("select * from saf_2011.dbo.entidad");

        return response()->json($getProveedores);
    }

     //metodo para obtener tipo de partida
     public function getTipoPartida(){

        $getTipoPartida = 
        DB::connection('comanda')->select("select * from saf_2011.dbo.tipo_partida");

        return response()->json($getTipoPartida);
    }


      //metodo para obtener departamentos
      public function getDepartamentos(){

        $getDepartamentos = 
        DB::connection('comanda')->select("select * from DEPSV");

        return response()->json($getDepartamentos);
    }


 //metodo para obtener departamentos
 public function getMunicipios(Request $request){
    $dep = $request["departamento"];

    $getMunicipios = 
    DB::connection('comanda')->select("select * from MUNSV where DEPSV_ID = ".$dep."");

    return response()->json($getMunicipios);
}

 //metodo para obtener departamentos
 public function getCuentaContablePPYE(Request $request){
    $tipoActivo = $request["tipoActivoPPYE"];

    $getCuentaContablePPYE = 
    DB::connection('comanda')->select("SELECT *,LTRIM(str(tasa_fiscal,12,2)) as tasaFiscal,
    LTRIM(str(tasa_financ,12,2)) as tasaFinan
    from af_tipo_ppye
    where cod_ppye = ".$tipoActivo."");

    return response()->json($getCuentaContablePPYE);
}

}


?>