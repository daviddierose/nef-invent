<?php

class AdminC{

  public function IngresoC(){
    if(isset($_POST["usuarioI"])){
      $datosC = array("usuario"=>$_POST["usuarioI"], "clave"=>$_POST["claveI"]);
      $tableBD = "usuarios";
      $respuesta = AdminM::IngresoM($datosC, $tableBD);
      if ($respuesta["usuario"] == $_POST["usuarioI"] && $respuesta["clave"] == $_POST["claveI"]){
            session_start();
                $_SESSION["Ingreso"] = true;
                header("location:index.php?ruta=config");
      }else{
        echo "ERROR AL INGRESAR";
      }
    }
  }

  public function readColectoresC(){
      $tableBD = "colectores";
      $respuesta = AdminM::readColectoresM($tableBD);
      foreach ($respuesta as $key => $value){
          echo '<option value="'.++$key.'">'.$value["nombre"].'</option>';
      }
  }

  public function readConfigOptionC(){
      $tableBD = "option_config";
      $respuesta = AdminM::readConfigOptionM($tableBD);
      foreach ($respuesta as $key => $value){
          echo '<option value="'.++$key.'">'.$value["configuración"].'</option>';
      }
  }

}

 ?>
