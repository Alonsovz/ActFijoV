<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;


date_default_timezone_set("America/El_Salvador");

class SupervisorActivosController extends Controller
{


      //metodo para mostrar activos de tipo alta para supervisor
     public function getAltasSupervisor(Request $request){
        $idSupervisor = $request["id"];

        $getActivosSupervisor = 
        DB::connection('comanda')->select("select af.*,
        '$'+str(af.af_valor_compra_siva,12,2) as compraSiva,
        convert(varchar(10),af.fecha_compra, 23) as fechaCompra,
        convert(varchar(10),af.fecha_compra, 103) as fechaCompraT,
        convert(varchar, af.fecha_alta, 103) as fechaAlta,
         substring(convert(varchar,af.fecha_alta, 114),1,5) as horaAlta,
        marca.nombre_marca as marcaAf, modelo.nombre_modelo as modeloAf,
        convert(varchar(10),af.fecha_reg_contable, 23) as fechaRegistro, u.alias as asignado, af.estado as estadoAc,
        (select top 1 usuario_asignado from af_historial_activo
        where movimiento != 'Baja' and idActivo = af.af_codigo_interno
        order by id desc ) as usuarioAnterior,
        b.descripcion as nomBodega from af_maestro af
        inner join users u on u.id = af.codigo_asignado 
        INNER JOIN af_marcas as marca ON marca.codigo_marca = af.codigo_marca
        INNER JOIN af_modelos as modelo ON modelo.codigo_modelo = af.codigo_modelo
        inner join saf_2011.dbo.inv_bodegas as b on b.bodega_id = af.bodega_id
        where af.estado = 'A' and af.estadoActivo = 'Activo'
        and b.supervisor_id = ".$idSupervisor."
        order by af_codigo_interno desc
        ");

        return response()->json($getActivosSupervisor);
    }

    //metodo para mostrar activos de tipo traslado para supervisor
    public function getTrasladosSupervisor(Request $request){
      $idSupervisor = $request["id"];
         
        $getActivosSupervisor = 
        DB::connection('comanda')->select("
        select distinct af.*,
       '$'+str(af.af_valor_compra_siva,12,2) as compraSiva,
       convert(varchar(10),af.fecha_compra, 23) as fechaCompra,
       convert(varchar(10),af.fecha_reg_contable, 23) as fechaRegistro, u.alias as asignado, af.estado as estadoAc,
       (select top 1 usuario_movimiento from af_historial_activo
       where movimiento != 'Baja' and idActivo = af.af_codigo_interno
       order by id desc ) as usuarioAnterior,
       marca.nombre_marca as marcaAf, modelo.nombre_modelo as modeloAf,
       (select top 1 convert(varchar, fecha_movimiento, 103) from af_historial_activo
       where movimiento != 'Baja' and idActivo = af.af_codigo_interno
       order by id desc ) as fechaTraslado,
       (select top 1 substring(convert(varchar,fecha_movimiento, 114),1,5) from af_historial_activo
       where movimiento != 'Baja' and idActivo = af.af_codigo_interno
       order by id desc ) as horaTraslado,
       b.descripcion as nomBodega  from af_maestro af
       INNER JOIN af_marcas as marca ON marca.codigo_marca = af.codigo_marca
       INNER JOIN af_modelos as modelo ON modelo.codigo_modelo = af.codigo_modelo
        inner join users u on u.id = af.codigo_asignado 
        inner join saf_2011.dbo.inv_bodegas as b on b.bodega_id = af.bodega_id
        where af.estado = 'T' and af.estadoActivo = 'Activo'
         and b.supervisor_id = ".$idSupervisor."
        order by af_codigo_interno desc");

        return response()->json($getActivosSupervisor);
    }

     //metodo para mostrar activos de tipo baja para supervisor
    public function getBajasSupervisor(Request $request){
        $idSupervisor = $request["id"];
        
        $getActivosSupervisor = 
        DB::connection('comanda')->select("  select af.*,
        '$'+str(af.af_valor_compra_siva,12,2) as compraSiva,
        convert(varchar(10),af.fecha_compra, 23) as fechaCompra,
        convert(varchar(10),af.fecha_compra, 103) as fechaCompraT,
        convert(varchar, af.fecha_baja, 103) as fechaBaja,
         substring(convert(varchar,af.fecha_baja, 114),1,5) as horaBaja,
        convert(varchar(10),af.fecha_reg_contable, 23) as fechaRegistro, u.alias as asignado, af.estado as estadoAc,
        (select top 1 usuario_asignado from af_historial_activo
        where movimiento != 'Baja' and idActivo = af.af_codigo_interno
        order by id desc ) as usuarioAnterior,
        b.descripcion as nomBodega  from af_maestro af
        inner join users u on u.id = af.codigo_asignado 
        inner join saf_2011.dbo.inv_bodegas as b on b.bodega_id = af.bodega_id
        where af.estado = 'B' and af.estadoActivo = 'Activo'
         and b.supervisor_id = ".$idSupervisor."
        order by af_codigo_interno desc");

        return response()->json($getActivosSupervisor);
    }


     //metodo para obtener conteo de badges en vista de administrador
     public function getConteoSupervisor(Request $request){
        $idSupervisor = $request["id"];
        
        $getConteo = 
        DB::connection('comanda')->select("select 
        (select count(af.af_codigo_interno) 
        from af_maestro af
        inner join saf_2011.dbo.inv_bodegas as b on b.bodega_id = af.bodega_id
        where af.estado = 'A' and af.estadoActivo = 'Activo' and b.supervisor_id = ".$idSupervisor.") as conteoAltas,


        (select count(af.af_codigo_interno) 
        from af_maestro af
        inner join saf_2011.dbo.inv_bodegas as b on b.bodega_id = af.bodega_id
        where af.estado = 'T' and af.estadoActivo = 'Activo' and b.supervisor_id = ".$idSupervisor.")
         as conteoTraslados,

         (select count(af.af_codigo_interno) 
         from af_maestro af
         inner join saf_2011.dbo.inv_bodegas as b on b.bodega_id = af.bodega_id
         where af.estado = 'B' and af.estadoActivo = 'Activo' and b.supervisor_id = ".$idSupervisor.")
        as conteoBajas");

        return response()->json($getConteo);
    }



  
}