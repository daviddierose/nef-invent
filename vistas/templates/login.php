<!DOCTYPE html>
<html lang="es" dir="ltr">
  <?php
    include "vistas/modulos/head.php";
   ?>
  <body>
  <?php
    include "vistas/modulos/menus.php";
    include "vistas/modulos/form-login.php";
   ?>
  </body>
</html>
<?php
  session_start();
  if(isset($_SESSION["Ingreso"])){
    session_destroy();
  }

  $ingreso = new AdminC();
  $ingreso -> IngresoC();
 ?>
