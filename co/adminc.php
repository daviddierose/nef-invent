<?php
class AdminC{

  public function IngresoC($user, $pass, $response){
      $datosC = array("usuario"=>$user, "clave"=>$pass);
      $tableBD = "usuarios";
      $respuesta = AdminM::IngresoM($datosC, $tableBD);
      if ($respuesta["usuario"] == $user && $respuesta["clave"] == $pass){
            session_start();
                $_SESSION["Ingreso"] = true;
                $response->reqStatus = true;
                $response->route = '?ruta=config-colect';
      }else{
        $response->reqStatus = false;
        $response->message = 'Usuario o Contraseña incorrecto.';
        $response->messDelayTime = 2000;
      }
  }

  public function readColectoresC(){
      $ruta = $_GET["ruta"];
      $tableBD = "colectores";
      $respuesta = AdminM::readColectoresM($tableBD);
      if($ruta == "config-colect"){
        foreach ($respuesta as $key => $value){
            echo '<option value="'.++$key.'">'.$value["nombre"].'</option>';
        }
      }else if($ruta == "config-admin"){
        foreach ($respuesta as $key => $value) {
          $val = ++$key;
          if($value["status"] == 1){
            $status = "on";
            $color = "primary";
          }else{
            $status = "off";
            $color = "danger";
          }
          echo '<li id="" class="">
                  <a class="nav-link text-uppercase text-decoration-none d-flex text-gray pl-5" href="#">
                    <div class="">
                      <button type="button" class="btn btn-sm bg-'.$color.'
                        rounded-pill shadow-sm py-auto text-light text-uppercase btn-switch"
                        id="btn-switch'.$key.'" value="'.$key.'" status="'.$value["status"].'">
                        '.$status.'
                      </button>
                    </div>
                    <span class="ml-3">'.$value["nombre"].'</span>
                    <i class="text-success fas fa-check-circle d-none" id="checkgood'.$key.'"></i>
                  </a>
                </li>';
        }
      }
  }

}

 ?>
