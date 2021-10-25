<?php
  require_once "../mo/colectorm.php";
  require_once "../mo/mcript.php";

  class colectorC{
    public function readColectorsLenghtC(){
      $table = "colectores";
      $response = colectorM::readColectorsLenghtM($table);
      $jsonString = json_encode(intval($response));
      echo $jsonString;
    }

    public function changeColectorStatusC($colector, $status){
      if($status == 0 || $status == 1){
        $table = "colectores";
        $colLength = colectorM::readColectorsLenghtM($table);
        if($colector > 0 && $colector <= $colLength){
          if($status == 0){
            $staToggle = 1;
          }else if($status == 1){
            $staToggle = 0;
          }
          $response = colectorM::changeColectorStatusM($colector, $staToggle);
          $jsonString = json_encode($response);
          echo $jsonString;
        }else{
          echo "El colector no existe en el listado. Refresca la página e intenta de nuevo";
        }
      }else{
        echo "Status no reconocido. Refresaca la página e intenta de nuevo.";
      }
    }

    public function registerColectorC($codeReg){
      $tables = array('codigos_registro', 'colectores');
      $verif = colectorM::verificarStatusCodRegM($tables, $codeReg);
      $length = count($verif);
      if($length == 0){
        $respuesta = array("El código de registro no es valido.");
      }else{
        if($verif[0]['status'] == 1){
          $respuesta = array("El código de registro ya está en uso.");
        }else{
          $respuesta = colectorM::registerColectorM($tables, $codeReg, $verif);
        }
      }

      $jsonString = json_encode($respuesta);
      echo $jsonString;
    }

    public function verificarStatusCodRegC($codeRegIn){
      $codeReg = desencriptar($codeRegIn);
      $tables = array('codigos_registro', 'colectores');
      $verif = colectorM::verificarStatusCodRegM($tables, $codeReg);
      $length = count($verif);
      if($length == 0){
        $respuesta = "El colector está mal configurado, habla con tu departamente ténico.";
      }else{
        if($verif[0]['status'] == 1){
          $respuesta = true;
        }
      }
      $jsonString = json_encode($respuesta);
      echo $jsonString;
  }
}

 ?>
