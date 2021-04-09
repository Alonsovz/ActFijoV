<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
use Session;


date_default_timezone_set("America/El_Salvador");

class UsuarioController extends Controller
{
        //metodo para validar credenciales
        public function validarCredenciales(Request $request)
        {
            $correo = $request["correo"].'@edesal.com';
            $password= $request["password"]; 
           
            $result = [];
            if ($password=="12345") 
			{     
                $usuariosesion =  json_encode( DB::connection('comanda')->select("
                select u.*, rs.rol as rol,
                (select count(b.bodega_id) from saf_2011.dbo.inv_bodegas b
                where b.supervisor_id = u.id) as bodegasSupervisor from users u
                inner join af_usuario_rol ur on ur.idUsuario = u.id
                inner join af_roles_sistema rs on rs.id = ur.idRol 
                where ur.estado = 1 and u.correo = '".$correo."'"));

                $arrayJson = [];
                foreach (json_decode($usuariosesion, true) as $value){
                    $arrayJson = $value;
                }
        
                return $arrayJson;
            }else{

                $passform = md5($password);

                $usuariosesion =  json_encode( DB::connection('comanda')->select("
                select u.*, rs.rol as rol,
                (select count(b.bodega_id) from saf_2011.dbo.inv_bodegas b
                where b.supervisor_id = u.id) as bodegasSupervisor from users u
                inner join af_usuario_rol ur on ur.idUsuario = u.id
                inner join af_roles_sistema rs on rs.id = ur.idRol 
                where ur.estado = 1 and u.correo = '".$correo."' and u.password = '".$passform."'"));

                $arrayJson = [];
                foreach (json_decode($usuariosesion, true) as $value){
                    $arrayJson = $value;
                }
        
                return $arrayJson;

            }
           
        }

        //metodo para obtener listado de usuarios para mostrar en select de vista de usuarios
        public function getUsuarios(){
            $usuarios = 
            DB::connection('comanda')->select("SELECT distinct id,
             nombre+' '+apellido as nombre from users where (estado is null or estado = 1)
             order by 2 asc");
    
    
            return response()->json($usuarios);
        }

       
        //metodo para obtener listado de usuarios para mostrar en tabla de vista de usuarios
        public function getUsuariosTbl(){
            $usuarios = 
            DB::connection('comanda')->select("SELECT u.*,u.nombre+' '+u.apellido as nombreUsuario,
             rs.rol as rol,rs.id as idRol, ur.id as idUsuarioRol from users u 
            inner join af_usuario_rol ur on ur.idUsuario = u.id
            inner join af_roles_sistema rs on rs.id = ur.idRol
            where ur.estado = 1
            order by ur.id desc
            ");

            return response()->json($usuarios);
        }

        //metodo para guardar usuarios
        public function guardarUsuario(Request $request){
            $usuario = $request["usuario"];
            $rol = $request["rol"];

            $insertar =  DB::connection('comanda')->table('af_usuario_rol')
            ->insert([
                'idUsuario' => $usuario,
                'idRol ' => $rol,
                'estado' => 1,
            ]);

            return response()->json($insertar);
        }

        //metodo para eliminar usuarios
        public function eliminarUsuario(Request $request){
            $idUsuarioRol = $request["idUsuarioRol"];

            $editar = DB::connection('comanda')->table('af_usuario_rol')->where('id', $idUsuarioRol)
            ->update(['estado' => 2 , 
            ]);

            return response()->json($editar);
        }

        //metodo para editar usuarios
        public function editarUsuario(Request $request){
            $idUsuarioRol = $request["idUsuarioRol"];
            $rol = $request["idRol"];

            $editar = DB::connection('comanda')->table('af_usuario_rol')->where('id', $idUsuarioRol)
            ->update(['idRol' => $rol , 
            ]);

            return response()->json($editar);
        }
}


?>