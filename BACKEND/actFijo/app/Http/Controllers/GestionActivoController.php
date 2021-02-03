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
        $dep = $request["cod_departamento"];

        $getMunicipios = 
        DB::connection('comanda')->select("select * from MUNSV where DEPSV_ID = ".$dep."");

        return response()->json($getMunicipios);
    }

    //metodo para obtener departamentos
    public function getCuentaContablePPYE(Request $request){
        $tipoActivo = $request["codigo_ppye"];

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
        $tipoActivoPPYE = $request["codigo_ppye"];
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
        $marcaBien = $request["codigo_marca"];
        $modeloBien = $request["modeloBien"];
        $serieBien = $request["serieBien"];
        $otrasEspecificaciones = $request["otrasEspecificaciones"];
        $fechaCompra = $request["fechaCompra"];
        $proveedor = $request["proveedor"];
        $departamento = $request["cod_departamento"];
        $municipio = $request["municipio"];
        $ubicacionFisica = $request["ubicacionFisica"];
        $estadoActivo = $request["estadoActivo"];
        $valorSiva = $request["valorSiva"];
        $tipoDocumento = $request["tipoDocumento"];
        $numeroDocumento = $request["numeroDocumento"];
        $asignadoA = $request["asignadoA"];

        $fechaRegistroSinFormato = date_create_from_format('Y-m-d',$fechaRegistro);

        $fechaRegistroConFormato = date_format($fechaRegistroSinFormato,'Ymd');

        $fechaCompraSinFormato = date_create_from_format('Y-m-d',$fechaCompra);

        $fechaCompraConFormato = date_format($fechaCompraSinFormato,'Ymd');


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
            'fecha_compra' => $fechaCompraConFormato,
            'codigo_tipo_documento' => $tipoDocumento,
            'numero_documento' => $numeroDocumento,
            'codigo_proveedor' => $proveedor,
            'af_valor_compra_siva' => $valorSiva,
            'af_tasa_depreciacion_financ' => $tasaFinanciera,
            'af_tasa_depreciacion_fiscal' => $tasaFiscal,
            'af_vida_util' => $vidaUtil,
            'cod_departamento' => $departamento,
            'cod_municipio' => $municipio,
            'fecha_alta' => date('Ymd H:i:s'),
            'codigo_sucursal' => $ubicacionFisica,
            'codigo_asignado' => $asignadoA,
            'estadoActivo' => 'Pendiente'
        ]);

        return response()->json($insertar);
    }

    //metodo para mostrar activos tipo admin en base de datos COMANDA
    public function getActivosAdmin(){
      
        $getMisActivos = 
        DB::connection('comanda')->select("select af.*,
        '$'+str(af.af_valor_compra_siva,12,2) as compraSiva,
        convert(varchar(10),af.fecha_compra, 23) as fechaCompra,
        convert(varchar(10),af.fecha_reg_contable, 23) as fechaRegistro, u.alias as asignado, af.estado as estadoAc from af_maestro af
        inner join users u on u.id = af.codigo_asignado order by af_codigo_interno desc");

        return response()->json($getMisActivos);
    }


    //metodo para mostrar activos por usuario en base de datos COMANDA
    public function getMisActivos(Request $request){
        $idUsuario = $request["id"];
      
        $getMisActivos = 
        DB::connection('comanda')->select("select *,estado as estadoAc,
        '$'+str(af_valor_compra_siva,12,2) as compraSiva,
        convert(varchar(10),fecha_compra, 23) as fechaCompra,
        convert(varchar(10),fecha_reg_contable, 23) as fechaRegistro from af_maestro
        where codigo_asignado = ".$idUsuario ." order by af_codigo_interno desc");

        return response()->json($getMisActivos);
    }

    public function guardarActivacionActivo(Request $request){
        $id = $request["af_codigo_interno"];
        $userMovimiento = $request["asignado"];
        $userAprobacion = $request["alias"];

       $editar = DB::connection('comanda')->table('af_maestro')->where('af_codigo_interno ', $id)
        ->update([
            'estadoActivo' => 'Activo' , 
            'usuario_alta' => $userAprobacion , 
        ]);


        $insertar =  DB::connection('comanda')->table('af_historial_activo')
        ->insert([
            'idActivo' => $id,
            'movimiento' => 'Alta',
            'fecha_movimiento'=> date('Ymd H:i:s'),
            'usuario_movimiento' => $userMovimiento,
            'usuario_aprobacion' => $userAprobacion,
            'usuario_asignado' => $userMovimiento,
        ]);

        return response()->json($editar);

    }
     //metodo para editar activo en base de datos COMANDA
     public function guardarEdicionActivo(Request $request){
        $codigoVNR = $request["af_codigo_vnr"];
        $codigoContable = $request["af_codigo_contable"];
        $tipoActivoPPYE = $request["codigo_ppye"];
        $fechaRegistro = $request["fechaRegistro"];
        $cuentaContable = $request["cuenta_contable"];
        $tasaFiscal = $request["af_tasa_depreciacion_fiscal"];
        $tasaFinanciera = $request["af_tasa_depreciacion_financ"];
        $vidaUtil = $request["af_vida_util"];
        $tipoPartida = $request["tipo_partida_id"];
        $descripcionBien = $request["descripcion_bien"];
        $tipoActivoVNR = $request["codigo_tipo_bien_vnr"];
        $areaUbicacionVNR = $request["area_del_bien_vnr"];
        $ccCostoVnr = $request["ccosto_del_bien_vnr"];
        $tipoAgd = $request["codigo_agd"];
        $bodegaAsignada = $request["bodega_id"];
        $marcaBien = $request["codigo_marca"];
        $modeloBien = $request["codigo_modelo"];
        $serieBien = $request["af_serie"];
        $otrasEspecificaciones = $request["otras_especificaciones"];
        $fechaCompra = $request["fechaCompra"];
        $proveedor = $request["codigo_proveedor"];
        $departamento = $request["cod_departamento"];
        $municipio = $request["cod_municipio"];
        $ubicacionFisica = $request["codigo_sucursal"];
        $valorSiva = $request["af_valor_compra_siva"];
        $tipoDocumento = $request["codigo_tipo_documento"];
        $numeroDocumento = $request["numero_documento"];
        $id = $request["af_codigo_interno"];
        $userModificacion = $request["alias"];

        $fechaRegistroSinFormato = date_create_from_format('Y-m-d',$fechaRegistro);

        $fechaRegistroConFormato = date_format($fechaRegistroSinFormato,'Ymd');

        $fechaCompraSinFormato = date_create_from_format('Y-m-d',$fechaCompra);

        $fechaCompraConFormato = date_format($fechaCompraSinFormato,'Ymd');


        $insertar =  DB::connection('comanda')->table('af_maestro')->where('af_codigo_interno', $id)
        ->update([
            'af_codigo_vnr' => $codigoVNR,
            'af_codigo_contable' => $codigoContable,
            'codigo_ppye' => $tipoActivoPPYE,
            'fecha_reg_contable' => $fechaRegistroConFormato,
            'tipo_partida_id' => $tipoPartida,
            'cuenta_contable'=> $cuentaContable,
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
            'fecha_compra' => $fechaCompraConFormato,
            'codigo_tipo_documento' => $tipoDocumento,
            'numero_documento' => $numeroDocumento,
            'codigo_proveedor' => $proveedor,
            'af_valor_compra_siva' => $valorSiva,
            'af_tasa_depreciacion_financ' => $tasaFinanciera,
            'af_tasa_depreciacion_fiscal' => $tasaFiscal,
            'af_vida_util' => $vidaUtil,
            'cod_departamento' => $departamento,
            'cod_municipio' => $municipio,
            'codigo_sucursal' => $ubicacionFisica,
            'usuario_modificacion' => $userModificacion,
            'fecha_modificacion' => date('Ymd H:i:s'),
        ]);

        return response()->json($insertar);
    }


    //metodo para obtener el historial del activo
    public function getHistorialActivo(Request $request){
        $id = $request["af_codigo_interno"];

        $getActivo = DB::connection('comanda')
        ->select("SELECT  *, convert(varchar, fecha_movimiento, 103) as fechaMovimiento,
         substring(convert(varchar,fecha_movimiento, 114),1,5) as horaMovimiento
         from af_historial_activo where idActivo = ".$id."");

        return response()->json($getActivo);

    }

    public function iniciarBaja(Request $request) {
        try {
            //code...
            
            $actualizar = DB::table('af_maestro')->where('af_codigo_interno', $request['af_codigo_interno'])->update([
                'estado' => 'B',
                'fecha_baja' => date('Ymd H:i:s'),
                'estadoActivo' => 'Pendiente',
            ]);

            return Response::json([
                'success' => $actualizar
            ], 200);

        } catch (\Illuminate\Database\QueryException $ex) {
            //throw $th;
            return Response::json([
                'error' => $ex->getMessage()
            ], 201);

        }
    }
    
}





?>