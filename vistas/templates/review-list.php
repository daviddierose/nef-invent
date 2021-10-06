<!DOCTYPE html>
<html lang="es" dir="ltr">
  <?php
    include "vistas/modulos/head.php";
   ?>
  <body>
  <?php
    include "vistas/modulos/menus.php";

   ?>

   <div class="container-fluid mt-5">
     <?php
        include "vistas/modulos/review-form.php";
      ?>
      <div class="row">
        <?php
          include "vistas/modulos/table.php";
         ?>
      </div>
   </div>

  </body>
</html>
<?php
  session_start();
  if(isset($_SESSION["Ingreso"])){
      session_destroy();
    }
 ?>
