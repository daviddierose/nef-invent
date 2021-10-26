<?php
require_once "../mo/inventorym.php";
class inventoryC{
  public function reviewStatusInventoryC(){
    $tabla = "inventarios";
    $response = inventoryM::reviewStatusInventoryM($tabla);
    $length = count($response) - 1;
    if($response[$length]['status'] == 1){
      $res = true;
    }else{
      $res = 'No existe un inventario activo. No puedes ingresar códigos';
    }
    $jsonString = json_encode($res);
    echo $jsonString;
  }
}

 ?>
