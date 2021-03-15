<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;


date_default_timezone_set("America/El_Salvador");

class AdministradorActivosVNRController extends Controller
{


     //metodo para mostrar activos tipo alta para administradores en base de datos COMANDA
     public function getAltasAdmin(){
      
        $getMisActivos = 
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
        order by id desc ) as usuarioAnterior from af_maestro af
        inner join users u on u.id = af.codigo_asignado 
        INNER JOIN af_marcas as marca ON marca.codigo_marca = af.codigo_marca
        INNER JOIN af_modelos as modelo ON modelo.codigo_modelo = af.codigo_modelo
        where af.estado = 'A' and af.estadoActivo = 'Activo' and af.solo_vnr = 'S'
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
        where af.estado = 'B' and af.estadoActivo = 'Activo' and af.solo_vnr = 'S'
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
        marca.nombre_marca as marcaAf, modelo.nombre_modelo as modeloAf,
        (select top 1 convert(varchar, fecha_movimiento, 103) from af_historial_activo
        where movimiento != 'Baja' and idActivo = af.af_codigo_interno
        order by id desc ) as fechaTraslado,
        (select top 1 substring(convert(varchar,fecha_movimiento, 114),1,5) from af_historial_activo
        where movimiento != 'Baja' and idActivo = af.af_codigo_interno
        order by id desc ) as horaTraslado
        
         from af_maestro af
      
         INNER JOIN af_marcas as marca ON marca.codigo_marca = af.codigo_marca
         INNER JOIN af_modelos as modelo ON modelo.codigo_modelo = af.codigo_modelo
        inner join users u on u.id = af.codigo_asignado 
        where af.estado = 'T' and af.estadoActivo = 'Activo' and af.solo_vnr = 'S'
        order by af_codigo_interno desc");

        return response()->json($getMisActivos);
    }

        //metodo para obtener conteo de badges en vista de administrador
        public function getConteoAdmin(){
            $getConteoAdmin = 
            DB::connection('comanda')->select("select 
            (select count(af_codigo_interno) from af_maestro where estado = 'A' and estadoActivo = 'Activo'
            and solo_vnr = 'S') as conteoAltas,
            (select count(af_codigo_interno) from af_maestro where estado = 'T' and estadoActivo = 'Activo'
            and solo_vnr = 'S') as conteoTraslados,
            (select count(af_codigo_interno) from af_maestro where estado = 'B' and estadoActivo = 'Activo'
            and solo_vnr = 'S') as conteoBajas");
    
            return response()->json($getConteoAdmin);
        }
}


?>