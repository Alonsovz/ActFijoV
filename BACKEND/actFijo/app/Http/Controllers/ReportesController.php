<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;


date_default_timezone_set("America/El_Salvador");

class ReportesController extends Controller
{
    public function getCuadroDepreciacionFinancieraMensual(Request $request){
        $mes= $request["mes"];
        $anio = $request["anio"];


        $month = ' '.$anio.'-'.$mes.'';
        $aux = date('Ymd', strtotime("{$month} + 1 month"));
        $last_day = date('Ymd', strtotime("{$aux} - 1 day"));


        $getCuadro =  DB::connection('comanda')->select("select af.af_codigo_vnr, af.af_codigo_contable,
        descripcion_agd as grupo, convert(varchar, af.fecha_reg_contable, 103) as fechaRegistro,
        tp.tipo_partida_descripcion as tipo_partida,
        af.cuenta_contable, af.descripcion_bien, af.codigo_sucursal as ubicacion,
         convert(varchar, af.fecha_compra, 103) as fecha_compra,
         af.numero_documento, pro.entidad_nombre as proveedor,
         '$' + str(af.af_valor_compra_siva,12,2) as valor_compra,
         '$' + str(af.af_valor_residual,12,2) as valor_residual,
         str(af.af_tasa_depreciacion_financ,12,2) + '%' as tasa_depreciacion,
         af.af_vida_util as vida_util,
         '$0.00' as depreciacion_acumulada,
         '$0.00' as depreciacion_anual,
         '$0.00' as valor_libros,
         mun.munName as municipio
         from af_maestro af
         inner join af_agd agd on agd.codigo_agd = af.codigo_agd
         inner join saf_2011.dbo.tipo_partida tp on tp.tipo_partida_id = af.tipo_partida_id
         inner join saf_2011.dbo.entidad as pro on pro.entidad_id = af.codigo_proveedor
         inner join MUNSV as mun on mun.ID = af.cod_municipio
         where af.fecha_compra between '".$anio."".$mes."01 00:00:00' and '".$last_day." 23:59:59'");

        return response()->json($getCuadro);
    }

    public function getCuadroDepreciacionFiscalMensual(Request $request){
        $mes= $request["mes"];
        $anio = $request["anio"];


        $month = ' '.$anio.'-'.$mes.'';
        $aux = date('Ymd', strtotime("{$month} + 1 month"));
        $last_day = date('Ymd', strtotime("{$aux} - 1 day"));


        $getCuadro =  DB::connection('comanda')->select("select af.af_codigo_vnr, af.af_codigo_contable,
        descripcion_agd as grupo, convert(varchar, af.fecha_reg_contable, 103) as fechaRegistro,
        tp.tipo_partida_descripcion as tipo_partida,
        af.cuenta_contable, af.descripcion_bien, af.codigo_sucursal as ubicacion,
         convert(varchar, af.fecha_compra, 103) as fecha_compra,
         af.numero_documento, pro.entidad_nombre as proveedor,
         '$' + str(af.af_valor_compra_siva,12,2) as valor_compra,
         '$' + str(af.af_valor_residual,12,2) as valor_residual,
         str(af.af_tasa_depreciacion_fiscal,12,2) + '%' as tasa_depreciacion,
         af.af_vida_util as vida_util,
         '$0.00' as depreciacion_acumulada,
         '$0.00' as depreciacion_anual,
         '$0.00' as valor_libros,
         mun.munName as municipio
         from af_maestro af
         inner join af_agd agd on agd.codigo_agd = af.codigo_agd
         inner join saf_2011.dbo.tipo_partida tp on tp.tipo_partida_id = af.tipo_partida_id
         inner join saf_2011.dbo.entidad as pro on pro.entidad_id = af.codigo_proveedor
         inner join MUNSV as mun on mun.ID = af.cod_municipio
         where af.fecha_compra between '".$anio."".$mes."01 00:00:00' and '".$last_day." 23:59:59'");

        return response()->json($getCuadro);
    }
    
    public function generarReporteAGD(Request $request){
        $fecha1= $request["fechaInicioAGD"];
        $fecha2 = $request["fechaFinAGD"];

        $fecha1SinFormato = date_create_from_format('Y-m-d',$fecha1);

        $fecha1ConFormato = date_format($fecha1SinFormato,'Ymd');

        $fecha2SinFormato = date_create_from_format('Y-m-d',$fecha2);

        $fecha2ConFormato = date_format($fecha2SinFormato,'Ymd');


        $getCuadro =  DB::connection('comanda')->select("SELECT af.descripcion_bien as descripcion,
        atp.tipo_bien+' '+atp.siglas as codigo,
        (select count(af_codigo_interno) from af_maestro where codigo_ppye = atp.cod_ppye
        and estado != 'B' and estadoActivo  = 'Activo') as cantidad,
        '$'+''+str(sum(af.af_valor_compra_siva) /
        (select count(af_codigo_interno) from af_maestro where codigo_ppye = atp.cod_ppye
        and estado != 'B' and estadoActivo  = 'Activo'),12,2)
        as PU,
        '$'+''+str(sum(af.af_valor_compra_siva),12,2) as monto,
        (select top 1 numero_documento from af_maestro where codigo_ppye = atp.cod_ppye)as numeroFactura
        from af_maestro af
        inner join af_tipo_ppye atp on atp.cod_ppye = af.codigo_ppye
        where af.estado != 'B' and af.estadoActivo  = 'Activo'
        and af.fecha_compra between '".$fecha1ConFormato." 00:00:00' and '".$fecha2ConFormato." 23:59:59'
        group by af.descripcion_bien, atp.cod_ppye,  atp.tipo_bien,atp.siglas,af.codigo_ppye");

        return response()->json($getCuadro);
    }
}