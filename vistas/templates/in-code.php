<?php
	session_start();
	session_destroy();
 ?>
<!DOCTYPE html>
<html lang="es" dir="ltr">
	<?php
		include "vistas/modulos/head.php";
	 ?>
	 <body>
 		<?php
 			include "vistas/modulos/sidebar.php";
 			include "vistas/modulos/alerts.php";
 		 ?>
		 <div class="page-content p-3 active" id="content">
			 <?php
         include "vistas/modulos/boton-menu.php";
        ?>
			 <!--Información por página-->
			 <div class="container-fluid mt-3" id="formulario">
						<div class="row mt-5" id="Info">
  							<?php
  									include "vistas/modulos/info-table.php";
  									include "vistas/modulos/table.php"
  							 ?>
  				  </div>
  			</div>
		 </div>
 	</body>
</html>
