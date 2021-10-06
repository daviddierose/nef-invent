<!DOCTYPE html>
<?php
	session_start();
	if(isset($_SESSION["Ingreso"])){
		 	session_destroy();
		}
 ?>
<html lang="es" dir="ltr">
	<?php
		include "vistas/modulos/head.php";
	 ?>
	 <body>
 		<?php
 			include "vistas/modulos/menus.php";
 			include "vistas/modulos/alerts.php";
 		 ?>

 			<div class="container-fluid mt-5" id="formulario">
 					<div class="row mt-5" id="Info">
 							<?php
 									include "vistas/modulos/info-table.php";
 									include "vistas/modulos/table.php"
 							 ?>
 				  </div>
 			</div>
 	</body>
</html>
