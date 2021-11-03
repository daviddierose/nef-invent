	<head>
		<meta charset="utf-8">
		<script src="js/jquery-3.5.1.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script src="js/mobile-detect.min.js"></script>
		<?php
			$rutas = new rutasControlador();
			$rutas -> appC();
		?>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/core.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/md5.js"></script>
		<link rel="stylesheet" type="text/css" href="css/estilos.css">
		<link rel="stylesheet" type="text/css" href="css/bootstrap.css" media="screen">
		<link rel="stylesheet" type="text/css" href="css/bootstrap-switch.min.css">
		<link rel="preconnect" href="https://fonts.gstatic.com">
		<link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet">
		<script src="https://kit.fontawesome.com/497c1d3668.js" crossorigin="anonymous"></script>
		<title>
			<?php
				$rutas = new rutasControlador();
				$rutas -> headTittlesR();
		 	?>
	 </title>
	</head>
