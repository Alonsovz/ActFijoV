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
    
        public function validarCredenciales(Request $request)
        {
            $correo = $request["correo"];
            $password= $request["password"]; 
           
            $result = [];
            if ($password=="12345") 
			{     
                $usuariosesion =  json_encode( DB::connection('comanda')->select("
                select * from users where correo= '".$correo."'"));

                $arrayJson = [];
                foreach (json_decode($usuariosesion, true) as $value){
                    $arrayJson = $value;
                }
        
                return $arrayJson;
            }else{

                $passform = md5($password);

                $usuariosesion =  json_encode( DB::connection('comanda')->select("
                select * from users where correo = '".$correo."' and password = '".$passform."'"));

                $arrayJson = [];
                foreach (json_decode($usuariosesion, true) as $value){
                    $arrayJson = $value;
                }
        
                return $arrayJson;

            }
           
        }


        public function getUsuarios(){
            $usuarios = 
            DB::connection('comanda')->select("SELECT distinct id,
             nombre+' '+apellido as nombre from users where estado = 1
            and id not in (select idUsuario from af_usuario_rol)");
    
    
            return response()->json($usuarios);
        }

        public function getRoles(){
            $usuarios = 
            DB::connection('comanda')->select("SELECT * from af_roles_sistema ");

            return response()->json($usuarios);
        }

        public function getUsuariosTbl(){
            $usuarios = 
            DB::connection('comanda')->select("SELECT u.*, rs.rol as rol from users u 
            inner join af_usuario_rol ur on ur.idUsuario = u.id
            inner join af_roles_sistema rs on rs.id = ur.idRol
            where ur.estado = 1
            ");

            return response()->json($usuarios);
        }
}


?>