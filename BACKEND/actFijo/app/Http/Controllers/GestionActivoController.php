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


    //metodo para obtener sucursales para ubicación física
    public function getUbicacionFisica(){

        $getUbicacionFisica = 
        DB::connection('comanda')->select("select * from FACTURACION.dbo.fe_cta_sucursales");

        return response()->json($getUbicacionFisica);
    }

     //metodo para insertar alta de activo en base de datos COMANDA
     public function guardarAltaActivo(Request $request){
        $codigoVNR = $request["codigoVNR"];
        $codigoContable = $request["codigoContable"];
        $tipoActivoPPYE = $request["tipoActivoPPYE"];
        $fechaRegistro = $request["fechaRegistro"];
        $cuentaContable = $request["cuentaContable"];
        $tasaFiscal = $request["tasaFiscal"];
        $tasaFinanciera = $request["tasaFinanciera"];
        $vidaUtil = $request["vidaUtil"];
        $tipoPartida = $request["tipoPartida"];
        $descripcionBien = $request["descripcionBien"];
        $tipoActivoVNR = $request["tipoActivoVNR"];
        $areaUbicacionVNR = $request["areaUbicacionVNR"];
        $ccCostoVnr = $request["ccCostoVnr"];
        $tipoAgd = $request["tipoAgd"];
        $bodegaAsignada = $request["bodegaAsignada"];
        $marcaBien = $request["marcaBien"];
        $modeloBien = $request["modeloBien"];
        $serieBien = $request["serieBien"];
        $otrasEspecificaciones = $request["otrasEspecificaciones"];
        $fechaCompra = $request["fechaCompra"];
        $proveedor = $request["proveedor"];
        $departamento = $request["departamento"];
        $municipio = $request["municipio"];
        $ubicacionFisica = $request["ubicacionFisica"];
        $estadoActivo = $request["estadoActivo"];
        $valorSiva = $request["valorSiva"];
        $tipoDocumento = $request["tipoDocumento"];
        $numeroDocumento = $request["numeroDocumento"];

        $fechaRegistroSinFormato = date_create_from_format('Y-m-d',$fechaRegistro);

        $fechaRegistroConFormato = date_format($fechaRegistroSinFormato,'Ymd');


        $insertar =  DB::connection('comanda')->table('af_maestro')
        ->insert([
            'af_codigo_vnr' => $codigoVNR,
            'af_codigo_contable' => $codigoContable,
            'codigo_ppye' => $tipoActivoPPYE,
            'fecha_reg_contable' => $fechaRegistroConFormato,
            'tipo_partida_id' => $tipoPartida,
            'cuenta_contable'=> $cuentaContable,
            'estado' => $estadoActivo,
            'descripcion_bien' => $descripcionBien,
            'codigo_tipo_bien_vnr' => $tipoActivoVNR,
            'area_del_bien_vnr' => $areaUbicacionVNR,
            'ccosto_del_bien_vnr' => $ccCostoVnr,
            'codigo_agd' => $tipoAgd,
            'bodega_id' => $bodegaAsignada,
            'codigo_marca' => $marcaBien,
            'codigo_modelo' => $modeloBien,
            'af_serie' => $serieBien,
            'otras_especificaciones' => $otrasEspecificaciones,
            'fecha_compra' => $fechaCompra,
            'codigo_tipo_documento' => $tipoDocumento,
            'numero_documento' => $numeroDocumento,
            'codigo_proveedor' => $proveedor,
            'af_valor_compra_siva' => $valorSiva,
            'af_tasa_depreciación_financ' => $tasaFinanciera,
            'af_tasa_depreciación_fiscal' => $tasaFiscal,
            'af_vida_util' => $vidaUtil,
            'cod_departamento' => $departamento,
            'cod_municipio' => $municipio,
            'fecha_alta' => date('Ymd H:i:s'),
            'codigo_sucursal' => $ubicacionFisica,

        ]);

        return response()->json($insertar);
    }

    //metodo para insertar alta de activo en base de datos COMANDA
    public function getMisActivos(){
      
        $getMisActivos = 
        DB::connection('comanda')->select("select af_codigo_interno, descripcion_bien,
        estado,
        '$'+str(af_valor_compra_siva,12,2) as compraSiva,
        convert(varchar,fecha_compra, 103) as fechaCompra from af_maestro");

        return response()->json($getMisActivos);
    }

}


?>