<?php

  require_once "conexionbd.php";

  class AdminM extends ConexionBD{
    public $table;
    public $info;

    public function IngresoM(){
      $pdo = new ConexionBD();
      $pst = $pdo->bd->prepare("SELECT usuario, clave, codigo_usuario FROM $this->table WHERE usuario = :usuario");
      $pst->bindParam(":usuario", $this->info, PDO::PARAM_STR);
      $pst->execute();
      return $pst->fetch();
      unset($pdo);
    }
  }

 ?>
