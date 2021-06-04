<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;
use Maatwebsite\Excel\Facades\Excel;

date_default_timezone_set("America/El_Salvador");

class ReportesController extends Controller
{
    public function getCuadroDepreciacionFinancieraMensual(Request $request){
        $mes= $request["mes"];
        $anio = $request["anio"];


        $periodoAnterior = '';
        $mesAnterior = '';

        if($mes == '01'){
            $anioAnterior = $anio - 1;
            $periodoAnterior = '12'.$anioAnterior.'';
        }else if($mes == '02'){
            $periodoAnterior = '01'.$anio.'';
        }else if($mes == '03'){
            $periodoAnterior = '02'.$anio.'';
        }else if($mes == '04'){
            $periodoAnterior = '03'.$anio.'';
        }else if($mes == '05'){
            $periodoAnterior = '04'.$anio.'';
        }else if($mes == '06'){
            $periodoAnterior = '05'.$anio.'';
        }else if($mes == '07'){
            $periodoAnterior = '06'.$anio.'';
        }else if($mes == '08'){
            $periodoAnterior = '07'.$anio.'';
        }else if($mes == '09'){
            $periodoAnterior = '08'.$anio.'';
        }else if($mes == '10'){
            $periodoAnterior = '09'.$anio.'';
        }else if($mes == '11'){
            $periodoAnterior = '10'.$anio.'';
        }else if($mes == '12'){
            $periodoAnterior = '11'.$anio.'';
        }

        $periodoEvaluado = $mes.$anio;

        $getCuadro = '';
        if($periodoEvaluado == '122020'){
            $getCuadro =  DB::connection('comanda')->select("
            DECLARE @periodoEvaluado varchar(6);
            DECLARE @periodoAnterior varchar(6);
    
            set @periodoEvaluado= '".$periodoEvaluado."';
    
    
            select distinct af.af_codigo_interno as codigo_interno, af.af_codigo_vnr, af.af_codigo_contable,
            descripcion_agd as grupo, convert(varchar, af.fecha_reg_contable, 103) as fechaRegistro,
            tp.tipo_partida_descripcion as tipo_partida,
            af.cuenta_contable, af.descripcion_bien, af.codigo_sucursal as ubicacion,
            convert(varchar, af.fecha_compra, 103) as fecha_compra,
            af.numero_documento, pro.entidad_nombre + ' ' + pro.entidad_apellido as proveedor,
            '$ ' + LTRIM(str(af.af_valor_compra_siva,12,2)) as valor_compra,
            '$ ' + LTRIM(str(af.af_valor_residual,12,2)) as valor_residual,
            str(af.af_tasa_depreciacion_financ,12,2) + '%' as tasa_depreciacion,
            af.vidaUtilFinanciera as vida_util,
            mun.munName as municipio,
            '$ ' + LTRIM(str(df.depre_financ_acumulada,12,2)) as depreciacion_acumulada,
            '$ ' + LTRIM(str(0.00,12,2)) as depreciacion_mes,
            '$' + LTRIM(str(df.valor_libros_financ,12,2)) as valor_libros
            from af_depreciacion_financiera df
            inner join af_maestro af on af.af_codigo_interno = df.af_codigo_interno
            left join af_agd agd on agd.codigo_agd = af.codigo_agd
            left join saf_2011.dbo.tipo_partida tp on tp.tipo_partida_id = af.tipo_partida_id
            left join saf_2011.dbo.entidad as pro on pro.entidad_id = af.codigo_proveedor
            left join MUNSV as mun on mun.ID = af.cod_municipio
            where df.periodo = @periodoEvaluado
            ");
        }
        else{

            $execProcedure =  DB::connection('comanda')->statement(
                "exec  [dbo].[af_depre_financ_mensual] '".$periodoEvaluado."','".$periodoAnterior."'");
        
        
                $getCuadro =  DB::connection('comanda')->select("
                DECLARE @periodoEvaluado varchar(6);
                DECLARE @periodoAnterior varchar(6);
        
                set @periodoEvaluado= '".$periodoEvaluado."';
                set @periodoAnterior= '".$periodoAnterior."';
        
        
                select distinct af.af_codigo_interno as codigo_interno, af.af_codigo_vnr, af.af_codigo_contable,
                descripcion_agd as grupo, convert(varchar, af.fecha_reg_contable, 103) as fechaRegistro,
                tp.tipo_partida_descripcion as tipo_partida,
                af.cuenta_contable, af.descripcion_bien, af.codigo_sucursal as ubicacion,
                convert(varchar, af.fecha_compra, 103) as fecha_compra,
                af.numero_documento, pro.entidad_nombre + ' ' + pro.entidad_apellido as proveedor,
                '$ ' + LTRIM(str(af.af_valor_compra_siva,12,2)) as valor_compra,
                '$ ' + LTRIM(str(af.af_valor_residual,12,2)) as valor_residual,
                str(af.af_tasa_depreciacion_financ,12,2) + '%' as tasa_depreciacion,
                af.vidaUtilFinanciera as vida_util,
                mun.munName as municipio,
                '$ ' + LTRIM(str(df.depre_financ_acumulada,12,2)) as depreciacion_acumulada,
                '$ ' + LTRIM(str(
                (select top 1  (df.depre_financ_acumulada) - (depre_financ_acumulada) from af_depreciacion_financiera
                where periodo = @periodoAnterior and af_codigo_interno = df.af_codigo_interno
                order by id desc),12,2)) as depreciacion_mes,
                '$' + LTRIM(str(df.valor_libros_financ,12,2)) as valor_libros
                from af_depreciacion_financiera df
                inner join af_maestro af on af.af_codigo_interno = df.af_codigo_interno
                left join af_agd agd on agd.codigo_agd = af.codigo_agd
                left join saf_2011.dbo.tipo_partida tp on tp.tipo_partida_id = af.tipo_partida_id
                left join saf_2011.dbo.entidad as pro on pro.entidad_id = af.codigo_proveedor
                left join MUNSV as mun on mun.ID = af.cod_municipio
                where df.periodo = @periodoEvaluado
                ");

        }

       

        return response()->json($getCuadro);
        
    }

    public function getCuadroDepreciacionFiscalMensual(Request $request){
        $mes= $request["mes"];
        $anio = $request["anio"];


        $periodoAnterior = '';
        $mesAnterior = '';

        if($mes == '01'){
            $anioAnterior = $anio - 1;
            $periodoAnterior = '12'.$anioAnterior.'';
        }else if($mes == '02'){
            $periodoAnterior = '01'.$anio.'';
        }else if($mes == '03'){
            $periodoAnterior = '02'.$anio.'';
        }else if($mes == '04'){
            $periodoAnterior = '03'.$anio.'';
        }else if($mes == '05'){
            $periodoAnterior = '04'.$anio.'';
        }else if($mes == '06'){
            $periodoAnterior = '05'.$anio.'';
        }else if($mes == '07'){
            $periodoAnterior = '06'.$anio.'';
        }else if($mes == '08'){
            $periodoAnterior = '07'.$anio.'';
        }else if($mes == '09'){
            $periodoAnterior = '08'.$anio.'';
        }else if($mes == '10'){
            $periodoAnterior = '09'.$anio.'';
        }else if($mes == '11'){
            $periodoAnterior = '10'.$anio.'';
        }else if($mes == '12'){
            $periodoAnterior = '11'.$anio.'';
        }

        $periodoEvaluado = $mes.$anio;
        $getCuadro = '';
        if($periodoEvaluado == '122020'){
            $getCuadro =  DB::connection('comanda')->select("
            
            DECLARE @periodoEvaluado varchar(6);

            set @periodoEvaluado= '".$periodoEvaluado."';


            select distinct af.af_codigo_interno as codigo_interno, af.af_codigo_vnr, af.af_codigo_contable,
            descripcion_agd as grupo, convert(varchar, af.fecha_reg_contable, 103) as fechaRegistro,
            tp.tipo_partida_descripcion as tipo_partida,
            af.cuenta_contable, af.descripcion_bien, af.codigo_sucursal as ubicacion,
            convert(varchar, af.fecha_compra, 103) as fecha_compra,
            af.numero_documento, pro.entidad_nombre + ' ' + pro.entidad_apellido as proveedor,
            '$ ' + LTRIM(str(af.af_valor_compra_siva,12,2)) as valor_compra,
            '$ ' + LTRIM(str(af.af_valor_residual,12,2)) as valor_residual,
            str(af.af_tasa_depreciacion_fiscal,12,2) + '%' as tasa_depreciacion,
            af.af_vida_util as vida_util,
            mun.munName as municipio,
            '$ ' + LTRIM(str(df.depre_fiscal_acumulada,12,2)) as depreciacion_acumulada,
            '$ ' + LTRIM(str(0.00,12,2)) as depreciacion_mes,
            '$' + LTRIM(str(df.valor_libros_fiscal,12,2)) as valor_libros
            from af_depreciacion_fiscal df
            inner join af_maestro af on af.af_codigo_interno = df.af_codigo_interno
            left join af_agd agd on agd.codigo_agd = af.codigo_agd
            left join saf_2011.dbo.tipo_partida tp on tp.tipo_partida_id = af.tipo_partida_id
            left join saf_2011.dbo.entidad as pro on pro.entidad_id = af.codigo_proveedor
            left join MUNSV as mun on mun.ID = af.cod_municipio
            where df.periodo = @periodoEvaluado
            ");
    
        }else{

            $execProcedure =  DB::connection('comanda')->statement(
                "exec  [dbo].[af_depre_fiscal_mensual] '".$periodoEvaluado."','".$periodoAnterior."'");


            $getCuadro =  DB::connection('comanda')->select("
            DECLARE @periodoEvaluado varchar(6);
            DECLARE @periodoAnterior varchar(6);
    
            set @periodoEvaluado= '".$periodoEvaluado."';
            set @periodoAnterior= '".$periodoAnterior."';
    
    
            select distinct af.af_codigo_interno as codigo_interno, af.af_codigo_vnr, af.af_codigo_contable,
            descripcion_agd as grupo, convert(varchar, af.fecha_reg_contable, 103) as fechaRegistro,
            tp.tipo_partida_descripcion as tipo_partida,
            af.cuenta_contable, af.descripcion_bien, af.codigo_sucursal as ubicacion,
            convert(varchar, af.fecha_compra, 103) as fecha_compra,
            af.numero_documento, pro.entidad_nombre + ' ' + pro.entidad_apellido as proveedor,
            '$ ' + LTRIM(str(af.af_valor_compra_siva,12,2)) as valor_compra,
            '$ ' + LTRIM(str(af.af_valor_residual,12,2)) as valor_residual,
            str(af.af_tasa_depreciacion_fiscal,12,2) + '%' as tasa_depreciacion,
            af.af_vida_util as vida_util,
            mun.munName as municipio,
            '$ ' + LTRIM(str(df.depre_fiscal_acumulada,12,2)) as depreciacion_acumulada,
            '$ ' + LTRIM(str(
            (select top 1  (df.depre_fiscal_acumulada) - (depre_fiscal_acumulada) from af_depreciacion_fiscal
            where periodo = @periodoAnterior and af_codigo_interno = df.af_codigo_interno
            order by id desc),12,2)) as depreciacion_mes,
            '$' + LTRIM(str(df.valor_libros_fiscal,12,2)) as valor_libros
            from af_depreciacion_fiscal df
            inner join af_maestro af on af.af_codigo_interno = df.af_codigo_interno
            left join af_agd agd on agd.codigo_agd = af.codigo_agd
            left join saf_2011.dbo.tipo_partida tp on tp.tipo_partida_id = af.tipo_partida_id
            left join saf_2011.dbo.entidad as pro on pro.entidad_id = af.codigo_proveedor
            left join MUNSV as mun on mun.ID = af.cod_municipio
            where df.periodo = @periodoEvaluado
            ");
        }

       


       
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
        (select count(af_codigo_interno) from af_maestro where descripcion_bien = af.descripcion_bien
        and estado != 'B' and estadoActivo  = 'Activo') as cantidad,

        '$'+''+str(
        (select top 1 af_valor_vnr_siva from af_maestro where descripcion_bien = af.descripcion_bien
        order by af_valor_vnr_siva desc),12,2)
        as PU,

        '$'+''+str(sum(af.af_valor_vnr_siva),12,2) as monto,

        (select top 1 numero_documento from af_maestro where descripcion_bien = af.descripcion_bien
        order by af_valor_vnr_siva desc)as numeroFactura,

        (select top 1 cuenta_hija from af_maestro where descripcion_bien = af.descripcion_bien
        order by af_valor_vnr_siva desc)as cuenta

        from af_maestro af
        left join af_tipo_ppye atp on atp.cod_ppye = af.codigo_ppye
        where af.estado != 'B' and af.estadoActivo  = 'Activo'
        and af.fecha_compra between '".$fecha1ConFormato." 00:00:00' and '".$fecha2ConFormato." 23:59:59'
        group by  af.descripcion_bien,  atp.cod_ppye,atp.tipo_bien,atp.siglas,af.codigo_ppye
		order by 1 asc");

        return response()->json($getCuadro);
    }


    public function reporte_agd_excel(Request $request)
    {



        $fecha1= json_decode($request["fechaInicioAGD"]);
        $fecha2 = json_decode($request["fechaFinAGD"]);

        $fecha1SinFormato = date_create_from_format('Y-m-d',$fecha1);

        $fecha1ConFormato = date_format($fecha1SinFormato,'Ymd');

        $fecha2SinFormato = date_create_from_format('Y-m-d',$fecha2);

        $fecha2ConFormato = date_format($fecha2SinFormato,'Ymd');


        $getCuadro =  DB::connection('comanda')->select("SELECT af.descripcion_bien as descripcion,
        atp.tipo_bien+' '+atp.siglas as codigo,
        (select count(af_codigo_interno) from af_maestro where descripcion_bien = af.descripcion_bien
        and estado != 'B' and estadoActivo  = 'Activo') as cantidad,

        '$'+''+str(
        (select top 1 af_valor_vnr_siva from af_maestro where descripcion_bien = af.descripcion_bien
        order by af_valor_vnr_siva desc),12,2)
        as PU,

        '$'+''+str(sum(af.af_valor_vnr_siva),12,2) as monto,

        (select top 1 numero_documento from af_maestro where descripcion_bien = af.descripcion_bien
        order by af_valor_vnr_siva desc)as numeroFactura,

        (select top 1 cuenta_hija from af_maestro where descripcion_bien = af.descripcion_bien
        order by af_valor_vnr_siva desc)as cuenta

        from af_maestro af
        left join af_tipo_ppye atp on atp.cod_ppye = af.codigo_ppye
        where af.estado != 'B' and af.estadoActivo  = 'Activo'
        and af.fecha_compra between '".$fecha1ConFormato." 00:00:00' and '".$fecha2ConFormato." 23:59:59'
        group by  af.descripcion_bien, atp.cod_ppye, atp.tipo_bien,atp.siglas,af.codigo_ppye
		order by 1 asc");

       

      
        return response()->download(Excel::create('reporteAgd', function($excel) use($getCuadro) {
            $excel->sheet('detalles', function($sheet) use($getCuadro) {



                $sheet->loadView('Reportes.reporte_agd_excel')
                    ->with('activos_agd',$getCuadro);


            });
        })->export('xls'));
    }



    public function exportar_excel_fiscal(Request $request)
    {
       
        $mes= json_decode($request["mes"]);
        $anio = json_decode($request["anio"]);


        $periodoAnterior = '';
        $mesAnterior = '';

        if($mes == '01'){
            $anioAnterior = $anio - 1;
            $periodoAnterior = '12'.$anioAnterior.'';
        }else if($mes == '02'){
            $periodoAnterior = '01'.$anio.'';
        }else if($mes == '03'){
            $periodoAnterior = '02'.$anio.'';
        }else if($mes == '04'){
            $periodoAnterior = '03'.$anio.'';
        }else if($mes == '05'){
            $periodoAnterior = '04'.$anio.'';
        }else if($mes == '06'){
            $periodoAnterior = '05'.$anio.'';
        }else if($mes == '07'){
            $periodoAnterior = '06'.$anio.'';
        }else if($mes == '08'){
            $periodoAnterior = '07'.$anio.'';
        }else if($mes == '09'){
            $periodoAnterior = '08'.$anio.'';
        }else if($mes == '10'){
            $periodoAnterior = '09'.$anio.'';
        }else if($mes == '11'){
            $periodoAnterior = '10'.$anio.'';
        }else if($mes == '12'){
            $periodoAnterior = '11'.$anio.'';
        }

        $periodoEvaluado = $mes.$anio;

        $getCuadro = '';
        if($periodoEvaluado == '122020'){

            $getCuadro =  DB::connection('comanda')->select("
        DECLARE @periodoEvaluado varchar(6);

        set @periodoEvaluado= '".$periodoEvaluado."';


        select distinct af.af_codigo_interno as codigo_interno, af.af_codigo_vnr, af.af_codigo_contable,
        descripcion_agd as grupo, convert(varchar, af.fecha_reg_contable, 103) as fechaRegistro,
        tp.tipo_partida_descripcion as tipo_partida,
        af.cuenta_contable, af.descripcion_bien, af.codigo_sucursal as ubicacion,
        convert(varchar, af.fecha_compra, 103) as fecha_compra,
        af.numero_documento, pro.entidad_nombre + ' ' + pro.entidad_apellido as proveedor,
        '$ ' + LTRIM(str(af.af_valor_compra_siva,12,2)) as valor_compra,
        '$ ' + LTRIM(str(af.af_valor_residual,12,2)) as valor_residual,
        str(af.af_tasa_depreciacion_fiscal,12,2) + '%' as tasa_depreciacion,
        af.af_vida_util as vida_util,
        mun.munName as municipio,
        '$ ' + LTRIM(str(df.depre_fiscal_acumulada,12,2)) as depreciacion_acumulada,
        '$ ' + LTRIM(str(0.00,12,2)) as depreciacion_mes,
        '$' + LTRIM(str(df.valor_libros_fiscal,12,2)) as valor_libros
        from af_depreciacion_fiscal df
        inner join af_maestro af on af.af_codigo_interno = df.af_codigo_interno
        left join af_agd agd on agd.codigo_agd = af.codigo_agd
        left join saf_2011.dbo.tipo_partida tp on tp.tipo_partida_id = af.tipo_partida_id
        left join saf_2011.dbo.entidad as pro on pro.entidad_id = af.codigo_proveedor
        left join MUNSV as mun on mun.ID = af.cod_municipio
        where df.periodo = @periodoEvaluado
        ");

        }else{
            $getCuadro =  DB::connection('comanda')->select("
            DECLARE @periodoEvaluado varchar(6);
            DECLARE @periodoAnterior varchar(6);
    
            set @periodoEvaluado= '".$periodoEvaluado."';
            set @periodoAnterior= '".$periodoAnterior."';
    
    
            select distinct af.af_codigo_interno as codigo_interno, af.af_codigo_vnr, af.af_codigo_contable,
            descripcion_agd as grupo, convert(varchar, af.fecha_reg_contable, 103) as fechaRegistro,
            tp.tipo_partida_descripcion as tipo_partida,
            af.cuenta_contable, af.descripcion_bien, af.codigo_sucursal as ubicacion,
            convert(varchar, af.fecha_compra, 103) as fecha_compra,
            af.numero_documento, pro.entidad_nombre + ' ' + pro.entidad_apellido as proveedor,
            '$ ' + LTRIM(str(af.af_valor_compra_siva,12,2)) as valor_compra,
            '$ ' + LTRIM(str(af.af_valor_residual,12,2)) as valor_residual,
            str(af.af_tasa_depreciacion_fiscal,12,2) + '%' as tasa_depreciacion,
            af.af_vida_util as vida_util,
            mun.munName as municipio,
            '$ ' + LTRIM(str(df.depre_fiscal_acumulada,12,2)) as depreciacion_acumulada,
            '$ ' + LTRIM(str(
            (select top 1  (df.depre_fiscal_acumulada) - (depre_fiscal_acumulada) from af_depreciacion_fiscal
            where periodo = @periodoAnterior and af_codigo_interno = df.af_codigo_interno
            order by id desc),12,2)) as depreciacion_mes,
            '$' + LTRIM(str(df.valor_libros_fiscal,12,2)) as valor_libros
            from af_depreciacion_fiscal df
            inner join af_maestro af on af.af_codigo_interno = df.af_codigo_interno
            left join af_agd agd on agd.codigo_agd = af.codigo_agd
            left join saf_2011.dbo.tipo_partida tp on tp.tipo_partida_id = af.tipo_partida_id
            left join saf_2011.dbo.entidad as pro on pro.entidad_id = af.codigo_proveedor
            left join MUNSV as mun on mun.ID = af.cod_municipio
            where df.periodo = @periodoEvaluado
            ");
        }

        

       // return response()->json($mes);

      
       return response()->download(Excel::create('reporteFiscal', function($excel) use($getCuadro) {
            $excel->sheet('detalles', function($sheet) use($getCuadro) {



                $sheet->loadView('Reportes.reporte_fiscal_excel')
                    ->with('activos',$getCuadro);
            });
        })->export('xls'));
    }


    public function exportar_excel_financiera(Request $request){
        $mes= json_decode($request["mes"]);
        $anio = json_decode($request["anio"]);


        $periodoAnterior = '';
        $mesAnterior = '';

        if($mes == '01'){
            $anioAnterior = $anio - 1;
            $periodoAnterior = '12'.$anioAnterior.'';
        }else if($mes == '02'){
            $periodoAnterior = '01'.$anio.'';
        }else if($mes == '03'){
            $periodoAnterior = '02'.$anio.'';
        }else if($mes == '04'){
            $periodoAnterior = '03'.$anio.'';
        }else if($mes == '05'){
            $periodoAnterior = '04'.$anio.'';
        }else if($mes == '06'){
            $periodoAnterior = '05'.$anio.'';
        }else if($mes == '07'){
            $periodoAnterior = '06'.$anio.'';
        }else if($mes == '08'){
            $periodoAnterior = '07'.$anio.'';
        }else if($mes == '09'){
            $periodoAnterior = '08'.$anio.'';
        }else if($mes == '10'){
            $periodoAnterior = '09'.$anio.'';
        }else if($mes == '11'){
            $periodoAnterior = '10'.$anio.'';
        }else if($mes == '12'){
            $periodoAnterior = '11'.$anio.'';
        }

        $periodoEvaluado = $mes.$anio;

        $getCuadro = '';
        if($periodoEvaluado == '122020'){
            $getCuadro =  DB::connection('comanda')->select("
            DECLARE @periodoEvaluado varchar(6);
    
            set @periodoEvaluado= '".$periodoEvaluado."';
    
    
            select distinct af.af_codigo_interno as codigo_interno,af.af_codigo_vnr, af.af_codigo_contable,
            descripcion_agd as grupo, convert(varchar, af.fecha_reg_contable, 103) as fechaRegistro,
            tp.tipo_partida_descripcion as tipo_partida,
            af.cuenta_contable, af.descripcion_bien, af.codigo_sucursal as ubicacion,
            convert(varchar, af.fecha_compra, 103) as fecha_compra,
            af.numero_documento, pro.entidad_nombre + ' ' + pro.entidad_apellido as proveedor,
            '$ ' + LTRIM(str(af.af_valor_compra_siva,12,2)) as valor_compra,
            '$ ' + LTRIM(str(af.af_valor_residual,12,2)) as valor_residual,
            str(af.af_tasa_depreciacion_financ,12,2) + '%' as tasa_depreciacion,
            af.af_vida_util as vida_util,
            mun.munName as municipio,
            '$ ' + LTRIM(str(df.depre_financ_acumulada,12,2)) as depreciacion_acumulada,
            '$ ' + LTRIM(str(0.00,12,2)) as depreciacion_mes,
            '$' + LTRIM(str(df.valor_libros_financ,12,2)) as valor_libros
            from af_depreciacion_financiera df
            inner join af_maestro af on af.af_codigo_interno = df.af_codigo_interno
            left join af_agd agd on agd.codigo_agd = af.codigo_agd
            left join saf_2011.dbo.tipo_partida tp on tp.tipo_partida_id = af.tipo_partida_id
            left join saf_2011.dbo.entidad as pro on pro.entidad_id = af.codigo_proveedor
            left join MUNSV as mun on mun.ID = af.cod_municipio
            where df.periodo = @periodoEvaluado
            ");
        }else{
            $getCuadro =  DB::connection('comanda')->select("
            DECLARE @periodoEvaluado varchar(6);
            DECLARE @periodoAnterior varchar(6);
    
            set @periodoEvaluado= '".$periodoEvaluado."';
            set @periodoAnterior= '".$periodoAnterior."';
    
    
            select distinct af.af_codigo_interno as codigo_interno,af.af_codigo_vnr, af.af_codigo_contable,
            descripcion_agd as grupo, convert(varchar, af.fecha_reg_contable, 103) as fechaRegistro,
            tp.tipo_partida_descripcion as tipo_partida,
            af.cuenta_contable, af.descripcion_bien, af.codigo_sucursal as ubicacion,
            convert(varchar, af.fecha_compra, 103) as fecha_compra,
            af.numero_documento, pro.entidad_nombre + ' ' + pro.entidad_apellido as proveedor,
            '$ ' + LTRIM(str(af.af_valor_compra_siva,12,2)) as valor_compra,
            '$ ' + LTRIM(str(af.af_valor_residual,12,2)) as valor_residual,
            str(af.af_tasa_depreciacion_financ,12,2) + '%' as tasa_depreciacion,
            af.af_vida_util as vida_util,
            mun.munName as municipio,
            '$ ' + LTRIM(str(df.depre_financ_acumulada,12,2)) as depreciacion_acumulada,
            '$ ' + LTRIM(str(
            (select top 1  (df.depre_financ_acumulada) - (depre_financ_acumulada) from af_depreciacion_financiera
            where periodo = @periodoAnterior and af_codigo_interno = df.af_codigo_interno
            order by id desc),12,2)) as depreciacion_mes,
            '$' + LTRIM(str(df.valor_libros_financ,12,2)) as valor_libros
            from af_depreciacion_financiera df
            inner join af_maestro af on af.af_codigo_interno = df.af_codigo_interno
            left join af_agd agd on agd.codigo_agd = af.codigo_agd
            left join saf_2011.dbo.tipo_partida tp on tp.tipo_partida_id = af.tipo_partida_id
            left join saf_2011.dbo.entidad as pro on pro.entidad_id = af.codigo_proveedor
            left join MUNSV as mun on mun.ID = af.cod_municipio
            where df.periodo = @periodoEvaluado
            ");
        }


        

        return response()->download(Excel::create('reporteFinanciero', function($excel) use($getCuadro) {
            $excel->sheet('detalles', function($sheet) use($getCuadro) {



                $sheet->loadView('Reportes.reporte_financiero_excel')
                    ->with('activos',$getCuadro);
            });
        })->export('xls'));

    }


}