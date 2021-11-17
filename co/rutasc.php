<?php
require_once (getcwd()."/mo/rutasm.php");

class rutasControlador{
  public function Plantilla(){
    include "vistas/templates/general-template.php";
  }

  public function Rutas(){
    if(isset($_GET["ruta"])){
      $rutas = $_GET["ruta"];
    }
    else{
      $rutas = "index";
    }

    $respuesta  = Modelo::rutasModelo($rutas);
    include $respuesta;
  }

  public function menusColect2R(){
    if(isset($_GET["ruta"])){
      $rutas = $_GET["ruta"];
    }
    else{
      $rutas = "index";
    }

    $respuesta = Modelo::menusColect2M($rutas);
    echo $respuesta;
  }

  public function headTittlesR(){
    if(isset($_GET["ruta"])){
      $rutas = $_GET["ruta"];
    }
    else{
      $rutas = "index";
    }

    $respuesta = Modelo::headTittlesM($rutas);
    echo $respuesta;
  }

  public function tableC(){
    if(isset($_GET["ruta"])){
      $rutas = $_GET["ruta"];
    }
    else{
      $rutas = "index";
    }

    $respuesta = Modelo::tableM($rutas);
    echo $respuesta;
  }
}


 ?>
