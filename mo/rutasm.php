<?php

  class Modelo{
    static public function rutasModelo($rutas){
      if($rutas == "login"
      || $rutas == "in-code"
      || $rutas == "config"
      || $rutas == "review-list"
      || $rutas == "exitc"){
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

    static public function menusM($rutas){
      if($rutas == "review-list"){
          $menu = '<li class="nav-item menu-item" id="">
            <a class="nav-link text-uppercase" href="?ruta=login">Configuración</a>
          </li>
          <li class="nav-item menu-item" id="">
            <a class="nav-link text-uppercase" href="?ruta=in-code">Ingresar códigos</a>
          </li>
          <li class="nav-item menu-item" id="deleteCodesRev">
            <a class="nav-link text-uppercase">Eliminar Listado</a>
          </li>';
      }
      else if($rutas == "config"){
          $menu = '<li class="nav-item menu-item" id="">
            <a class="nav-link text-uppercase" href="?ruta=in-code">Ingresar códigos</a>
          </li>
          <li class="nav-item menu-item" id="">
            <a class="nav-link text-uppercase" href="?ruta=review-list">Revisar Listados</a>
          </li>
          <li class="nav-item menu-item bg-danger" id="">
            <a class="nav-link text-light text-uppercase" href="?ruta=in-code">Salir</a>
          </li>';
      }
      else if($rutas == "login"){
          $menu = '<li class="nav-item menu-item" id="">
            <a class="nav-link text-uppercase" href="?ruta=in-code">Ingresar códigos</a>
          </li>
          <li class="nav-item menu-item" id="">
            <a class="nav-link text-uppercase" href="?ruta=review-list">Revisar Listados</a>
          </li>';
      }
      else if($rutas == "index" || $rutas == "in-code") {
          $menu = '<li class="nav-item menu-item" id="">
            <a class="nav-link text-uppercase" href="?ruta=login">Configuración</a>
          </li>
          <li class="nav-item menu-item" id="">
            <a class="nav-link text-uppercase" href="?ruta=review-list">Revisar Listados</a>
          </li>
          <li class="nav-item menu-item bg-danger" id="deleteCodes">
            <a class="nav-link text-light text-uppercase" href="#">Limpiar Listado en Proceso</a>
          </li>
          <li class="nav-item menu-item bg-azulSec" id="saveCodes">
            <a class="nav-link text-light text-uppercase" href="#">Guardar</a>
          </li>';
      }
      else{
          $menu = '<li class="nav-item menu-item" id="">
            <a class="nav-link text-uppercase" href="?ruta=login">Configuración</a>
          </li>
          <li class="nav-item menu-item" id="">
            <a class="nav-link text-uppercase" href="?ruta=review-list">Revisar Listados</a>
          </li>
          <li class="nav-item menu-item bg-danger" id="deleteCodes">
            <a class="nav-link text-light text-uppercase" href="#">Limpiar Listado en Proceso</a>
          </li>
          <li class="nav-item menu-item bg-azulSec" id="saveCodes">
            <a class="nav-link text-light text-uppercase" href="#">Guardar</a>
          </li>';
      }
      return $menu;
    }

    static public function headTittlesM($rutas){
      if($rutas == "review-list"){
          $headTittle = "Revisión de Listados | Nefnodel Colector";
      }
      else if($rutas == "config"){
          $headTittle = "Configuración de Colector | Nefnodel Colector";
      }
      else if($rutas == "login"){
          $headTittle = "Ingreso al Admin | Nefnodel Colector";
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
      else if($rutas == "config"){
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

  }

 ?>
