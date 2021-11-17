<?php
class AdminC{

  public function IngresoC($user, $pass, $response){
      $ingreso = new adminM();
      $ingreso->table = "usuarios";
      $ingreso->info = $user;
      $res = $ingreso->IngresoM();
      if ($res["usuario"] == $user && $res["clave"] == $pass){
            session_start();
                $_SESSION["Ingreso"] = true;
                $response->reqStatus = true;
                $response->route = 'config-colect.html';
                $response->messDelayTime = 0;
      }else{
        $response->reqStatus = false;
        $response->message = 'Usuario o Contraseña incorrecto.';
        $response->messDelayTime = 2000;
      }
  }
}

 ?>
