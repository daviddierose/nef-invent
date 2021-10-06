<?php
  session_start();
  if(isset($_SESSION["Ingreso"])){
    if($_SESSION["Ingreso"]==true){
    }
  }else{
    header("location:index.php?ruta=in-code");
  }

 ?>
<!DOCTYPE html>
<html lang="es" dir="ltr">
  <?php
    include "vistas/modulos/head.php";
   ?>
  <body>
  <?php
    include "vistas/modulos/menus.php";
    include "vistas/modulos/alerts.php";
    include "vistas/modulos/config-form.php"
   ?>
  </body>
</html>
