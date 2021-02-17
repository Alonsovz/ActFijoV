<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use DB;
use Session;
use Response;



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
        //$codigoVNR = $request["codigoVNR"];
        //$codigoContable = $request["codigoContable"];
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
        $af_valor_residual = $request["af_valor_residual"];
        $af_valor_vnr_siva = $request["af_valor_vnr_siva"];

        $siglas = $request["siglas"];
        $tipo_bien = $request["tipo_bien"];


        $fechaRegistroSinFormato = date_create_from_format('Y-m-d',$fechaRegistro);

        $fechaRegistroConFormato = date_format($fechaRegistroSinFormato,'Ymd');

        $fechaCompraSinFormato = date_create_from_format('Y-m-d',$fechaCompra);

        $fechaCompraConFormato = date_format($fechaCompraSinFormato,'Ymd');

        $getLastId = DB::connection('comanda')->table('af_maestro')->orderBy('af_codigo_interno', 'desc')->first();

        $codVNR = '';
        $codConta = '';

        $insertId = $getLastId->af_codigo_interno + 1;
        
        if($insertId < 10){
            $codVNR = 'VNR 0000'.$insertId.'';
            $codConta = ''.$tipo_bien.' '.$siglas.' 0000'.$insertId.'';
        }else if($insertId > 9 && $insertId < 100){
            $codVNR = 'VNR 000'.$insertId.'';
            $codConta = ''.$tipo_bien.' '.$siglas.' 000'.$insertId.'';
        }
        else if($insertId > 99 && $insertId < 1000){
            $codVNR = 'VNR 00'.$insertId.'';
            $codConta = ''.$tipo_bien.' '.$siglas.' 00'.$insertId.'';
        }

        else if($insertId > 999 && $insertId < 10000){
            $codVNR = 'VNR 0'.$insertId.'';
            $codConta = ''.$tipo_bien.' '.$siglas.' 0'.$insertId.'';
        }

        else if($insertId > 9999){
            $codVNR = 'VNR '.$insertId.'';
            $codConta = ''.$tipo_bien.' '.$siglas.' '.$insertId.'';
        }


        $monthIniciaDepre = date("m",strtotime($fechaCompraConFormato));

        $yearIniciaDepre = date("Y",strtotime($fechaCompraConFormato));

        $mesInicial = '';

        if($monthIniciaDepre == '01'){
            $mesInicial = '02';
        }else if($monthIniciaDepre == '02'){
            $mesInicial = '03';
        }
        else if($monthIniciaDepre == '03'){
            $mesInicial = '04';
        }
        else if($monthIniciaDepre == '04'){
            $mesInicial = '05';
        }
        else if($monthIniciaDepre == '05'){
            $mesInicial = '06';
        }
        else if($monthIniciaDepre == '06'){
            $mesInicial = '07';
        }
        else if($monthIniciaDepre == '07'){
            $mesInicial = '08';
        }
        else if($monthIniciaDepre == '08'){
            $mesInicial = '09';
        }
        else if($monthIniciaDepre == '09'){
            $mesInicial = '10';
        }
        else if($monthIniciaDepre == '10'){
            $mesInicial = '11';
        }
        else if($monthIniciaDepre == '11'){
            $mesInicial = '12';
        }
        else if($monthIniciaDepre == '12'){
            $mesInicial = '01';
        }

        $anioFinalDepre = $yearIniciaDepre  + $vidaUtil;

        $periodoInicialDepre = $mesInicial.$yearIniciaDepre;
        $periodoFinalDepre = $mesInicial.$anioFinalDepre;
      
        

        $insertar =  DB::connection('comanda')->table('af_maestro')
        ->insert([
            'af_codigo_vnr' => $codVNR,
            'af_codigo_contable' => $codConta,
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
            'estadoActivo' => 'Pendiente',
            'aplica_contabilidad' => 'S',
            'solo_vnr' => 'N',
            'af_valor_vnr_siva' => $af_valor_vnr_siva,
            'af_valor_residual' => $af_valor_residual,
            'periodo_inicial' => $periodoInicialDepre,
            'periodo_final' => $periodoFinalDepre,
        ]);

        return response()->json($insertar);
    }

    //metodo para mostrar activos tipo admin en base de datos COMANDA
    public function getActivosAdmin(){
      
        $getMisActivos = 
        DB::connection('comanda')->select("select af.*,
        '$'+str(af.af_valor_compra_siva,12,2) as compraSiva,
        convert(varchar(10),af.fecha_compra, 23) as fechaCompra,
        convert(varchar(10),af.fecha_reg_contable, 23) as fechaRegistro, u.alias as asignado, af.estado as estadoAc,
        (select top 1 usuario_asignado from af_historial_activo
        where movimiento != 'Baja' and idActivo = af.af_codigo_interno
        order by id desc ) as usuarioAnterior from af_maestro af
        inner join users u on u.id = af.codigo_asignado order by af_codigo_interno desc");

        return response()->json($getMisActivos);
    }


    //metodo para mostrar activos por usuario en base de datos COMANDA
    public function getMisActivos(Request $request){
        $idUsuario = $request["id"];
      
        $getMisActivos = 
        DB::connection('comanda')->select("select af.*,af.estado as estadoAc,
        '$'+str(af.af_valor_compra_siva,12,2) as compraSiva,
        convert(varchar(10),af.fecha_compra, 23) as fechaCompra,
        convert(varchar(10),af.fecha_reg_contable, 23) as fechaRegistro,
        (select top 1 usuario_asignado from af_historial_activo
        where movimiento != 'Baja' and idActivo = af.af_codigo_interno
        order by id desc ) as usuarioAnterior from af_maestro af
        where af.codigo_asignado = ".$idUsuario ." order by af_codigo_interno desc");

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
        $af_valor_residual = $request["af_valor_residual"];
        $af_valor_vnr_siva = $request["af_valor_vnr_siva"];
        $siglas = $request["siglas"];
        $tipo_bien = $request["tipo_bien"];

        $fechaRegistroSinFormato = date_create_from_format('Y-m-d',$fechaRegistro);

        $fechaRegistroConFormato = date_format($fechaRegistroSinFormato,'Ymd');

        $fechaCompraSinFormato = date_create_from_format('Y-m-d',$fechaCompra);

        $fechaCompraConFormato = date_format($fechaCompraSinFormato,'Ymd');

        //$getLastId = DB::connection('comanda')->table('af_maestro')->orderBy('af_codigo_interno', 'desc')->first();

        $codVNR = '';
        $codConta = '';

        $insertId = $id;
        
        if($insertId < 10){
            $codVNR = 'VNR 0000'.$insertId.'';
            $codConta = ''.$tipo_bien.' '.$siglas.' 0000'.$insertId.'';
        }else if($insertId > 9 && $insertId < 100){
            $codVNR = 'VNR 000'.$insertId.'';
            $codConta = ''.$tipo_bien.' '.$siglas.' 000'.$insertId.'';
        }
        else if($insertId > 99 && $insertId < 1000){
            $codVNR = 'VNR 00'.$insertId.'';
            $codConta = ''.$tipo_bien.' '.$siglas.' 00'.$insertId.'';
        }

        else if($insertId > 999 && $insertId < 10000){
            $codVNR = 'VNR 0'.$insertId.'';
            $codConta = ''.$tipo_bien.' '.$siglas.' 0'.$insertId.'';
        }

        else if($insertId > 9999){
            $codVNR = 'VNR '.$insertId.'';
            $codConta = ''.$tipo_bien.' '.$siglas.' '.$insertId.'';
        }


        $monthIniciaDepre = date("m",strtotime($fechaCompraConFormato));

        $yearIniciaDepre = date("Y",strtotime($fechaCompraConFormato));

        $mesInicial = '';

        if($monthIniciaDepre == '01'){
            $mesInicial = '02';
        }else if($monthIniciaDepre == '02'){
            $mesInicial = '03';
        }
        else if($monthIniciaDepre == '03'){
            $mesInicial = '04';
        }
        else if($monthIniciaDepre == '04'){
            $mesInicial = '05';
        }
        else if($monthIniciaDepre == '05'){
            $mesInicial = '06';
        }
        else if($monthIniciaDepre == '06'){
            $mesInicial = '07';
        }
        else if($monthIniciaDepre == '07'){
            $mesInicial = '08';
        }
        else if($monthIniciaDepre == '08'){
            $mesInicial = '09';
        }
        else if($monthIniciaDepre == '09'){
            $mesInicial = '10';
        }
        else if($monthIniciaDepre == '10'){
            $mesInicial = '11';
        }
        else if($monthIniciaDepre == '11'){
            $mesInicial = '12';
        }
        else if($monthIniciaDepre == '12'){
            $mesInicial = '01';
        }

        $anioFinalDepre = $yearIniciaDepre  + $vidaUtil;

        $periodoInicialDepre = $mesInicial.$yearIniciaDepre;
        $periodoFinalDepre = $mesInicial.$anioFinalDepre;


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
            'af_valor_vnr_siva' => $af_valor_vnr_siva,
            'af_valor_residual' => $af_valor_residual,
            'periodo_inicial' => $periodoInicialDepre,
            'periodo_final' => $periodoFinalDepre,
        ]);

        return response()->json($insertar);
    }


    //metodo para obtener el historial del activo
    public function getHistorialActivo(Request $request){
        $id = $request["af_codigo_interno"];

        $getActivo = DB::connection('comanda')
        ->select("SELECT  *, convert(varchar, fecha_movimiento, 103) as fechaMovimiento,
         substring(convert(varchar,fecha_movimiento, 114),1,5) as horaMovimiento
         from af_historial_activo where idActivo = ".$id."
         order by id desc");

        return response()->json($getActivo);

    }

    public function iniciarBaja(Request $request) {
        try {
            //code...
            
            $actualizar = DB::connection('comanda')->table
            ('af_maestro')->where('af_codigo_interno', $request['af_codigo_interno'])->update([
                'estado' => 'B',
                'fecha_baja' => date('Ymd H:i:s'),
                'estadoActivo' => 'Pendiente',
                'motivoBaja' => $request['motivoBajaInput']
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

    public function guardarTraslado(Request $request){
        $id = $request["af_codigo_interno"];
        $userTraslado = $request["usuarioTrasladoNuevo"];

       $editar = DB::connection('comanda')->table('af_maestro')->where('af_codigo_interno ', $id)
        ->update([
            'estadoActivo' => 'Pendiente' , 
            'codigo_asignado' => $userTraslado, 
            'estado' => 'T', 
        ]);

        return response()->json($editar);

    }
    

    public function guardarAceptacionTraslado(Request $request){
        $id = $request["af_codigo_interno"];
        $usuarioAnterior = $request["usuarioAnterior"];
        $userMovimiento = $request["alias"];
        $userAprobacion = $request["alias"];

       $editar = DB::connection('comanda')->table('af_maestro')->where('af_codigo_interno ', $id)
        ->update([
            'estadoActivo' => 'Activo' ,
            'estado' => 'T' ,
        ]);


        $insertar =  DB::connection('comanda')->table('af_historial_activo')
        ->insert([
            'idActivo' => $id,
            'movimiento' => 'Traslado',
            'fecha_movimiento'=> date('Ymd H:i:s'),
            'usuario_movimiento' => $usuarioAnterior,
            'usuario_aprobacion' => $userAprobacion,
            'usuario_asignado' => $userMovimiento,
        ]);

        return response()->json($editar);

    }


    // funcion para finalizar el proceso de baja por parte de un administrador
    public function finalizarProcesoBaja(Request $request) {
        try {
            //code...
            $actualizar_AFM = DB::connection('comanda')->table('af_maestro')->where('af_codigo_interno', $request['af_codigo_interno'])
                                                      ->update([
                                                      'estadoActivo' => 'Activo',
                                                      'estado' => 'B',
                                                      'fecha_baja' => date('Ymd H:i:s'),
                                                      'motivoBaja' => $request['motivoBajaInput'],
                                                    ]);

            $actualizar_History =DB::connection('comanda')->table('af_historial_activo')->insert([
                'idActivo' => $request['af_codigo_interno'],
                'movimiento' => 'Baja',
                'fecha_movimiento' => date('Ymd H:i:s'),
                'usuario_movimiento' => $request['asignado'],
                'usuario_aprobacion' => $request['alias'],
            ]);

            return Response::json([
                'proceso de baja' => $actualizar_AFM,
                'historico' => $actualizar_History,
            ], 200);

        } catch (\Illuminate\Database\QueryException $ex) {
            //throw $th;
            return Response::json([
                'error' => $ex->getMessage()
            ], 201);
        }
    }
    

     //metodo para mostrar activos tipo alta para administradores en base de datos COMANDA
     public function getAltasAdmin(){
      
        $getMisActivos = 
        DB::connection('comanda')->select("select af.*,
        '$'+str(af.af_valor_compra_siva,12,2) as compraSiva,
        convert(varchar(10),af.fecha_compra, 23) as fechaCompra,
        convert(varchar(10),af.fecha_compra, 103) as fechaCompraT,
        convert(varchar, af.fecha_alta, 103) as fechaAlta,
         substring(convert(varchar,af.fecha_alta, 114),1,5) as horaAlta,
        convert(varchar(10),af.fecha_reg_contable, 23) as fechaRegistro, u.alias as asignado, af.estado as estadoAc,
        (select top 1 usuario_asignado from af_historial_activo
        where movimiento != 'Baja' and idActivo = af.af_codigo_interno
        order by id desc ) as usuarioAnterior from af_maestro af
        inner join users u on u.id = af.codigo_asignado 
        where af.estado = 'A' and af.estadoActivo = 'Activo'
        order by af_codigo_interno desc");

        return response()->json($getMisActivos);
    }


    //metodo para mostrar activos tipo baja para administradores en base de datos COMANDA
    public function getBajasAdmin(){
      
        $getMisActivos = 
        DB::connection('comanda')->select("select af.*,
        '$'+str(af.af_valor_compra_siva,12,2) as compraSiva,
        convert(varchar(10),af.fecha_compra, 23) as fechaCompra,
        convert(varchar(10),af.fecha_compra, 103) as fechaCompraT,
        convert(varchar, af.fecha_baja, 103) as fechaBaja,
         substring(convert(varchar,af.fecha_baja, 114),1,5) as horaBaja,
        convert(varchar(10),af.fecha_reg_contable, 23) as fechaRegistro, u.alias as asignado, af.estado as estadoAc,
        (select top 1 usuario_asignado from af_historial_activo
        where movimiento != 'Baja' and idActivo = af.af_codigo_interno
        order by id desc ) as usuarioAnterior from af_maestro af
        inner join users u on u.id = af.codigo_asignado 
        where af.estado = 'B' and af.estadoActivo = 'Activo'
        order by af_codigo_interno desc");

        return response()->json($getMisActivos);
    }


    //metodo para mostrar activos tipo traslado para administradores en base de datos COMANDA
    public function getTrasladosAdmin(){
      
        $getMisActivos = 
        DB::connection('comanda')->select("select distinct af.*,
        '$'+str(af.af_valor_compra_siva,12,2) as compraSiva,
        convert(varchar(10),af.fecha_compra, 23) as fechaCompra,
        convert(varchar(10),af.fecha_reg_contable, 23) as fechaRegistro, u.alias as asignado, af.estado as estadoAc,
        (select top 1 usuario_movimiento from af_historial_activo
        where movimiento != 'Baja' and idActivo = af.af_codigo_interno
        order by id desc ) as usuarioAnterior,
        
        (select top 1 convert(varchar, fecha_movimiento, 103) from af_historial_activo
        where movimiento != 'Baja' and idActivo = af.af_codigo_interno
        order by id desc ) as fechaTraslado,
        (select top 1 substring(convert(varchar,fecha_movimiento, 114),1,5) from af_historial_activo
        where movimiento != 'Baja' and idActivo = af.af_codigo_interno
        order by id desc ) as horaTraslado
        
         from af_maestro af
      
        inner join users u on u.id = af.codigo_asignado 
        where af.estado = 'T' and af.estadoActivo = 'Activo'
        
        order by af_codigo_interno desc");

        return response()->json($getMisActivos);
    }



      //metodo para mostrar activos tipo alta para administradores en base de datos COMANDA
      public function getAltasPendientesAdmin(){
      
        $getMisActivos = 
        DB::connection('comanda')->select("select af.*,
        '$'+str(af.af_valor_compra_siva,12,2) as compraSiva,
        convert(varchar(10),af.fecha_compra, 23) as fechaCompra,convert(varchar(10),af.fecha_compra, 103) as fechaCompraT,
        convert(varchar(10),af.fecha_reg_contable, 23) as fechaRegistro, u.alias as asignado, af.estado as estadoAc,
        (select top 1 usuario_asignado from af_historial_activo
        where movimiento != 'Baja' and idActivo = af.af_codigo_interno
        order by id desc ) as usuarioAnterior from af_maestro af
        inner join users u on u.id = af.codigo_asignado 
        where af.estado = 'A' and af.estadoActivo = 'Pendiente'
        order by af_codigo_interno desc");

        return response()->json($getMisActivos);
    }


    //metodo para mostrar activos tipo baja para administradores en base de datos COMANDA
    public function getBajasPendientesAdmin(){
      
        $getMisActivos = 
        DB::connection('comanda')->select("select af.*,
        '$'+str(af.af_valor_compra_siva,12,2) as compraSiva,
        convert(varchar(10),af.fecha_compra, 23) as fechaCompra,
        convert(varchar(10),af.fecha_compra, 103) as fechaCompraT,
        convert(varchar(10),af.fecha_reg_contable, 23) as fechaRegistro, u.alias as asignado, af.estado as estadoAc,
        (select top 1 usuario_asignado from af_historial_activo
        where movimiento != 'Baja' and idActivo = af.af_codigo_interno
        order by id desc ) as usuarioAnterior from af_maestro af
        inner join users u on u.id = af.codigo_asignado 
        where af.estado = 'B' and af.estadoActivo = 'Pendiente'
        order by af_codigo_interno desc");

        return response()->json($getMisActivos);
    }


    //metodo para mostrar activos tipo traslado para administradores en base de datos COMANDA
    public function getTrasladosPendientesAdmin(){
      
        $getMisActivos = 
        DB::connection('comanda')->select("select af.*,
        '$'+str(af.af_valor_compra_siva,12,2) as compraSiva,
        convert(varchar(10),af.fecha_compra, 23) as fechaCompra,
        convert(varchar(10),af.fecha_reg_contable, 23) as fechaRegistro, u.alias as asignado, af.estado as estadoAc,
        (select top 1 usuario_asignado from af_historial_activo
        where movimiento != 'Baja' and idActivo = af.af_codigo_interno
        order by id desc ) as usuarioAnterior from af_maestro af
        inner join users u on u.id = af.codigo_asignado 
        where af.estado = 'T' and af.estadoActivo = 'Pendiente'
        order by af_codigo_interno desc");

        return response()->json($getMisActivos);
    }

    //metodo para obtener conteo de badges en vista de administrador
    public function getConteoAdmin(){
        $getConteoAdmin = 
        DB::connection('comanda')->select("select 
        (select count(af_codigo_interno) from af_maestro where estado = 'A' and estadoActivo = 'Activo') as conteoAltas,
        (select count(af_codigo_interno) from af_maestro where estado = 'T' and estadoActivo = 'Activo') as conteoTraslados,
        (select count(af_codigo_interno) from af_maestro where estado = 'B' and estadoActivo = 'Activo') as conteoBajas,
        (select count(af_codigo_interno) from af_maestro where estado = 'A' and estadoActivo = 'Pendiente') as conteoAltasPen,
        (select count(af_codigo_interno) from af_maestro where estado = 'T' and estadoActivo = 'Pendiente') as conteoTrasladosPen,
        (select count(af_codigo_interno) from af_maestro where estado = 'B' and estadoActivo = 'Pendiente') as conteoBajasPen");

        return response()->json($getConteoAdmin);
    }


    //metodo para mostrar activos alta por usuario en base de datos COMANDA
    public function getAltasUser(Request $request){
        $idUsuario = $request["id"];
      
        $getMisActivos = 
        DB::connection('comanda')->select("select af.*,af.estado as estadoAc,
        '$'+str(af.af_valor_compra_siva,12,2) as compraSiva,
        convert(varchar(10),af.fecha_compra, 23) as fechaCompra,
        convert(varchar(10),af.fecha_compra, 103) as fechaCompraT,
        convert(varchar(10),af.fecha_reg_contable, 23) as fechaRegistro,
        convert(varchar, af.fecha_alta, 103) as fechaAlta,
         substring(convert(varchar,af.fecha_alta, 114),1,5) as horaAlta,
        (select top 1 usuario_asignado from af_historial_activo
        where movimiento != 'Baja' and idActivo = af.af_codigo_interno
        order by id desc ) as usuarioAnterior from af_maestro af
        where af.codigo_asignado = ".$idUsuario ."
        and af.estado = 'A' and af.estadoActivo = 'Activo' order by af_codigo_interno desc");

        return response()->json($getMisActivos);
    }

      //metodo para mostrar activos baja por usuario en base de datos COMANDA
      public function getBajasUser(Request $request){
        $idUsuario = $request["id"];
      
        $getMisActivos = 
        DB::connection('comanda')->select("select af.*,af.estado as estadoAc,
        '$'+str(af.af_valor_compra_siva,12,2) as compraSiva,
        convert(varchar(10),af.fecha_compra, 23) as fechaCompra,
        convert(varchar(10),af.fecha_compra, 103) as fechaCompraT,
        convert(varchar(10),af.fecha_reg_contable, 23) as fechaRegistro,
        convert(varchar, af.fecha_baja, 103) as fechaBaja,
         substring(convert(varchar,af.fecha_baja, 114),1,5) as horaBaja,
        (select top 1 usuario_asignado from af_historial_activo
        where movimiento != 'Baja' and idActivo = af.af_codigo_interno
        order by id desc ) as usuarioAnterior from af_maestro af
        where af.codigo_asignado = ".$idUsuario ."
        and af.estado = 'B' and af.estadoActivo = 'Activo' order by af_codigo_interno desc");

        return response()->json($getMisActivos);
    }

      //metodo para mostrar activos traslado por usuario en base de datos COMANDA
      public function getTrasladosRecibidosUser(Request $request){
        $idUsuario = $request["id"];
        $alias = $request["alias"];
      
        $getMisActivos = 
        DB::connection('comanda')->select("select af.*,af.estado as estadoAc,
        '$'+str(af.af_valor_compra_siva,12,2) as compraSiva,
        convert(varchar(10),af.fecha_compra, 23) as fechaCompra,
        convert(varchar(10),af.fecha_compra, 103) as fechaCompraT,
        convert(varchar(10),af.fecha_reg_contable, 23) as fechaRegistro,
        h.usuario_asignado as usuarioNuevo,
        h.usuario_movimiento as usuarioAnterior,
        convert(varchar, h.fecha_movimiento, 103) as fechaTraslado,
         substring(convert(varchar,h.fecha_movimiento, 114),1,5) as horaTraslado,
         case when af.estado = 'A'
         then
         'Alta'
         when af.estado = 'B'
         then
         'Baja'
         when af.estado = 'T'
         then
         'Traslado'
         end as estadoActual
        from af_historial_activo h
        inner join af_maestro af on af.af_codigo_interno = h.idActivo
        where h.usuario_asignado = '".$alias."'
        and h.movimiento = 'Traslado'  and af.estado != 'B' and af.estadoActivo = 'Activo' order by af_codigo_interno desc");

        return response()->json($getMisActivos);
    }


     //metodo para mostrar activos traslado por usuario en base de datos COMANDA
     public function getTrasladosHechosUser(Request $request){
        $idUsuario = $request["alias"];
      
        $getMisActivos = 
        DB::connection('comanda')->select("select af.*,af.estado as estadoAc,
        '$'+str(af.af_valor_compra_siva,12,2) as compraSiva,
        convert(varchar(10),af.fecha_compra, 23) as fechaCompra,
        convert(varchar(10),af.fecha_reg_contable, 23) as fechaRegistro,
        h.usuario_asignado as usuarioNuevo,
        convert(varchar, h.fecha_movimiento, 103) as fechaTraslado,
         substring(convert(varchar,h.fecha_movimiento, 114),1,5) as horaTraslado
        from af_historial_activo h
        inner join af_maestro af on af.af_codigo_interno = h.idActivo
        where h.usuario_movimiento = '".$idUsuario."'
        and h.movimiento = 'Traslado'  and af.estado != 'B' and af.estadoActivo = 'Activo' order by af_codigo_interno desc");

        return response()->json($getMisActivos);
    }


     //metodo para mostrar activos traslado por usuario en base de datos COMANDA
     public function getTrasladosRecibidosPendientesUser(Request $request){
        $idUsuario = $request["id"];
        $alias = $request["alias"];
      
        $getMisActivos = 
        DB::connection('comanda')->select("select af.*,af.estado as estadoAc,
        '$'+str(af.af_valor_compra_siva,12,2) as compraSiva,
        convert(varchar(10),af.fecha_compra, 23) as fechaCompra,
        convert(varchar(10),af.fecha_compra, 103) as fechaCompraT,
        convert(varchar(10),af.fecha_reg_contable, 23) as fechaRegistro,
         (select top 1 usuario_asignado from af_historial_activo
        where movimiento != 'Baja' and idActivo = af.af_codigo_interno
        order by id desc ) as usuarioAnterior
        from  af_maestro af 
        where af.codigo_asignado = ".$idUsuario." 
        and af.estado = 'T' and af.estadoActivo = 'Pendiente' 
        order by af_codigo_interno desc");

        return response()->json($getMisActivos);
    }


     //metodo para mostrar activos traslado por usuario en base de datos COMANDA
     public function getTrasladosHechosPendientesUser(Request $request){
        $idUsuario = $request["alias"];
      
        $getMisActivos = 
        DB::connection('comanda')->select("select af.*,af.estado as estadoAc,
        '$'+str(af.af_valor_compra_siva,12,2) as compraSiva,
        convert(varchar(10),af.fecha_compra, 23) as fechaCompra,
        convert(varchar(10),af.fecha_compra, 103) as fechaCompraT,
        convert(varchar(10),af.fecha_reg_contable, 23) as fechaRegistro,
        h.usuario_asignado as usuarioNuevo,
        convert(varchar, h.fecha_movimiento, 103) as fechaTraslado,
         substring(convert(varchar,h.fecha_movimiento, 114),1,5) as horaTraslado,
         u.alias as asignado
        from af_historial_activo h
        inner join af_maestro af on af.af_codigo_interno = h.idActivo
        inner join users u on u.id = af.codigo_asignado 
        where h.usuario_asignado = '".$idUsuario."' and af.estado = 'T' and af.estadoActivo = 'Pendiente' 
        order by af_codigo_interno desc");

        return response()->json($getMisActivos);
    }


      //metodo para mostrar activos altas pendientes por usuario en base de datos COMANDA
      public function getAltasPendientesUser(Request $request){
        $idUsuario = $request["id"];
      
        $getMisActivos = 
        DB::connection('comanda')->select("select af.*,af.estado as estadoAc,
        '$'+str(af.af_valor_compra_siva,12,2) as compraSiva,
        convert(varchar(10),af.fecha_compra, 23) as fechaCompra,
        convert(varchar(10),af.fecha_compra, 103) as fechaCompraT,
        convert(varchar(10),af.fecha_reg_contable, 23) as fechaRegistro,
        (select top 1 usuario_asignado from af_historial_activo
        where movimiento != 'Baja' and idActivo = af.af_codigo_interno
        order by id desc ) as usuarioAnterior from af_maestro af
        where af.codigo_asignado = ".$idUsuario."
        and af.estado = 'A' and af.estadoActivo = 'Pendiente' order by af_codigo_interno desc");

        return response()->json($getMisActivos);
    }

      //metodo para mostrar activos traslados pendintes por usuario en base de datos COMANDA
      public function getTrasladosPendientesUser(Request $request){
        $idUsuario = $request["id"];
      
        $getMisActivos = 
        DB::connection('comanda')->select("select af.*,af.estado as estadoAc,
        '$'+str(af.af_valor_compra_siva,12,2) as compraSiva,
        convert(varchar(10),af.fecha_compra, 23) as fechaCompra,
        convert(varchar(10),af.fecha_reg_contable, 23) as fechaRegistro,
        (select top 1 usuario_asignado from af_historial_activo
        where movimiento != 'Baja' and idActivo = af.af_codigo_interno
        order by id desc ) as usuarioAnterior from af_maestro af
        where af.codigo_asignado = ".$idUsuario."
        and af.estado = 'T' and af.estadoActivo = 'Pendiente' order by af_codigo_interno desc");

        return response()->json($getMisActivos);
    }

      //metodo para mostrar activos bajas pendientes por usuario en base de datos COMANDA
      public function getBajasPendientesUser(Request $request){
        $idUsuario = $request["id"];
      
        $getMisActivos = 
        DB::connection('comanda')->select("select af.*,af.estado as estadoAc,
        '$'+str(af.af_valor_compra_siva,12,2) as compraSiva,
        convert(varchar(10),af.fecha_compra, 23) as fechaCompra,
        convert(varchar(10),af.fecha_compra, 103) as fechaCompraT,
        convert(varchar(10),af.fecha_reg_contable, 23) as fechaRegistro,
        (select top 1 usuario_asignado from af_historial_activo
        where movimiento != 'Baja' and idActivo = af.af_codigo_interno
        order by id desc ) as usuarioAnterior from af_maestro af
        where af.codigo_asignado = ".$idUsuario."
        and af.estado = 'B' and af.estadoActivo = 'Pendiente' order by af_codigo_interno desc");

        return response()->json($getMisActivos);
    }


     //metodo para obtener conteo de badges en vista de administrador
     public function getConteoUser(Request $request){
        $id = $request["id"];
        $alias = $request["alias"];

        $getConteoUser = 
        DB::connection('comanda')->select("select 
        (select count(af_codigo_interno) from af_maestro where estado = 'A' and estadoActivo = 'Activo' and codigo_asignado=".$id.") as conteoAltas,
        (select count(af_codigo_interno) from af_maestro where estado = 'B' and estadoActivo = 'Activo' and codigo_asignado=".$id.") as conteoBajas,
        (select count(af_codigo_interno) from af_maestro where estado = 'A' and estadoActivo = 'Pendiente' and codigo_asignado=".$id.") as conteoAltasPen,
        (select count(af_codigo_interno) from af_maestro where estado = 'T' and estadoActivo = 'Pendiente' and codigo_asignado=".$id.") as conteoTrasladosPen,
        (select count(af_codigo_interno) from af_maestro where estado = 'B' and estadoActivo = 'Pendiente' and codigo_asignado=".$id.") as conteoBajasPen,
        
        (select count(h.id) from af_historial_activo h
        inner join af_maestro af on af.af_codigo_interno = h.idActivo
         where h.usuario_asignado = '".$alias."' and h.movimiento = 'Traslado'
         and af.estado != 'B' and af.estadoActivo = 'Activo') as conteoTrasladosRecibidos,

         (select count(h.id) from af_historial_activo h
        inner join af_maestro af on af.af_codigo_interno = h.idActivo
         where h.usuario_movimiento = '".$alias."' and h.movimiento = 'Traslado'
         and af.estado != 'B' and af.estadoActivo = 'Activo')as conteoTrasladosHechos,
         
         (select count(af.af_codigo_interno)
         from  af_maestro af 
         where af.codigo_asignado = ".$id." 
         and af.estado = 'T' and af.estadoActivo = 'Pendiente' )  as conteoTrasladosRecibidosPendientesRecibir,

         (select count(af.af_codigo_interno)
         from  af_maestro af 
         inner join af_historial_activo h on h.idActivo = af.af_codigo_interno
         where  af.estado = 'T' and af.estadoActivo = 'Pendiente' 
         and h.usuario_asignado = '".$alias."') as conteoTrasladosHechosPendientesRecibir ");

        return response()->json($getConteoUser);
    }


    public function getHojaBaja(Request $request){

        $codigo = $request["id"];

        $pdf = \PDF::loadView('Reportes.hoja_bajaActivo', compact('codigo'));

    }

    // generar una hoja de activo
    public function generarHojaActivo(Request $request) {
        $id = DB::table('af_maestro')->max('af_codigo_interno');

        $activo = DB::table('af_maestro as afm')
                            ->join('af_marcas as marca','marca.codigo_marca','=','afm.codigo_marca')
                            ->join('af_modelos as modelo', 'modelo.codigo_modelo','=','afm.codigo_modelo')
                            ->join('DEPSV as departamento','departamento.ID','=','afm.cod_departamento')
                            ->join('MUNSV as municipio','municipio.ID','=','afm.cod_municipio')
                            ->select('afm.*','marca.nombre_marca','modelo.nombre_modelo','departamento.DepName','municipio.MunName')
                            ->where('afm.af_codigo_interno',$id)
                            ->get();

        return response()->json($activo);
          //$pdf = \PDF::loadView('Reportes.hoja_altaActivo', compact('activo'));
    }
    
    
}







?>