<?php

  class Modelo{
    static public function rutasModelo($rutas){
      if($rutas == "login"
      || $rutas == "in-code"
      || $rutas == "config-colect"
      || $rutas == "review-list"
      || $rutas == "exitc"
      || $rutas == "config-admin"){
          $pagina = "vistas/templates/" . $rutas . ".php";
      }
      else if($rutas == "index") {
          $pagina = "vistas/templates/in-code.php";
      }
      else{
          $pagina = "vistas/templates/in-code.php";
      }
      return $pagina;
    }

    static public function menusColect1M($rutas){
      if($rutas == "login"
      || $rutas == "in-code"
      || $rutas == "config-colect"
      || $rutas == "review-list"
      || $rutas == "exitc"){
          $menu = "vistas/modulos/menu-colector.php";
      }else if($rutas == "index") {
          $menu = "vistas/modulos/menu-colector.php";
      }
      else{
          $menu = "vistas/modulos/menu-colector.php";
      }
      return $menu;
    }

    static public function menusColect2M($rutas){
        if($rutas == "review-list"){
          $menu2 ='<div class="separator"></div>
            <ul class="nav flex-column bg-white mb-0">
              <li class="my-2"  id="deleteListCodes">
                <a class="nav-link text-uppercase text-red" href="#">
                  <i class="fas fa-trash-alt mr-2"></i>Eliminar Listado
                </a>
              </li>';
        }
        else if($rutas == "config-colect"){
          $menu2 ='<div class="separator"></div>
            <ul class="nav flex-column bg-white mb-0">
              <li>
                <a class="nav-link text-uppercase text-red" href="?ruta=exitc">
                  <i class="fas fa-sign-out-alt mr-2"></i>Salir
                </a>
              </li>';
        }
        else if($rutas == "login"){
          $menu2 ='';
        }
        else if($rutas == "index" || $rutas == "in-code") {
          $menu2 ='<div class="separator"></div>
            <ul class="nav flex-column bg-white mb-0">
              <li class="" id="deleteCodes">
                <a class="nav-link text-uppercase text-red" href="#">
                  <i class="fas fa-eraser mr-2"></i>Limpiar Listado
                </a>
              </li>
              <li class="" id="saveCodes">
                <a class="nav-link text-uppercase text-azul" href="#">
                  <i class="fas fa-cloud-upload-alt mr-2"></i>Guardar Listado
                </a>
              </li>
            </ul>';
        }else{
          $menu2 ='<div class="separator"></div>
            <ul class="nav flex-column bg-white mb-0">
              <li class="" id="deleteCodes">
                <a class="nav-link text-uppercase text-red" href="#">
                  <i class="fas fa-eraser mr-2"></i>Limpiar Listado
                </a>
              </li>
              <li class="" id="saveCodes">
                <a class="nav-link text-uppercase text-azul" href="#">
                  <i class="fas fa-cloud-upload-alt mr-2"></i>Guardar Listado
                </a>
              </li>
            </ul>';
        }
    return $menu2;
  }

    static public function headTittlesM($rutas){
      if($rutas == "review-list"){
          $headTittle = "Revisión de Listados | Nefnodel Colector";
      }
      else if($rutas == "config-colect"){
          $headTittle = "Configuración de Colector | Nefnodel Colector";
      }
      else if($rutas == "login"){
          $headTittle = "Ingreso al Admin | Nefnodel Colector";
      }
      else if($rutas == "config-admin"){
          $headTittle = "Administrador | Nefnodel Colector";
      }
      else if($rutas == "index" || $rutas == "in-code") {
          $headTittle = "Ingreso de Códigos | Nefnodel Colector";
      }
      else{
          $headTittle = "Ingreso de Códigos | Nefnodel Colector";
      }
      return $headTittle;
    }

    static public function tableM($rutas){
      if($rutas == "review-list"){
          $th = "";
      }
      else if($rutas == "config-colect"){
          $th = "";
      }
      else if($rutas == "login"){
          $th = "";
      }
      else if($rutas == "index" || $rutas == "in-code") {
          $th = "<th></th>";
      }
      else{
          $th = "<th></th>";
      }
      return $th;
    }

    static public function appM($rutas){
      if($rutas == "login"){
        $app = '<script src="js/functions-log.js"></script>
    		<script src="js/app-log.js"></script>';
      }else if($rutas == "config-colect" ){
        $app = '<script src="js/functions-cc.js"></script>
    		<script src="js/app-cc.js"></script>';
      }else if($rutas == "config-admin"){
        $app = '<script src="js/functions-admin.js"></script>
    		<script src="js/app-admin.js"></script>';
      }else{
        $app = '<script src="js/functions.js"></script>
    		<script src="js/app.js"></script>';
      }
      return $app;
    }

  }

 ?>
