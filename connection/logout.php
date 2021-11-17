<?php
  require_once "../co/responsec.php";
  session_start();
  if(isset($_SESSION["Ingreso"])){
    if($_SESSION["Ingreso"]==true){
        session_destroy();
    }
  }

  $response = new responsec();
  $response->reqStatus = true;
  $response->getResponse();

 ?>
