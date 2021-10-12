<!DOCTYPE html>
<html lang="es" dir="ltr">
  <?php
    include "vistas/modulos/head.php";
   ?>
  <body>
    <?php
      include "vistas/modulos/sidebar.php";
     ?>
    <div class="page-content p-3 active" id="content">
      <?php
        include "vistas/modulos/boton-menu.php";
       ?>
      <!--Información por página-->
      <?php
        include "vistas/modulos/form-login.php";
       ?>
    </div>
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
