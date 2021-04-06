<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;


date_default_timezone_set("America/El_Salvador");

class TipoActivoController extends Controller
{

    //metodo para obtener listado de roles para mostrar en select de vista de usuarios
    //también funciona para obtener objeto de tabla en vista de roles
    public function getTipoActivo(){
        $tipoActivo = 
        DB::connection('comanda')->select("SELECT *,
        LTRIM(str(tasa_fiscal,12,2)) as tasaFiscal,
        LTRIM(str(tasa_financ,12,2)) as tasaFinan
        from af_tipo_ppye where estado = 1 order by 1 desc");

        return response()->json($tipoActivo);
    }

    //también funciona para obtener objeto de tabla en vista de roles
    public function getCuentas(){
        $cuenta = DB::connection('comanda')->select("SELECT  cuenta, nombre
        FROM  saf_2011.dbo.catalogo_completo where operable = 'N'
        ORDER BY CUENTA");

        return response()->json($cuenta);
    }

    //metodo para insertar nuevo tipo de activo en base de datos COMANDA
    public function guardarTipoActivo(Request $request){
        $descPPYE = $request["descPPYE"];
        $cuentaContable = $request["cuentaContable"];
        $tasaFiscal = $request["tasaFiscal"];
        $tasaFinanciera = $request["tasaFinanciera"];
        $siglas = $request["siglas"];
        $vidaUtil = $request["vidaUtil"];
        $tipo_bien = $request["tipo_bien"];
        
        $insertar =  DB::connection('comanda')->table('af_tipo_ppye')
        ->insert([
            'descripcion_ppye ' => $descPPYE,
            'cuenta_contable  ' => $cuentaContable,
            'tasa_fiscal  ' => $tasaFiscal,
            'tasa_financ  ' => $tasaFinanciera,
            'siglas' => $siglas,
            'estado'=> 1,
            'vidaUtil' => $vidaUtil,
            'tipo_bien' => $tipo_bien,
        ]);

        return response()->json($insertar);
    }

     //metodo para editar tipoActivo
     public function editarTipoActivo(Request $request){
        $id = $request["cod_ppye"];
        $descripcion_ppye  = $request["descripcion_ppye"];
        $cuenta_contable  = $request["cuenta_contable"];
        $tasa_fiscal  = $request["tasa_fiscal"];
        $tasa_financ  = $request["tasa_financ"];
        $siglas = $request["siglas"];
        $vidaUtil = $request["vidaUtil"];
        $tipo_bien = $request["tipo_bien"];

        $editar = DB::connection('comanda')->table('af_tipo_ppye')->where('cod_ppye', $id)
        ->update([
            'descripcion_ppye' => $descripcion_ppye , 
            'cuenta_contable' => $cuenta_contable , 
            'tasa_fiscal' => $tasa_fiscal , 
            'tasa_financ' => $tasa_financ , 
            'siglas' => $siglas ,
            'vidaUtil' => $vidaUtil,
            'tipo_bien' => $tipo_bien,
        ]);

        return response()->json($editar);
    }


     //metodo para eliminar tipoActivo
     public function eliminarTipoActivo(Request $request){
        $id = $request["cod_ppye"];

        $editar = DB::connection('comanda')->table('af_tipo_ppye')->where('cod_ppye', $id)
        ->update(['estado' => 2 , 
        ]);

        return response()->json($editar);
    }


}

?>