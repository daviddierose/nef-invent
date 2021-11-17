<?php

	require_once "co/rutasc.php";
	require_once "co/adminc.php";
	require_once "co/loadc.php";

	require_once "mo/rutasm.php";
	require_once "mo/adminm.php";
	require_once "mo/loadm.php";

	$rutas = new rutasControlador();
	$rutas -> Plantilla();
 ?>
