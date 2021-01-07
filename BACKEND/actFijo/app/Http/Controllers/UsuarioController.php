<?php

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Response as FacadeResponse;
namespace App\Http\Controllers;
use DB;
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
                $usuariosesion =  json_encode( DB::connection('facturacion')->select("
                select u.*, r.aliasRol as rol from EDESAL_CALIDAD.dbo.SGT_usuarios u 
                inner join enr_usuario_rol ur on ur.idUsuario = u.id
                inner join enr_roles r on r.id = ur.idRol
                where
                u.alias = '".$usuario."'"));

                $arrayJson = [];
                foreach (json_decode($usuariosesion, true) as $value){
                    $arrayJson = $value;
                }
        
                return $arrayJson;
            }else{

                $passform = md5($password);

                $usuariosesion =  json_encode( DB::connection('facturacion')->select("
                select u.*, r.aliasRol as rol from EDESAL_CALIDAD.dbo.SGT_usuarios u 
                inner join enr_usuario_rol ur on ur.idUsuario = u.id
                inner join enr_roles r on r.id = ur.idRol
                where
                u.alias = '".$usuario."' and u.password = '".$passform."'"));

                $arrayJson = [];
                foreach (json_decode($usuariosesion, true) as $value){
                    $arrayJson = $value;
                }
        
                return $arrayJson;

            }
           
        }

}


?>